import React, { useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { observer, useLocalStore } from 'mobx-react-lite';
import { View } from 'react-native';
import { Avatar, ThemeContext } from 'react-native-elements';
import { Link } from '../lib/Routing';
import { HoverObserver } from '../lib/HoverObserver';
import Markdown from 'react-native-markdown-renderer';
import { GlobalState } from '../../GlobalState';
import { NotificationType } from '../../model/notifications/type';
import { gql } from 'apollo-boost';
import { useMutation } from '../../lib/mockApi/hooks/useMutation';

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

export const NotificationRowModule = observer(
  ({
    notification,
    onPress
  }: {
    notification: NotificationType;
    onPress?: (id: string) => any;
  }) => {
    const { theme } = useContext(ThemeContext);
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
              <Avatar rounded title={notification.iconTitle} source={{ uri: notification.icon }} />
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
                      name={isHovering ? (state.unread ? 'minus-circle' : 'plus-circle') : 'circle'}
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
