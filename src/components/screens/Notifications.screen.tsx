import React, { useContext } from 'react';
import { gql } from 'apollo-boost';
import { Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { ScrollView, View } from 'react-native';
import { Text, ThemeContext } from 'react-native-elements';
import { GlobalState } from '../../GlobalState';
import { NotificationType } from '../../model/notifications/type';
import { useQuery } from '../../lib/mockApi/hooks/useQuery';
import { useMutation } from '../../lib/mockApi/hooks/useMutation';
import { Helmet } from '../lib/Helmet';
import { TextLink, useRouter } from '../lib/Routing';
import { NotificationRowModule } from '../modules/NotificationRow.module';

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
  const { theme } = useContext(ThemeContext);
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
            alignSelf: GlobalState.viewportInfo.isLarge ? 'left' : '',
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
