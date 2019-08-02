import React from 'react';
import { ScrollView } from 'react-native';
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

class Route extends React.PureComponent<
  RouteProps & {
    headerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    footerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  }
> {
  render() {
    let routeProps = { ...this.props };
    delete routeProps.component;
    return (
      <RouteOrig
        render={routerProps => (
          <ScrollView>
            <this.props.component {...routerProps} />
          </ScrollView>
        )}
        {...routeProps}
      />
    );
  }
}

export { Link, Route, Redirect, Router, Switch, Stack, withRouter };
