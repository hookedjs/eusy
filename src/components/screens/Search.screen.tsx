import React, { useContext } from 'react';
import { gql } from 'apollo-boost';
import { Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, ThemeContext } from 'react-native-elements';
import { GlobalState } from '../../GlobalState';
import { Helmet } from '../lib/Helmet';
import { Link } from '../lib/Routing';
import { HoverObserver } from '../lib/HoverObserver';
import { useQuery } from '../../lib/mockApi/hooks/useQuery';
import { UserType } from '../../model/users/type';
import { useMutation } from '../../lib/mockApi/hooks/useMutation';
import { Sleep } from '../../lib/Polyfills';

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
  const { theme } = useContext(ThemeContext);
  const userQuery = useQuery<UserType>(USER, {
    variables: { id: GlobalState.user.id },
    pollInterval: 2000
  });
  const [updateRecentSearches] = useMutation(USER_UPDATE_RECENT_SEARCHES);

  const pushRecentSearch = async () => {
    while (userQuery.loading) {
      console.log('Waiting for userQuery...');
      await Sleep(1000);
    }
    let recentSearches = JSON.parse(userQuery.data.recentSearches);
    recentSearches.push(GlobalState.search);
    updateRecentSearches({
      variables: {
        id: GlobalState.user.id,
        recentSearches: JSON.stringify(recentSearches)
      }
    });
  };

  const RecentItem = ({ search }: { search: string }) => {
    const { theme } = useContext(ThemeContext);

    return (
      <HoverObserver
        children={({ isHovering }) => (
          <Link to="#" onPress={pushRecentSearch}>
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

  let results = [];
  // if (GlobalState.search.length >= 3) {
  //   results = GlobalState.notifications
  //     .filter(n => n.text.includes(GlobalState.search))
  //     .slice(0, 20);
  // }

  if (userQuery.loading) return <></>;

  let recentSearches = JSON.parse(userQuery.data.recentSearches);

  return (
    <>
      <Helmet title={title} />
      <ScrollView>
        <View
          style={{
            // alignSelf: GlobalState.viewportInfo.isLarge ? 'left' : '',
            paddingHorizontal: GlobalState.viewportInfo.isLarge ? 30 : 0,
            paddingVertical: 30
          }}
        >
          {GlobalState.search.length >= 3 && (
            <>
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
                  Search Results ({results.length})
                </Text>
              </View>
              {results.slice(0, 20).map((r, i) => (
                <></>
              ))}
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
                Recent Searches ({recentSearches.length})
              </Text>
              {recentSearches.map(search => (
                <RecentItem key={search} search={search} />
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
