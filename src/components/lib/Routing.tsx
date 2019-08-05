import React from 'react';
import { ScrollView, TextProps, View } from 'react-native';
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
import { Text } from 'react-native';

class Route extends React.PureComponent<
  RouteProps & {
    headerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    footerComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    footerEndComponent?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  }
> {
  render() {
    let routeProps = { ...this.props };
    delete routeProps.component;
    delete routeProps.footerEndComponent;

    return (
      <RouteOrig
        render={routerProps => (
          <ScrollView>
            <View style={{ flex: 1, minHeight: '100%' }}>
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

const TextLink = withRouter(
  ({
    history,
    to,
    onPress = () => null,
    style,
    ...props
  }: RouteComponentProps & TextProps & { to: string }) => (
    <Text
      onPress={e => {
        onPress(e);
        history.push(to);
      }}
      style={{
        textDecorationLine: 'underline',
        // @ts-ignore: style spread works but typescript gets cranky
        ...style
      }}
      {...props}
    />
  )
);

import useRouter from 'use-react-router';

export {
  Link,
  Route,
  Redirect,
  Router,
  RouteComponentProps,
  Switch,
  Stack,
  TextLink,
  withRouter,
  useRouter
};
