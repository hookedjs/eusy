import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { ThemeContext } from 'react-native-elements';
import { useRouter } from '../lib/Routing';
import { WindowState } from '../../state/Window.state';
import { NotificationsState } from '../../state/Notifications.state';

export const FooterFixedSection = observer(() => {
  const { history, location } = useRouter();
  const { theme } = useContext(ThemeContext);

  const FooterMenuItem = ({
    toggled,
    icon,
    onPress,
    toggledIcon,
    showActivityBubble
  }: {
    toggled: boolean;
    icon: string;
    onPress: () => any;
    toggledIcon?: string;
    showActivityBubble?: boolean;
  }) => {
    const { theme } = useContext(ThemeContext);
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
        {!!showActivityBubble && (
          <Feather
            name="activity"
            size={8}
            color="white"
            style={{
              backgroundColor: 'red',
              // borderRadius: 4,
              width: 9,
              height: 9,
              position: 'relative',
              top: -24,
              left: 8,
              marginBottom: -8
            }}
            borderRadius={4}
          />
        )}
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
        toggled={location.pathname.startsWith('/home')}
        icon="home"
        onPress={() => history.push('/home')}
      />
      <FooterMenuItem
        toggled={location.pathname.startsWith('/notifications')}
        icon="bell"
        onPress={() => history.push('/notifications')}
        showActivityBubble={!!NotificationsState.unreadCount}
      />
      <FooterMenuItem
        toggled={location.pathname.startsWith('/search')}
        icon="search"
        onPress={() => history.push('/search')}
      />
      <FooterMenuItem
        toggled={location.pathname.startsWith('/menu')}
        icon="menu"
        onPress={() => history.push('/menu')}
      />
    </View>
  );
});
