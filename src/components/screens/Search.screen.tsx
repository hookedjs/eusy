import React, { useContext, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { Feather } from '@expo/vector-icons';
import { observer, useLocalStore } from 'mobx-react-lite';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Text, ThemeContext } from '../elements';
import Markdown from 'react-native-markdown-renderer';
import str_shorten from 'str_shorten';
import { GlobalState } from '../../GlobalState';
import { Helmet } from '../lib/Helmet';
import { Cloudinary } from '../../lib/Cloudinary';
import { Link } from '../lib/Routing';
import { HoverObserver } from '../lib/HoverObserver';
import { useQuery } from '../../mockApi/hooks/useQuery';
import { UserType } from '../../model/users/type';
import { useMutation } from '../../mockApi/hooks/useMutation';
import { Sleep } from '../../lib/Polyfills';
import { MockOrm } from '../../mockApi/MockOrm';
import { PostType } from '../../model/posts/type';
import { ThemeType } from '../../config/Theme.config';

const USER = gql`
  query($id: String!) {
    user(where: { id: $id }) {
      id
      recentSearches
    }
  }
`;

const USER_UPDATE_RECENT_SEARCHES = gql`
  mutation UserUpdateRecentSearches($id: String!, $recentSearches: String!) {
    updateUser(data: { recentSearches: $recentSearches }, where: { id: $id }) {
      id
      recentSearches
    }
  }
`;

export const SearchScreen = observer(() => {
  const title = 'Search';
  const theme = useContext(ThemeContext).theme as ThemeType;
  const userQuery = useQuery<UserType>(USER, {
    variables: { id: GlobalState.user.id },
    pollInterval: 2000
  });
  const [updateRecentSearches] = useMutation(USER_UPDATE_RECENT_SEARCHES);

  const searchStore = useLocalStore(() => ({
    results: { users: [] as UserType[], posts: [] as PostType[] },
    refetch: async () => {
      if (GlobalState.search.length >= 3) {
        const searchLoose = GlobalState.search
          .split(' ')
          .map(word => `${word}*`)
          .join(' ');
        Promise.all([MockOrm.users.search(searchLoose), MockOrm.posts.search(searchLoose)]).then(
          ([usersResponse, postsResponse]) => {
            searchStore.results = {
              users: usersResponse.data as UserType[],
              posts: postsResponse.data as PostType[]
            };
          }
        );
      } else {
        searchStore.results = { users: [], posts: [] };
      }
    }
  }));

  const pushRecentSearch = async () => {
    while (userQuery.loading) {
      console.log('Waiting for userQuery...');
      await Sleep(1000);
    }
    let recentSearches = JSON.parse(userQuery.data.recentSearches);
    recentSearches.unshift(GlobalState.search);
    recentSearches.splice(10);
    updateRecentSearches({
      variables: {
        id: GlobalState.user.id,
        recentSearches: JSON.stringify(recentSearches)
      }
    });
  };

  const ResultSectionHeader = ({ children }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: GlobalState.viewportInfo.isLarge
          ? theme.colors.grey3
          : theme.colors.grey5,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        marginBottom: GlobalState.viewportInfo.isLarge ? 10 : 0
      }}
    >
      <Text h4 style={styles.text}>
        {children}
      </Text>
    </View>
  );

  const RecentItem = ({ search }: { search: string }) => {
    const theme = useContext(ThemeContext).theme as ThemeType;

    return (
      <HoverObserver
        children={({ isHovering }) => (
          <Link
            to="#"
            onPress={() => {
              pushRecentSearch();
              GlobalState.search = search;
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 20,
                // paddingLeft: GlobalState.viewportInfo.isLargeWeb ? 10 : 0,
                backgroundColor: isHovering ? theme.colors.primaryLighter : 'transparent'
              }}
            >
              <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: 'black', paddingLeft: 22 }}>{search}</Text>
              </View>
              <Feather name="arrow-up-right" size={28} color="black" />
            </View>
          </Link>
        )}
      />
    );
  };

  const SearchResultRow = ({
    to,
    avatar,
    avatarTitle,
    children
  }: {
    to: string;
    avatar: string;
    avatarTitle: string;
    children: any;
  }) => {
    const theme = useContext(ThemeContext).theme as ThemeType;

    return (
      <HoverObserver
        children={({ isHovering }) => (
          <Link to={to} onPress={pushRecentSearch}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingLeft: 10,
                paddingVertical: 8,
                borderBottomColor: theme.colors.grey4,
                borderBottomWidth: GlobalState.viewportInfo.isLarge ? 1 : 0,
                backgroundColor: isHovering ? theme.colors.primaryLighter : 'transparent'
              }}
            >
              <Avatar rounded title={avatarTitle} source={{ uri: avatar }} />
              <Markdown
                style={{
                  text: {
                    paddingLeft: 14,
                    paddingRight: 14,
                    marginTop: -10,
                    marginBottom: -8,
                    // width: "100%", maxWidth: 900,
                    width: GlobalState.viewportInfo.isLarge
                      ? GlobalState.viewportInfo.width - 400
                      : GlobalState.viewportInfo.width - 44
                  }
                }}
              >
                {children}
              </Markdown>
            </View>
          </Link>
        )}
      />
    );
  };

  useEffect(() => {
    searchStore.refetch();
  }, [GlobalState.search]);

  if (userQuery.loading) return <></>;

  let recentSearches = JSON.parse(userQuery.data.recentSearches);

  return (
    <>
      <Helmet title={title} />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: GlobalState.viewportInfo.isLarge ? 30 : 0,
            paddingVertical: 30
          }}
        >
          {GlobalState.search.length >= 3 && (
            <>
              {!searchStore.results.users.length && !searchStore.results.posts.length && (
                <ResultSectionHeader>Search Results (0)</ResultSectionHeader>
              )}

              {!!searchStore.results.users.length && (
                <View style={{ marginBottom: 40 }}>
                  <ResultSectionHeader>
                    People ({searchStore.results.users.length})
                  </ResultSectionHeader>

                  {searchStore.results.users.slice(0, 8).map((user, i) => (
                    <SearchResultRow
                      key={`search-${i}`}
                      to={`/user/${user.handle}`}
                      avatarTitle={user.nameGiven.slice(0, 1) + user.nameFamily.slice(0, 1)}
                      avatar={
                        user.hasImage &&
                        Cloudinary.url(`users/${user.id}/profile`, {
                          width: 100,
                          height: 100,
                          crop: 'thumb'
                        })
                      }
                    >
                      **{user.nameGiven} {user.nameFamily}**{'\n'}
                      {user.email}
                    </SearchResultRow>
                  ))}
                </View>
              )}

              {!!searchStore.results.posts.length && (
                <View style={{ marginBottom: 40 }}>
                  <ResultSectionHeader>
                    Posts ({searchStore.results.posts.length})
                  </ResultSectionHeader>

                  {searchStore.results.posts.slice(0, 8).map((post, i) => (
                    <SearchResultRow
                      key={`search-${i}`}
                      to={`/post/${post.slug}`}
                      avatarTitle={post.hasFeaturedImage ? '' : post.title.slice(0, 2)}
                      avatar={
                        post.hasFeaturedImage &&
                        Cloudinary.url(`posts/${post.id}/featured`, {
                          width: 100,
                          height: 100,
                          crop: 'thumb'
                        })
                      }
                    >
                      **{post.title}**{'\n'}
                      {str_shorten(post.body.replace(/\n/g, ' '), 260)}
                    </SearchResultRow>
                  ))}
                </View>
              )}
            </>
          )}

          {!!GlobalState.search.length && GlobalState.search.length < 3 && (
            <Text h4 style={{ ...styles.text, color: theme.colors.grey3 }}>
              Keep typing, need 3 characters
            </Text>
          )}

          {!GlobalState.search.length && !recentSearches.length && (
            <Text h4 style={{ ...styles.text, color: theme.colors.grey3 }}>
              Start typing to search
            </Text>
          )}

          {!GlobalState.search.length && !!recentSearches.length && (
            <>
              <Text h4 style={styles.text}>
                Recent Searches
              </Text>
              {recentSearches.map((search, i) => (
                <RecentItem key={`recent-${i}`} search={search} />
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  text: {
    marginBottom: 24,
    fontWeight: 'bold'
  }
});
