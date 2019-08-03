import React from 'react';
import { ScrollView, TextProps } from 'react-native';
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
// import {Text} from 'react-native-ui-kitten';
import { Text } from 'react-native';

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

const TextLink = withRouter(
  ({
    history,
    to,
    onPress = () => null,
    style,
    ...props
  }: RouteComponentProps &
    TextProps & {
      to: string;
    }) => (
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

export { Link, Route, Redirect, Router, Switch, Stack, TextLink, withRouter };
