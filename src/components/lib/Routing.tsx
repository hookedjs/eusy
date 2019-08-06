/**
 *
 */
import React from 'react';
import { ScrollView, Text, TextProps, View } from 'react-native';
import { Linking } from 'expo';
import {
  NativeRouter as Router,
  Link as LinkOrig,
  Route as RouteOrig,
  Redirect,
  Switch,
  withRouter,
  RouteComponentProps,
  RouteProps,
  LinkProps
} from 'react-router-native';
import Stack from 'react-router-native-stack';

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

const Link = ({ to, onPress, ...props }: LinkProps) => {
  return typeof to === 'string' && to.includes('.') ? (
    <TouchableOpacity
      onPress={() => {
        if (onPress) onPress();
        Linking.openURL(to);
      }}
    >
      <LinkOrig to={''} {...props} />
    </TouchableOpacity>
  ) : (
    <LinkOrig to={to} {...props} />
  );
};

const TextLink = ({
  to,
  onPress = () => null,
  style,
  ...props
}: TextProps & {
  to: string;
}) => {
  const { history } = useRouter();
  return (
    <Text
      onPress={e => {
        onPress(e);
        if (to.includes('.')) Linking.openURL(to);
        else history.push(to);
      }}
      style={{
        textDecorationLine: 'underline',
        // @ts-ignore: style spread works but typescript gets cranky
        ...style
      }}
      {...props}
    />
  );
};

import useRouter from 'use-react-router';
import { TouchableOpacity } from './Touchables';

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
