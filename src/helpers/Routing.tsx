import React, { Fragment } from 'react';
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

const Route = ({
  component,
  headerComponent = () => <Fragment />,
  footerComponent = () => <Fragment />,
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
        <Fragment>
          <HeaderComponent {...routeProps} />
          <RouteComponent {...routeProps} />
          <FooterComponent {...routeProps} />
        </Fragment>
      )}
      {...props}
    />
  );
};

const Stack = ({ children }: { children: React.ReactNode }) => <Switch>{children}</Switch>;

export { Link, Route, Redirect, Router, Switch, Stack, withRouter };
