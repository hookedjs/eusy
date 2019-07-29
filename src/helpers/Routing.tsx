import {
  NativeRouter as Router,
  Link,
  Route as RouteOrig,
  Redirect,
  Switch,
  withRouter, RouteComponentProps, RouteProps
} from "react-router-native";
import Stack from 'react-router-native-stack';
import React, {Fragment} from "react";
import {ScrollView} from "react-native";

const Route = (
  {component, ...props}
  : RouteProps & {
    headerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
    footerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
  }
) => {
  const RouteComponent = component;
  return <RouteOrig
    render={(routeProps) => (
      <ScrollView>
        <RouteComponent {...routeProps}/>
      </ScrollView>
    )}
    {...props}
  />
};

export { Link, Route, Redirect, Router, Switch, Stack, withRouter };
