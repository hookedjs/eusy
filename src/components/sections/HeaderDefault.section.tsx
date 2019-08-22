import React, { useContext } from 'react';
import { View } from 'react-native';
import { Avatar, SearchBar, ThemeContext } from 'react-native-elements';
import { observer } from 'mobx-react-lite';
import { Feather } from '@expo/vector-icons';
import { observable } from 'mobx';
import { WindowState } from '../../state/Window.state';
import { UserState } from '../../state/User.state';
import { Link, useRouter } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';
import { NotificationsState } from '../../state/Notifications.state';

export const HeaderState = observable({
  numberOfBackSteps: 0,
  search: ''
});

export const HeaderDefaultSection = observer(() => {
  const { history, location } = useRouter();
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        zIndex: 2,
        backgroundColor: theme.colors.primaryLighter,
        padding: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: WindowState.heightStatusBar + 6
      }}
    >
      {WindowState.isSmallWeb && <LogoModule width={28} height={28} style={{ marginRight: 10 }} />}

      {WindowState.isLarge && (
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
          onFocus={() => history.push('/search')}
          onBlur={() => console.log('blur')}
          onCancel={() => console.log('cancel')}
          onClear={() => console.log('cleared')}
          value={HeaderState.search}
          onChangeText={s => (HeaderState.search = s)}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {WindowState.isLarge && (
          <>
            <Link to="/notifications">
              <View style={{ marginLeft: 10 }}>
                <Feather name="bell" size={22} color={theme.colors.primaryDark} />
                {!!NotificationsState.unreadCount && (
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
                source={{ uri: UserState.avatar }}
                containerStyle={{ marginLeft: 10 }}
              />
            </Link>
          </>
        )}
        {WindowState.isSmallWeb && (
          <Link to="/menu">
            <Feather name="menu" size={24} color="#2D3C56" style={{ paddingLeft: 10 }} />
          </Link>
        )}
      </View>
    </View>
  );
});
