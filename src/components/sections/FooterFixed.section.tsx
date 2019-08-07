import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { useRouter } from '../lib/Routing';
import { SidebarSectionState } from './Sidebar.section.state';
import { WindowState } from '../../state/Window.state';

export const FooterFixedSection = observer(() => {
  const { history, location } = useRouter();

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
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderTopWidth: 4,
        borderTopColor: toggled ? '#2D3C56' : 'transparent',
        paddingVertical: 10,
        flex: 1,
        alignItems: 'center'
      }}
    >
      <Feather name={toggled && toggledIcon ? toggledIcon : icon} size={24} color="#2D3C56" />
    </TouchableOpacity>
  );

  if (!WindowState.isSmallNative) return <></>;
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#C5CCD7',
        paddingBottom: WindowState.bottomUnsafeHeight
      }}
    >
      <FooterMenuItem
        toggled={SidebarSectionState.toggled}
        icon="menu"
        onPress={() => (SidebarSectionState.toggled = !SidebarSectionState.toggled)}
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
