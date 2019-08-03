import React from 'react';
import { Text } from 'react-native-ui-kitten';
import { Image, Platform, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { HoverObserver } from '../lib/HoverObserver';
import { Link } from '../lib/Routing';
import LogoIconCircle from '../../assets/img/logo-icon-circle.png';

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
          <Image source={LogoIconCircle} style={{ width: 40, height: 40 }} />
          <View style={{ alignContent: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, color: 'white', paddingLeft: 15 }}>EUS INDUSTRIES</Text>
          </View>
        </View>
      </Link>
    )}
  />
);

const SidebarMenuItem = ({ to, text, featherIconName }) => (
  <HoverObserver
    children={({ isHovering }) => (
      <Link to={to}>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 20,
            paddingVertical: 20,
            backgroundColor: isHovering ? '#5D6C86' : 'inherit'
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

export const SidebarDefault = () => {
  // const windowDims = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'web' ? 0 : 50
      }}
    >
      <View>
        <SidebarHeader />
        <SidebarMenuItem to="/" text="Home" featherIconName="home" />
        <SidebarMenuItem to="/page" text="Inner Page" featherIconName="activity" />
      </View>
      <View>
        <SidebarMenuItem to="/" text="Settings" featherIconName="settings" />
      </View>
    </View>
  );
};
