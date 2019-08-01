import {
  NativeRouter as Router,
  Link,
  Route as RouteOrig,
  Redirect,
  Switch,
  withRouter,
  RouteComponentProps,
  RouteProps
} from 'react-router-native';
import Stack from 'react-router-native-stack';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { Layout, Text } from 'react-native-ui-kitten';

const Route = ({
  component,
  sidebarComponent = () => <></>,
  ...props
}: RouteProps & {
  headerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  footerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  sidebarComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}) => {
  const RouteComponent = component;
  const SidebarComponent = sidebarComponent;

  let [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  useEffect(() => {
    const i = setInterval(() => setWindowWidth(Dimensions.get('window').width), 200);
    return () => i;
  });

  const sidebarWidth = 180;
  const animatedOffset = new Animated.Value(0);
  const animatedWindowWidth = new Animated.Value(windowWidth);
  let [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    const duration = 300;
    Animated.timing(animatedOffset, {
      toValue: sidebarOpen ? -sidebarWidth : 0,
      duration: duration
      // useNativeDriver: true
    }).start();
    Animated.timing(animatedWindowWidth, {
      toValue: sidebarOpen ? windowWidth + sidebarWidth : windowWidth,
      duration: duration
      // useNativeDriver: true
    }).start();
    setTimeout(() => setSidebarOpen(!sidebarOpen), duration / 2);
  };

  return (
    <RouteOrig
      render={routeProps => (
        <Layout style={{ flex: 1 }}>
          <Animated.View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: animatedWindowWidth,
              left: animatedOffset
            }}
          >
            <Layout style={{ width: sidebarWidth, backgroundColor: '#ccc', zIndex: 1 }}>
              <SidebarComponent />
              <TouchableOpacity
                onPress={toggleSidebar}
                style={{
                  position: 'absolute',
                  top: 6,
                  right: -22,
                  backgroundColor: '#ccc',
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  paddingHorizontal: 4,
                  paddingVertical: 6
                }}
              >
                <View>
                  <Text>{sidebarOpen ? '←' : '→'}</Text>
                </View>
              </TouchableOpacity>
            </Layout>

            <Layout style={{ flex: 5 }}>
              <ScrollView>
                <RouteComponent {...routeProps} />
              </ScrollView>
            </Layout>
          </Animated.View>
        </Layout>
      )}
      {...props}
    />
  );
};

export { Link, Route, Redirect, Router, Switch, Stack, withRouter };
