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
import { View } from 'react-native';

class Route extends React.PureComponent<
  RouteProps & {
    // headerComponent 1 vs 2: 1 is fixed on mobile, 2 is not
    headerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    footerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    footerEndComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  }
> {
  render() {
    let routeProps = { ...this.props };
    delete routeProps.component;
    if (routeProps.headerComponent) delete routeProps.headerComponent;
    if (routeProps.footerComponent) delete routeProps.footerComponent;
    if (routeProps.footerEndComponent) delete routeProps.footerEndComponent;

    return (
      <RouteOrig
        render={routerProps => (
          <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            {this.props.headerComponent && <this.props.headerComponent {...routerProps} />}
            <div style={{ overflow: 'auto', flex: 1, fontSize: 30 }}>
              <View style={{ flex: 1, minHeight: '100%' }}>
                <this.props.component {...routerProps} />
                {this.props.footerEndComponent && (
                  <this.props.footerEndComponent {...routerProps} />
                )}
              </View>
            </div>
            {this.props.footerComponent && <this.props.footerComponent {...routerProps} />}
          </div>
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

import useRouter from 'use-react-router';

export { Link, Route, Redirect, Router, Switch, Stack, TextLink, withRouter, useRouter };
