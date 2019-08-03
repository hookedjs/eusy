import React from 'react';
import {
  BrowserRouter as Router,
  Link as LinkOrig,
  Route as RouteOrig,
  RouteProps,
  Redirect,
  Switch,
  withRouter,
  RouteComponentProps,
  LinkProps
} from 'react-router-dom';
import { Layout } from 'react-native-ui-kitten';

class Route extends React.PureComponent<
  RouteProps & {
    headerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    footerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  }
> {
  render() {
    let routeProps = { ...this.props };
    delete routeProps.component;
    delete routeProps.headerComponent;
    delete routeProps.footerComponent;

    return (
      <RouteOrig
        render={routerProps => (
          <Layout style={{ flex: 1 }}>
            <this.props.headerComponent {...routerProps} />
            <Layout style={{ flex: 1, flexDirection: 'row' }}>
              <this.props.component {...routerProps} />
            </Layout>
            <this.props.footerComponent {...routerProps} />
          </Layout>
        )}
        {...routeProps}
      />
    );
  }
}

const Link = ({ style, ...props }: LinkProps) => (
  <LinkOrig style={{ textDecorationLine: 'none', ...style }} {...props} />
);

const TextLink = LinkOrig;

const Stack = ({ children }: { children: React.ReactNode }) => <Switch>{children}</Switch>;

export { Link, Route, Redirect, Router, Switch, Stack, TextLink, withRouter };
