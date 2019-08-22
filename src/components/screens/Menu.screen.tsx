import React, { useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';
import { Text, ThemeContext } from 'react-native-elements';
import { Helmet } from '../lib/Helmet';
import { Link } from '../lib/Routing';
import { HoverObserver } from '../lib/HoverObserver';
import { NotificationsState } from '../../state/Notifications.state';
import { WindowState } from '../../state/Window.state';

const MenuItem = ({
  to,
  text,
  featherIconName,
  showActivityBubble
}: {
  to: any;
  text: string;
  featherIconName: string;
  showActivityBubble?: boolean;
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <HoverObserver
      children={({ isHovering }) => (
        <Link to={to}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 20,
              paddingLeft: WindowState.isLargeWeb ? 10 : 0,
              backgroundColor: isHovering ? theme.colors.primaryLighter : 'transparent'
            }}
          >
            <View>
              <Feather name={featherIconName} size={28} color="black" />
              {!!showActivityBubble && (
                <Feather
                  name="activity"
                  size={8}
                  color="white"
                  style={{
                    backgroundColor: 'red',
                    // borderRadius: 4,
                    width: 8,
                    position: 'relative',
                    top: -28,
                    left: 19,
                    marginBottom: -8
                  }}
                />
              )}
            </View>
            <View style={{ alignContent: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: 'black', paddingLeft: 22 }}>{text}</Text>
            </View>
          </View>
        </Link>
      )}
    />
  );
};

export const MenuScreen = () => {
  const title = 'Menu';

  return (
    <>
      <Helmet title={title} />
      <ScrollView>
        <View
          style={{
            paddingVertical: 30,
            paddingHorizontal: WindowState.isLarge ? 60 : 30
          }}
        >
          <Text h4 style={{ marginBottom: 14, fontWeight: 'bold' }}>
            Menu
          </Text>
          <MenuItem to="/home" text="Home" featherIconName="home" />
          <MenuItem
            to="/notifications"
            text="Notifications"
            featherIconName="bell"
            showActivityBubble={!!NotificationsState.unreadCount}
          />
          <MenuItem to="/search" text="Search" featherIconName="search" />
          <MenuItem to="/settings" text="Settings" featherIconName="settings" />
        </View>
      </ScrollView>
    </>
  );
};
