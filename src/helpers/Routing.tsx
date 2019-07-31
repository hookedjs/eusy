import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route as RouteOrig,
  RouteProps,
  Redirect,
  Switch,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import { AnimatedRoute } from 'react-router-transition';

const Route = ({
  component,
  headerComponent = () => <></>,
  footerComponent = () => <></>,
  ...props
}: RouteProps & {
  headerComponent: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  footerComponent: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}) => {
  const RouteComponent = component;
  const HeaderComponent = headerComponent;
  const FooterComponent = footerComponent;
  return (
    <RouteOrig
      render={routeProps => (
        <>
          <HeaderComponent {...routeProps} />
          <RouteComponent {...routeProps} />
          <FooterComponent {...routeProps} />
        </>
      )}
      {...props}
    />
  );
};

const Stack = ({ children }: { children: React.ReactNode }) => <Switch>{children}</Switch>;

export { Link, Route, Redirect, Router, Switch, Stack, withRouter };
