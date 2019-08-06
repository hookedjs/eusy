import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { LogoIcon } from '../svgs';
import { Helmet } from '../lib/Helmet';
import { Link, TextLink, useRouter } from '../lib/Routing';

export const HomeRoute = () => {
  const { history } = useRouter();
  return (
    <View>
      <Helmet title="Home" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: 60,
          paddingHorizontal: 30
        }}
      >
        <LogoIcon width={200} height={200} fill="#2D3C56" />
        <Text h4 style={styles.text}>
          Welcome to EUSA
        </Text>
        <Text style={styles.text}>
          Expo Universal Starter: A low-config, low-bloat starter/boilerplate for a universal
          expo-cli.
        </Text>
        <Text style={styles.text}>
          It comes with and demonstrates many commonly used UX patterns. All that with exceptional
          hot-reload support and less 150kb bundle. More info at{' '}
          <TextLink to={'https://github.com/hookedjs/eusy'}>
            https://github.com/hookedjs/eusy
          </TextLink>
          .
        </Text>
        <Link to="/page">
          <Button onPress={() => history.push('/page')} title="Goto Inner Page" />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 24,
    textAlign: 'center',
    maxWidth: 400
  }
});
