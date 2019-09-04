import React, { useContext } from 'react';
import { gql } from 'apollo-boost';
import { Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { Text, View } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import { GlobalState } from '../../GlobalState';
import { useQuery } from '../../mockApi/hooks/useQuery';
import { NotificationType } from '../../model/notifications/type';
import { HoverObserver } from '../lib/HoverObserver';
import { Link, useRouter } from '../lib/Routing';
import { LogoModule } from './Logo.module';

const NOTIFICATION_COUNT = gql`
  query($id: string) {
    notifications(where: { id: $id, unread: true }) {
      id
    }
  }
`;

export const SidebarModule = observer(() => {
  const { theme } = useContext(ThemeContext);
  const notificationQuery = useQuery<NotificationType[]>(NOTIFICATION_COUNT, {
    variables: { userId: GlobalState.user.id },
    pollInterval: 2000
  });

  const SidebarHeader = () => {
    const { theme } = useContext(ThemeContext);

    return (
      <HoverObserver
        children={({ isHovering }) => (
          <Link to="/">
            <View
              style={{
                flexDirection: 'row',
                paddingLeft: 15,
                paddingVertical: 20,
                backgroundColor: isHovering ? theme.colors.primaryLight : 'transparent'
              }}
            >
              <LogoModule width={40} height={40} />
              <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, color: 'white', paddingLeft: 15 }}>EUSY</Text>
              </View>
            </View>
          </Link>
        )}
      />
    );
  };

  const SidebarMenuItem = ({
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
    const { location } = useRouter();
    const { theme } = useContext(ThemeContext);
    const isActive = location.pathname.startsWith(to);

    return (
      <HoverObserver
        children={({ isHovering }) => (
          <Link to={to}>
            <View
              style={{
                flexDirection: 'row',
                paddingLeft: 20,
                paddingVertical: 20,
                backgroundColor: isHovering || isActive ? theme.colors.primaryLight : 'transparent'
              }}
            >
              <View>
                <Feather name={featherIconName} size={28} color="white" />
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
                <Text style={{ fontSize: 16, color: 'white', paddingLeft: 22 }}>{text}</Text>
              </View>
            </View>
          </Link>
        )}
      />
    );
  };

  if (notificationQuery.error.message || notificationQuery.error.graphQLErrors.length) {
    console.dir(notificationQuery.error);
    return <></>;
  }
  if (!Array.isArray(notificationQuery.data)) return <></>;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: theme.colors.primaryDark
      }}
    >
      <View>
        {GlobalState.viewportInfo.isLarge && <SidebarHeader />}
        <SidebarMenuItem to="/home" text="Home" featherIconName="home" />
        <SidebarMenuItem
          to="/notifications"
          text="Notifications"
          featherIconName="bell"
          showActivityBubble={!notificationQuery.loading && !!notificationQuery.data.length}
        />
      </View>
      <View>
        <SidebarMenuItem to="/settings" text="Settings" featherIconName="settings" />
      </View>
    </View>
  );
});
