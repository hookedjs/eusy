import React, { useContext } from 'react';
import { Linking } from 'expo';
import { toJS } from 'mobx';
import { Text, TextProps, View } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import {
  NativeRouter as Router,
  Link as RRNLink,
  matchPath,
  Redirect,
  Route as RRNRoute,
  Switch,
  withRouter,
  RouteComponentProps,
  RouteProps,
  LinkProps
} from 'react-router-native';
import Stack from 'react-router-native-stack';
import useRouter from 'use-react-router';
import { GlobalState } from '../../GlobalState';
import { ArrayIntersection } from '../../lib/Polyfills';
import { TouchableOpacity } from './Touchables';
import { ThemeType } from '../../config/Theme.config';

// Extend Route to sync sidebar
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
      !GlobalState.user.roles.includes('admin') &&
      this.props.requiresRole &&
      this.props.requiresRole.length &&
      !ArrayIntersection(toJS(GlobalState.user.roles), this.props.requiresRole).length
    ) {
      console.log(`Current user fails permissions for ${this.props.path}`);
      return <Redirect to={{ pathname: '/user/login', search: `?redirectTo=${currentPath}` }} />;
    }
  };

  render() {
    // Create routeProps to be passed to RRNRoute
    let routeProps = { ...this.props };
    delete routeProps.component;
    delete routeProps.footerEndComponent;
    delete routeProps.sidebarComponent;
    delete routeProps.requiresRole;

    // Set the sidebar component
    GlobalState.sidebarComponent = this.props.sidebarComponent;

    return (
      <RRNRoute
        render={routerProps => (
          <View
            style={{
              flex: 1,
              paddingTop: this.props.headerComponent ? 0 : GlobalState.viewportInfo.heightStatusBar,
              paddingBottom: this.props.footerComponent
                ? 0
                : GlobalState.viewportInfo.heightBottomSpeaker
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

const Link = ({ to, onPress, ...props }: LinkProps) => {
  const { history } = useRouter();

  return (
    <TouchableOpacity
      onPress={e => {
        if (onPress) onPress(e);
        if (typeof to === 'string' && to[0] === '#') void 0;
        else if (typeof to === 'string' && to[0] !== '/') Linking.openURL(to);
        else history.push(to as string);
      }}
    >
      <RRNLink to="" {...props} />
    </TouchableOpacity>
  );
};

const TextLink = ({ to, onPress, style, ...props }: LinkProps & TextProps) => {
  const { history } = useRouter();
  const theme = useContext(ThemeContext).theme as ThemeType;

  return (
    <Text
      onPress={e => {
        if (onPress) onPress(e);
        console.log(typeof to);
        if (typeof to === 'string' && to[0] === '#') void 0;
        else if (typeof to === 'string' && to[0] !== '/') Linking.openURL(to);
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
