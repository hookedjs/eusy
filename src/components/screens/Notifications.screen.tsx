import React, { useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';
import { Avatar, Text, ThemeContext } from 'react-native-elements';
import {
  ClearNotification,
  ClearNotifications,
  NotificationsState,
  ToggleNotification
} from '../../state/Notifications.state';
import { Helmet } from '../lib/Helmet';
import { Link, TextLink, useRouter } from '../lib/Routing';
import { HoverObserver } from '../lib/HoverObserver';
import { observer, useAsObservableSource } from 'mobx-react-lite';
import Markdown from 'react-native-markdown-renderer';
import { WindowState } from '../../state/Window.state';

const NotificationRow = observer(({ notification }) => {
  const { theme } = useContext(ThemeContext);
  // When passing an observable as a prop, you sometimes need to use useAsObservableSource
  useAsObservableSource(notification);

  return (
    <HoverObserver
      children={({ isHovering }) => (
        <Link to={notification.to} onPress={() => ClearNotification(notification)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              paddingLeft: 10,
              paddingVertical: 8,
              borderBottomColor: theme.colors.grey4,
              borderBottomWidth: WindowState.isLarge ? 1 : 0,
              backgroundColor: isHovering
                ? theme.colors.primaryLighter
                : notification.new
                ? theme.colors.primaryLightest
                : 'transparent'
            }}
          >
            <Avatar rounded source={{ uri: notification.icon }} />
            <Markdown
              style={{
                text: {
                  paddingLeft: 14,
                  paddingRight: 14,
                  marginTop: -10,
                  marginBottom: -8,
                  // width: "100%", maxWidth: 900,
                  width: WindowState.isLarge ? WindowState.width - 400 : WindowState.width - 44
                }
              }}
            >
              {notification.text}
            </Markdown>

            {WindowState.isLarge && (
              <HoverObserver
                children={({ isHovering }) => (
                  <Feather
                    name={
                      isHovering ? (notification.new ? 'minus-circle' : 'plus-circle') : 'circle'
                    }
                    size={16}
                    color={isHovering ? theme.colors.grey2 : theme.colors.grey4}
                    onPress={e => {
                      e.preventDefault();
                      ToggleNotification(notification);
                    }}
                    style={{ paddingLeft: 20, paddingRight: 8 }}
                  />
                )}
              />
            )}
          </View>
        </Link>
      )}
    />
  );
});

export const NotificationsScreen = observer(() => {
  const title = 'Notifications';
  const { history } = useRouter();
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Helmet title={title} />
      <ScrollView>
        <View
          style={{
            // maxWidth: 900,
            alignSelf: WindowState.isLarge ? 'center' : '',
            paddingVertical: WindowState.isLarge ? 60 : 30
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: WindowState.isLarge ? theme.colors.grey3 : theme.colors.grey5,
              borderBottomWidth: 1,
              paddingHorizontal: 10,
              marginBottom: WindowState.isLarge ? 10 : 0
            }}
          >
            {WindowState.isLarge ? (
              <>
                <Text h4 style={{ marginBottom: 24, fontWeight: 'bold' }}>
                  Your notifications ({NotificationsState.unreadCount})
                </Text>
                <Text>
                  <TextLink
                    to="#"
                    onPress={ClearNotifications}
                    style={{
                      textDecorationLine: 'none',
                      color: theme.colors.primary
                    }}
                  >
                    Mark All Read
                  </TextLink>
                </Text>
              </>
            ) : (
              <>
                <Text h4 style={{ marginBottom: 24, fontWeight: 'bold' }}>
                  Notifications ({NotificationsState.unreadCount})
                </Text>
                <Feather
                  name="settings"
                  size={30}
                  color={theme.colors.grey2}
                  onPress={() => {
                    history.push('/settings');
                  }}
                />
              </>
            )}
          </View>

          {NotificationsState.notifications.slice(0, 20).map((n, i) => (
            <NotificationRow key={`notification-${i}`} notification={n} />
          ))}
        </View>
      </ScrollView>
    </>
  );
});
