import React, { useContext, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { Feather } from '@expo/vector-icons';
import { observer, useLocalStore } from 'mobx-react-lite';
import { ScrollView, View } from 'react-native';
import { Avatar, Text, ThemeContext } from '../elements';
import { GlobalState } from '../../GlobalState';
import { NotificationType } from '../../model/notifications/type';
import { useQuery } from '../../mockApi/hooks/useQuery';
import { useMutation } from '../../mockApi/hooks/useMutation';
import { Helmet } from '../lib/Helmet';
import { Link, useRouter } from '../lib/Routing';
import { HoverObserver } from '../lib/HoverObserver';
import Markdown from 'react-native-markdown-renderer';
import { ThemeType } from '../../config/Theme.config';

const NOTIFICATIONS = gql`
  query($id: string) {
    notifications(where: { id: $id }) {
      id
      userId
      to
      unread
      icon
      iconTitle
      text
    }
  }
`;

const NOTIFICATION_UPDATE_NEW = gql`
  mutation NotificationUpdateNew($id: String!, $unread: Boolean!) {
    updateNotification(data: { unread: $unread }, where: { id: $id }) {
      id
      userId
      to
      unread
      icon
      iconTitle
      text
    }
  }
`;

export const NotificationsScreen = observer(() => {
  const title = 'Notifications';
  const { history } = useRouter();
  const theme = useContext(ThemeContext).theme as ThemeType;
  const notificationQuery = useQuery<NotificationType[]>(NOTIFICATIONS, {
    variables: { userId: GlobalState.user.id },
    pollInterval: 500
  });
  const [notificationUpdateNew] = useMutation(NOTIFICATION_UPDATE_NEW);

  const ClearNotifications = async () => {
    notificationQuery.data
      .filter(n => n.unread)
      .forEach(async n => {
        const { errors } = await notificationUpdateNew({
          variables: {
            id: n.id,
            unread: false
          }
        });
        if (errors.length) console.dir(errors);
      });
  };

  const NotificationRowModule = observer(
    ({
      notification,
      onPress
    }: {
      notification: NotificationType;
      onPress?: (id: string) => any;
    }) => {
      const theme = useContext(ThemeContext).theme as ThemeType;
      const [notificationUpdateNew] = useMutation(NOTIFICATION_UPDATE_NEW);

      const state = useLocalStore(() => ({
        unread: notification.unread,
        setUnread: async (unread: boolean) => {
          const { errors } = await notificationUpdateNew({
            variables: {
              id: notification.id,
              unread
            }
          });
          if (errors.length) console.dir(errors);
          state.unread = unread;
        }
      }));

      useEffect(() => {
        state.unread = notification.unread;
      }, [notification.unread]);

      return (
        <HoverObserver
          children={({ isHovering }) => (
            <Link
              to={notification.to}
              onPress={() => {
                if (onPress) onPress(notification.id);
                state.setUnread(false);
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingLeft: 10,
                  paddingVertical: 8,
                  borderBottomColor: theme.colors.grey4,
                  borderBottomWidth: GlobalState.viewportInfo.isLarge ? 1 : 0,
                  backgroundColor: isHovering
                    ? theme.colors.primaryLighter
                    : state.unread
                    ? theme.colors.primaryLightest
                    : 'transparent'
                }}
              >
                <Avatar
                  rounded
                  title={notification.iconTitle}
                  source={{ uri: notification.icon }}
                />
                <Markdown
                  style={{
                    text: {
                      paddingLeft: 14,
                      paddingRight: 14,
                      marginTop: -10,
                      marginBottom: -8,
                      // width: "100%", maxWidth: 900,
                      width: GlobalState.viewportInfo.isLarge
                        ? GlobalState.viewportInfo.width - 400
                        : GlobalState.viewportInfo.width - 44
                    }
                  }}
                >
                  {notification.text}
                </Markdown>

                {GlobalState.viewportInfo.isLarge && (
                  <HoverObserver
                    children={({ isHovering }) => (
                      <Feather
                        name={
                          isHovering ? (state.unread ? 'minus-circle' : 'plus-circle') : 'circle'
                        }
                        size={16}
                        color={isHovering ? theme.colors.grey2 : theme.colors.grey4}
                        onPress={e => {
                          e.preventDefault();
                          state.setUnread(!state.unread);
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
    }
  );

  if (notificationQuery.error.message || notificationQuery.error.graphQLErrors.length) {
    console.dir(notificationQuery.error);
    return <></>;
  }
  if (!Array.isArray(notificationQuery.data)) return <></>;

  return (
    <>
      <Helmet title={title} />
      <ScrollView>
        <View
          style={{
            // alignSelf: GlobalState.viewportInfo.isLarge ? 'left' : '',
            paddingHorizontal: GlobalState.viewportInfo.isLarge ? 30 : 0,
            paddingVertical: 30
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: GlobalState.viewportInfo.isLarge
                ? theme.colors.grey3
                : theme.colors.grey5,
              borderBottomWidth: 1,
              paddingHorizontal: 10,
              marginBottom: GlobalState.viewportInfo.isLarge ? 10 : 0
            }}
          >
            <Text h4 style={{ marginBottom: 24, fontWeight: 'bold' }}>
              Your notifications ({notificationQuery.data.filter(n => n.unread).length})
            </Text>

            {GlobalState.viewportInfo.isLarge ? (
              <Text onPress={ClearNotifications} style={{ color: theme.colors.primary }}>
                Mark All Read
              </Text>
            ) : (
              <Feather
                name="settings"
                size={30}
                color={theme.colors.grey2}
                onPress={() => {
                  history.push('/settings');
                }}
              />
            )}
          </View>

          {!!notificationQuery.data.length &&
            notificationQuery.data
              .slice(0, 20)
              .map((n, i) => <NotificationRowModule key={`notification-${i}`} notification={n} />)}
        </View>
      </ScrollView>
    </>
  );
});
