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
import Stack from 'react-router-native-stack';
import { ScrollView, View } from 'react-native';
import useRouter from 'use-react-router';
import { SidebarState } from '../../state/Sidebar.state';
import { ThemeContext } from 'react-native-elements';
import { WindowState } from '../../state/Window.state';

// Extend Route to sync sidebar and wrap in scrollview
// This is identical to Routing.tsx, but copied here to eliminate need for another file
class Route extends React.PureComponent<
  RouteProps & {
    headerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    footerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    footerEndComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    sidebarComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  }
> {
  render() {
    let routeProps = { ...this.props };
    delete routeProps.component;
    delete routeProps.footerEndComponent;
    delete routeProps.sidebarComponent;

    SidebarState.sidebarComponent = this.props.sidebarComponent;

    return (
      <RouteOrig
        render={routerProps => (
          <ScrollView>
            <View
              style={{
                flex: 1,
                minHeight: '100%',
                paddingTop: this.props.headerComponent ? 0 : WindowState.heightStatusBar,
                paddingBottom: this.props.footerComponent ? 0 : WindowState.heightBottomSpeaker
              }}
            >
              <this.props.component {...routerProps} />
              {this.props.footerEndComponent && <this.props.footerEndComponent {...routerProps} />}
            </View>
          </ScrollView>
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

// const Stack = ({ children }: { children: React.ReactNode }) => <Switch>{children}</Switch>;

export { Link, Route, Redirect, Router, Switch, Stack, TextLink, withRouter, useRouter };
