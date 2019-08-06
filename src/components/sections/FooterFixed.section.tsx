import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { useRouter } from '../lib/Routing';
import { SidebarState } from './Sidebar.section';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

export const FooterFixedSection = observer(() => {
  const { history, location } = useRouter();
  const windowDims = useWindowDimensions();

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

  if (windowDims.isLarge || windowDims.isMobileWeb) return <></>;
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#C5CCD7'
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
        toggled={location.pathname === '/page'}
        icon="activity"
        onPress={() => history.push('/page')}
      />
      <FooterMenuItem
        toggled={location.pathname === '/settings'}
        icon="settings"
        onPress={() => history.push('/settings')}
      />
    </View>
  );
});
