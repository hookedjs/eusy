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
  {
    component,
    ...props
  }
    : {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
    props: RouteProps,
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
