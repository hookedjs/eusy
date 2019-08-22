import React, { useContext } from 'react';
import { toJS } from 'mobx';
import { ScrollView } from 'react-native';
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

    // Have to include the headercomponent on development mode for now because development mode
    // uses Switch instead of Stack, due to an HMR bug (see Stack declaration for more info).
    return (
      <RouteOrig
        render={routerProps => (
          <>
            {this.props.headerComponent && process.env.NODE_ENV !== 'production' && (
              <this.props.headerComponent {...routerProps} />
            )}
            <ScrollView
              style={{
                paddingTop: this.props.headerComponent ? 0 : WindowState.heightStatusBar,
                paddingBottom: this.props.footerComponent ? 0 : WindowState.heightBottomSpeaker
              }}
            >
              {this.redirectIfUnderprivileged(routerProps.match.path)}

              <Helmet />
              <this.props.component {...routerProps} />
              {this.props.footerEndComponent && <this.props.footerEndComponent {...routerProps} />}
            </ScrollView>
          </>
        )}
        {...routeProps}
      />
    );
  }
}

const Link = ({
  style = {},
  onPress = () => null,
  ...props
}: LinkProps & {
  onPress: () => any;
}) => {
  style.textDecorationLine = 'none';

  if (typeof props.to === 'string' && props.to[0] !== '/')
    return <a href={props.to} target="_blank" onClick={onPress} style={style} {...props} />;
  else return <LinkOrig onClick={onPress} style={style} {...props} />;
};

const TextLink = ({
  onPress = () => null,
  ...props
}: LinkProps &
  TextProps & {
    onPress: () => any;
  }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ display: 'inline-block' }}>
      {typeof props.to === 'string' && props.to[0] !== '/' ? (
        <a href={props.to} target="_blank" onClick={onPress} {...props} />
      ) : (
        <LinkOrig onClick={onPress} {...props} />
      )}

      <style jsx>{`
        div :global(a) {
          color: ${(props.style && props.style.color) || theme.colors.primary};
        }
        div :global(a:visited) {
          color: ${(props.style && props.style.color) || theme.colors.primaryDark};
        }
      `}</style>
    </div>
  );
};

// const Stack = ({ children }: { children: React.ReactNode }) => <Switch>{children}</Switch>;
// TODO: Get HMR working with Stack.
const Stack = process.env.NODE_ENV === 'production' ? StackOrig : Switch;

export { Link, matchPath, Route, Redirect, Router, Switch, Stack, TextLink, withRouter, useRouter };
