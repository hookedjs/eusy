import React, { useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';
import { Avatar, Text, ThemeContext } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import {
  ClearNotification,
  ClearNotifications,
  NotificationsState,
  ToggleNotification
} from '../../state/Notifications.state';
import { Helmet } from '../lib/Helmet';
import { Link, TextLink } from '../lib/Routing';
import { HoverObserver } from '../lib/HoverObserver';
import { observer, useAsObservableSource } from 'mobx-react-lite';
import Markdown from 'react-native-markdown-renderer';
import { WindowState } from '../../state/Window.state';

const NotificationRow = observer(({ notification }) => {
  const theme = useContext(ThemeContext).theme;
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
              paddingVertical: 5,
              borderBottomColor: theme.colors.grey4,
              borderBottomWidth: 1,
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
                  // width: "100%", maxWidth: 900,
                  width: WindowState.isLarge ? WindowState.width - 400 : WindowState.width - 50
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
  const theme = useContext(ThemeContext).theme;

  return (
    <ScrollView>
      <Helmet title="Notifications" />

      <View
        style={{
          // maxWidth: 900,
          alignSelf: 'center',
          paddingVertical: WindowState.isLarge ? 60 : 0
        }}
      >
        {WindowState.isLarge && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: theme.colors.grey4,
              borderBottomWidth: 1,
              marginBottom: WindowState.isLarge ? 8 : 0,
              paddingHorizontal: 10
            }}
          >
            <Text h4 style={styles.text}>
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
          </View>
        )}

        {NotificationsState.notifications.slice(0, 20).map((n, i) => (
          <NotificationRow key={`notification-${i}`} notification={n} />
        ))}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  text: {
    marginBottom: 24
  }
});
