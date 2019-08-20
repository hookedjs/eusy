import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { View } from 'react-native';
import { TextProps, ThemeContext } from 'react-native-elements';
import {
  BrowserRouter as Router,
  matchPath,
  Link as LinkOrig,
  Redirect,
  Route as RouteOrig,
  RouteProps,
  Switch,
  withRouter,
  RouteComponentProps,
  LinkProps
} from 'react-router-dom';
import StackOrig from 'react-router-native-stack';
import useRouter from 'use-react-router';
import { SidebarState } from '../../state/Sidebar.state';
import { WindowState } from '../../state/Window.state';
import { UserState } from '../../state/User.state';
import { ArrayIntersection } from '../../lib/Polyfills';
import { Helmet } from './Helmet';

// Extend Route to sync sidebar and wrap in scrollview
// This is identical to Routing.tsx, but copied here to eliminate need for another file
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
              paddingTop: this.props.headerComponent ? 0 : WindowState.heightStatusBar,
              paddingBottom: this.props.footerComponent ? 0 : WindowState.heightBottomSpeaker
            }}
          >
            {this.redirectIfUnderprivileged(routerProps.match.path)}

            <Helmet />
            <this.props.component {...routerProps} />
            {this.props.footerEndComponent && <this.props.footerEndComponent {...routerProps} />}
          </View>
        )}
        {...routeProps}
      />
    );
  }
}

const Link = ({ style, ...props }: LinkProps) =>
  typeof props.to === 'string' && props.to.includes('.') ? (
    <a
      href={props.to}
      target="_blank"
      style={{ textDecorationLine: 'none', ...style }}
      {...props}
    />
  ) : (
    <LinkOrig style={{ textDecorationLine: 'none', ...style }} {...props} />
  );

const TextLink = (props: LinkProps & TextProps) => {
  const theme = useContext(ThemeContext).theme;

  const color = (props.style && props.style.color) || theme.colors.primary;
  const colorVisited = (props.style && props.style.color) || theme.colors.primaryDark;

  const toPath = typeof props.to === 'string' ? props.to : props.to.pathname;

  return (
    <div style={{ display: 'inline-block' }}>
      {toPath.includes('.') ? (
        <a href={toPath} target="_blank" {...props} />
      ) : (
        <LinkOrig {...props} />
      )}

      <style jsx>{`
        div :global(a) {
          color: ${color};
        }
        div :global(a:visited) {
          color: ${colorVisited};
        }
      `}</style>
    </div>
  );
};

// const Stack = ({ children }: { children: React.ReactNode }) => <Switch>{children}</Switch>;
const Stack = process.env.NODE_ENV === 'production' ? StackOrig : Switch;

export { Link, matchPath, Route, Redirect, Router, Switch, Stack, TextLink, withRouter, useRouter };
