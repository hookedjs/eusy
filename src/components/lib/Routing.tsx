import React, { useContext } from 'react';
import { Linking } from 'expo';
import { toJS } from 'mobx';
import { Text, TextProps, View } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import {
  NativeRouter as Router,
  Link as LinkOrig,
  matchPath,
  Redirect,
  Route as RouteOrig,
  Switch,
  withRouter,
  RouteComponentProps,
  RouteProps,
  LinkProps
} from 'react-router-native';
import Stack from 'react-router-native-stack';
import useRouter from 'use-react-router';
import { SidebarState } from '../../state/Sidebar.state';
import { WindowState } from '../../state/Window.state';
import { UserState } from '../../state/User.state';
import { ArrayIntersection } from '../../lib/Polyfills';
import { TouchableOpacity } from './Touchables';

// Extend Route to sync sidebar and wrap in scrollview
// This is mostly identical to Routing.tsx, but footerEndComponent is abandoned.
class Route extends React.PureComponent<
  RouteProps & {
    headerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    footerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    footerEndComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    sidebarComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    animationType?: string;
    requiresRole?: string[];
  }
> {
  // If page permissions fail, redirect to login
  redirectIfUnderprivileged = currentPath => {
    if (
      this.props.requiresRole &&
      this.props.requiresRole.length &&
      !ArrayIntersection(toJS(UserState.roles), this.props.requiresRole).length
    )
      return <Redirect to={{ pathname: '/user/login', search: `?redirectTo=${currentPath}` }} />;
  };

  render() {
    // Create routeProps to be passed to RouteOrig
    let routeProps = { ...this.props };
    delete routeProps.component;
    delete routeProps.footerEndComponent;
    delete routeProps.sidebarComponent;
    delete routeProps.requiresRole;

    // Set the sidebar component
    SidebarState.sidebarComponent = this.props.sidebarComponent;

    return (
      <RouteOrig
        render={routerProps => (
          <View
            style={{
              flex: 1,
              paddingTop: this.props.headerComponent ? 0 : WindowState.heightStatusBar,
              paddingBottom: this.props.footerComponent ? 0 : WindowState.heightBottomSpeaker
            }}
          >
            {this.redirectIfUnderprivileged(routerProps.match.path)}
            <this.props.component {...routerProps} />
          </View>
        )}
        {...routeProps}
      />
    );
  }
}

const Link = ({ to, onPress, style, ...props }: LinkProps) => {
  return typeof to === 'string' && to.includes('.') ? (
    <TouchableOpacity
      onPress={() => {
        if (onPress) onPress();
        Linking.openURL(to);
      }}
    >
      <LinkOrig to={''} style={{ ...style }} {...props} />
    </TouchableOpacity>
  ) : (
    <LinkOrig to={to} style={{ ...style }} {...props} />
  );
};

const TextLink = ({ to, onPress = () => null, style, ...props }: LinkProps & TextProps) => {
  const { history } = useRouter();
  const theme = useContext(ThemeContext).theme;
  const toPath = typeof to === 'string' ? to : to.pathname;

  return (
    <Text
      onPress={e => {
        onPress(e);
        if (toPath.includes('.')) Linking.openURL(toPath);
        else history.push(to as string);
      }}
      style={{
        textDecorationLine: 'underline',
        color: theme.colors.primary,
        // @ts-ignore: style spread works but typescript gets cranky
        ...style
      }}
      {...props}
    />
  );
};

export {
  Link,
  matchPath,
  Route,
  Redirect,
  Router,
  RouteComponentProps,
  Switch,
  Stack,
  TextLink,
  withRouter,
  useRouter
};
