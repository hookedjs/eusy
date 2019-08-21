import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Avatar, ThemeContext } from 'react-native-elements';
import { observer } from 'mobx-react-lite';
import { Feather } from '@expo/vector-icons';
import { observable } from 'mobx';
import { SearchBar } from 'react-native-elements';
import { WindowState } from '../../state/Window.state';
import { UserState } from '../../state/User.state';
import { Link, useRouter } from '../lib/Routing';
import { SidebarState } from '../../state/Sidebar.state';
import { LogoModule } from '../modules/Logo.module';
import { NotificationsState } from '../../state/Notifications.state';

export const HeaderState = observable({
  numberOfBackSteps: 0,
  search: ''
});

export const HeaderSection = observer(() => {
  const { history } = useRouter();
  const theme = useContext(ThemeContext).theme;

  useEffect(() => {
    return history.listen((location, action) => {
      if (['/home', '/settings', '/notifications', '/user'].includes(location.pathname))
        HeaderState.numberOfBackSteps = 0;
      else if (action === 'PUSH') HeaderState.numberOfBackSteps = HeaderState.numberOfBackSteps + 1;
      else if (action === 'POP') HeaderState.numberOfBackSteps = HeaderState.numberOfBackSteps - 1;
    });
  }, []);

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
      <View
        style={{
          minWidth: WindowState.isLarge ? 48 : 0
        }}
      >
        {WindowState.isSmallWeb ? (
          <LogoModule width={28} height={28} style={{ marginRight: 10 }} />
        ) : (
          !!HeaderState.numberOfBackSteps && (
            <Feather
              name="chevron-left"
              size={24}
              color="#2D3C56"
              onPress={() => history.goBack()}
              style={{ paddingLeft: 10, paddingRight: 14 }}
            />
          )
        )}
      </View>
      <View style={{ flex: 1, maxWidth: 500 }}>
        <SearchBar
          showLoading={false}
          onFocus={() => console.log('focus')}
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
              <Avatar
                icon={{
                  size: 22,
                  name: 'bell',
                  type: 'feather',
                  color: theme.colors.primaryDark,
                  underlayStyle: { backgroundColor: 'transparent' }
                }}
                size={28}
                iconStyle={{}}
                overlayContainerStyle={{ backgroundColor: 'transparent' }}
                containerStyle={{ marginLeft: 10, backgroundColor: 'transparent' }}
                showEditButton={!!NotificationsState.unreadCount}
                editButton={{
                  name: 'activity',
                  type: 'feather',
                  size: 10,
                  style: { backgroundColor: 'red' }
                }}
              />
            </Link>
            <Link to="/settings">
              <Avatar
                rounded
                source={{ uri: UserState.avatar }}
                containerStyle={{ marginLeft: 10 }}
              />
            </Link>
          </>
        )}
        {WindowState.isSmallWeb && (
          <Feather
            name="menu"
            size={24}
            color="#2D3C56"
            onPress={() => (SidebarState.toggled = !SidebarState.toggled)}
            style={{ paddingLeft: 10 }}
          />
        )}
      </View>
    </View>
  );
});
