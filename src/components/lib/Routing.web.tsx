import React, { useContext } from 'react';
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
import { ThemeContext } from 'react-native-elements';

class Route extends React.PureComponent<
  RouteProps & {
    // headerComponent 1 vs 2: 1 is fixed on mobile, 2 is not
    headerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    footerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    footerEndComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    sidebarComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  }
> {
  render() {
    let routeProps = { ...this.props };
    delete routeProps.component;
    if (routeProps.headerComponent) delete routeProps.headerComponent;
    if (routeProps.footerComponent) delete routeProps.footerComponent;
    if (routeProps.footerEndComponent) delete routeProps.footerEndComponent;
    delete routeProps.sidebarComponent;

    SidebarSectionState.sidebarComponent = this.props.sidebarComponent;

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

const TextLink = (props: LinkProps) => {
  const theme = useContext(ThemeContext).theme;

  const color = (props.style && props.style.color) || theme.colors.primary;
  const colorVisited = (props.style && props.style.color) || theme.colors.primaryDark;

  return (
    <div style={{ display: 'inline-block' }}>
      {typeof props.to === 'string' && props.to.includes('.') ? (
        <a href={props.to} target="_blank" {...props} />
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

const Stack = ({ children }: { children: React.ReactNode }) => <Switch>{children}</Switch>;

import useRouter from 'use-react-router';
import { SidebarSectionState } from '../sections/Sidebar.section.state';

export { Link, Route, Redirect, Router, Switch, Stack, TextLink, withRouter, useRouter };
