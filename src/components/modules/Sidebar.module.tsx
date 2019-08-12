import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from 'react-native-elements';
import { HoverObserver } from '../lib/HoverObserver';
import { Link, useRouter } from '../lib/Routing';
import { LogoModule } from './Logo.module';

const SidebarHeader = () => {
  const theme = useContext(ThemeContext).theme;

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

const SidebarMenuItem = ({ to, text, featherIconName }) => {
  const { location } = useRouter();
  const theme = useContext(ThemeContext).theme;

  return (
    <HoverObserver
      children={({ isHovering }) => (
        <Link to={to}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 20,
              paddingVertical: 20,
              backgroundColor:
                isHovering || location.pathname === to ? theme.colors.primaryLight : 'inherit'
            }}
          >
            <Feather name={featherIconName} size={28} color="white" />
            <View style={{ alignContent: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: 'white', paddingLeft: 22 }}>{text}</Text>
            </View>
          </View>
        </Link>
      )}
    />
  );
};

export const SidebarModule = () => {
  const theme = useContext(ThemeContext).theme;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: theme.colors.primaryDark
      }}
    >
      <View>
        <SidebarHeader />
        <SidebarMenuItem to="/home" text="Home" featherIconName="home" />
        <SidebarMenuItem to="/notifications" text="Notifications" featherIconName="activity" />
        <SidebarMenuItem to="/user" text="My Account" featherIconName="user" />
      </View>
      <View>
        <SidebarMenuItem to="/settings" text="Settings" featherIconName="settings" />
      </View>
    </View>
  );
};
