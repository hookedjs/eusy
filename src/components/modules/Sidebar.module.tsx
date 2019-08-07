import React from 'react';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { HoverObserver } from '../lib/HoverObserver';
import { Link, useRouter } from '../lib/Routing';
import { LogoCircleIcon } from '../svgs';

const SidebarHeader = () => (
  <HoverObserver
    children={({ isHovering }) => (
      <Link to="/">
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 15,
            paddingVertical: 20,
            backgroundColor: isHovering ? '#5D6C86' : 'inherit'
          }}
        >
          <LogoCircleIcon width={40} height={40} />
          <View style={{ alignContent: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, color: 'white', paddingLeft: 15 }}>EUSY</Text>
          </View>
        </View>
      </Link>
    )}
  />
);

const SidebarMenuItem = ({ to, text, featherIconName }) => {
  const { location } = useRouter();
  return (
    <HoverObserver
      children={({ isHovering }) => (
        <Link to={to}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 20,
              paddingVertical: 20,
              backgroundColor: isHovering || location.pathname === to ? '#5D6C86' : 'inherit'
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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#2D3C56'
      }}
    >
      <View>
        <SidebarHeader />
        <SidebarMenuItem to="/" text="Home" featherIconName="home" />
        <SidebarMenuItem to="/login" text="Login" featherIconName="power" />
        <SidebarMenuItem to="/user/edit" text="Edit Profile" featherIconName="user" />
        <SidebarMenuItem to="/user/profile" text="View Profile" featherIconName="user" />
      </View>
      <View>
        <SidebarMenuItem to="/settings" text="Settings" featherIconName="settings" />
      </View>
    </View>
  );
};
