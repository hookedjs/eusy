import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { ThemeContext } from 'react-native-elements';
import { useRouter } from '../lib/Routing';
import { SidebarState } from '../../state/Sidebar.state';
import { WindowState } from '../../state/Window.state';

export const FooterFixedSection = observer(() => {
  const { history, location } = useRouter();
  const theme = useContext(ThemeContext).theme;

  const FooterMenuItem = ({
    toggled,
    icon,
    onPress,
    toggledIcon
  }: {
    toggled: boolean;
    icon: string;
    onPress: () => any;
    toggledIcon?: string;
  }) => {
    const theme = useContext(ThemeContext).theme;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderTopWidth: 4,
          borderTopColor: toggled ? theme.colors.primaryDarker : 'transparent',
          paddingVertical: 10,
          flex: 1,
          alignItems: 'center'
        }}
      >
        <Feather name={toggled && toggledIcon ? toggledIcon : icon} size={24} color="#2D3C56" />
      </TouchableOpacity>
    );
  };

  if (!WindowState.isSmallNative) return <></>;
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.primaryLighter,
        paddingBottom: WindowState.heightBottomSpeaker
      }}
    >
      <FooterMenuItem
        toggled={SidebarState.toggled}
        icon="menu"
        onPress={() => (SidebarState.toggled = !SidebarState.toggled)}
        toggledIcon="x"
      />
      <FooterMenuItem
        toggled={location.pathname === '/'}
        icon="home"
        onPress={() => history.push('/')}
      />
      <FooterMenuItem
        toggled={location.pathname === '/login'}
        icon="power"
        onPress={() => history.push('/login')}
      />
      <FooterMenuItem
        toggled={location.pathname === '/user/profile'}
        icon="user"
        onPress={() => history.push('/user/profile')}
      />
      <FooterMenuItem
        toggled={location.pathname === '/settings'}
        icon="settings"
        onPress={() => history.push('/settings')}
      />
    </View>
  );
});
