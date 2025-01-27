import React, { useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';
import { Text, ThemeContext } from '../elements';
import { Helmet } from '../lib/Helmet';
import { Link } from '../lib/Routing';
import { HoverObserver } from '../lib/HoverObserver';
import { GlobalState } from '../../GlobalState';
import { ThemeType } from '../../config/Theme.config';

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
  const theme = useContext(ThemeContext).theme as ThemeType;

  return (
    <HoverObserver
      children={({ isHovering }) => (
        <Link to={to}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 20,
              paddingLeft: GlobalState.viewportInfo.isLargeWeb ? 10 : 0,
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

export const SettingsScreen = () => {
  const title = 'Settings';

  return (
    <>
      <Helmet title={title} />
      <ScrollView>
        <View
          style={{
            paddingVertical: 30,
            paddingHorizontal: 30
          }}
        >
          <Text h4 style={{ marginBottom: 14, fontWeight: 'bold' }}>
            Settings
          </Text>
          <MenuItem to="/settings/user" text="My Account" featherIconName="settings" />
          <MenuItem to="/user/logout" text="Log Out" featherIconName="log-out" />
        </View>
      </ScrollView>
    </>
  );
};
