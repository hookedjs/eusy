import React, { useContext } from 'react';
import { View } from 'react-native';
import { gql } from 'apollo-boost';
import { Avatar, SearchBar, ThemeContext } from 'react-native-elements';
import { observer } from 'mobx-react-lite';
import { Feather } from '@expo/vector-icons';
import { useQuery } from '../../mockApi/hooks/useQuery';
import { UserType } from '../../model/users/type';
import { NotificationType } from '../../model/notifications/type';
import { GlobalState } from '../../GlobalState';
import { Link, useRouter } from '../lib/Routing';
import { useMutation } from '../../mockApi/hooks/useMutation';
import { LogoModule } from '../modules/Logo.module';

const NOTIFICATION_COUNT = gql`
  query($id: string) {
    notifications(where: { id: $id, unread: true }) {
      id
    }
  }
`;

const USER = gql`
  query($id: String!) {
    user(where: { id: $id }) {
      id
      avatar
      nameGiven
      nameFamily
    }
  }
`;

const USER_UPDATE_RECENT_SEARCHES = gql`
  mutation UserUpdateProfile($id: String!, $recentSearches: String!) {
    updateUser(data: { recentSearches: $recentSearches }, where: { id: $id }) {
      id
      avatar
      nameGiven
      nameFamily
      recentSearches
    }
  }
`;

export const HeaderDefaultSection = observer(() => {
  const { history, location } = useRouter();
  const { theme } = useContext(ThemeContext);
  const userQuery = useQuery<UserType>(USER, {
    variables: { id: GlobalState.user.id },
    pollInterval: 5 * 60
  });
  const notificationQuery = useQuery<NotificationType[]>(NOTIFICATION_COUNT, {
    variables: { userId: GlobalState.user.id },
    pollInterval: 2000
  });
  const [updateRecentSearches] = useMutation(USER_UPDATE_RECENT_SEARCHES);

  const pushRecentSearch = async () => {
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

  if (userQuery.error.message || userQuery.error.graphQLErrors.length) {
    console.dir(userQuery.error);
    return <></>;
  }
  if (!userQuery.data.nameGiven) return <></>;
  if (notificationQuery.error.message || notificationQuery.error.graphQLErrors.length) {
    console.dir(notificationQuery.error);
    return <></>;
  }
  if (!Array.isArray(notificationQuery.data)) return <></>;

  return (
    <View
      style={{
        zIndex: 2,
        backgroundColor: theme.colors.primaryLighter,
        padding: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: GlobalState.viewportInfo.heightStatusBar + 6
      }}
    >
      {GlobalState.viewportInfo.isSmallWeb && (
        <LogoModule width={28} height={28} style={{ marginRight: 10 }} />
      )}

      {GlobalState.viewportInfo.isLarge && (
        <Feather
          name="chevron-left"
          size={24}
          color={location.pathname.split('/').length > 2 ? '#2D3C56' : 'transparent'}
          onPress={() => history.goBack()}
          style={{ paddingLeft: 10, paddingRight: 14 }}
        />
      )}

      <View style={{ flex: 1, maxWidth: 500 }}>
        <SearchBar
          showLoading={false}
          onFocus={() => {
            if (location.pathname !== '/search') history.push('/search');
          }}
          // onBlur={() => console.log('blur')}
          // onCancel={() => console.log('cancel')}
          onClear={() => console.log('cleared')}
          onSubmitEditing={pushRecentSearch}
          value={GlobalState.search}
          onChangeText={s => {
            GlobalState.search = s;
            if (location.pathname !== '/search') history.push('/search');
          }}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {GlobalState.viewportInfo.isLarge && (
          <>
            <Link to="/notifications">
              <View style={{ marginLeft: 10 }}>
                <Feather name="bell" size={22} color={theme.colors.primaryDark} />
                {!notificationQuery.loading && !!notificationQuery.data.length && (
                  <Feather
                    name="activity"
                    size={7}
                    color="white"
                    style={{
                      backgroundColor: 'red',
                      // borderRadius: 4,
                      width: 7,
                      height: 8,
                      position: 'relative',
                      top: -22,
                      left: 14,
                      marginBottom: -8
                    }}
                  />
                )}
              </View>
            </Link>
            <Link to="/settings/user">
              <Avatar
                rounded
                title={
                  userQuery.data.avatar
                    ? ''
                    : userQuery.data.nameGiven.slice(0, 1) + userQuery.data.nameFamily.slice(0, 1)
                }
                source={{ uri: userQuery.data.avatar }}
                containerStyle={{ marginLeft: 10 }}
              />
            </Link>
          </>
        )}
        {GlobalState.viewportInfo.isSmallWeb && (
          <Link to="/menu">
            <Feather name="menu" size={24} color="#2D3C56" style={{ paddingLeft: 10 }} />
          </Link>
        )}
      </View>
    </View>
  );
});
