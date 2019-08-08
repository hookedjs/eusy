import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, Text, ThemeContext } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { LogoIcon } from '../svgs';
import { Helmet } from '../lib/Helmet';
import { Link, TextLink, useRouter } from '../lib/Routing';
import { getColors } from '../../Theme';

export const HomeRoute = observer(() => {
  const { history } = useRouter();
  const theme = useContext(ThemeContext);

  return (
    <View style={{ alignItems: 'center' }}>
      <Helmet title="Home" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: 60,
          paddingHorizontal: 30,
          maxWidth: 400
        }}
      >
        <LogoIcon width={200} height={200} fill={theme.theme.colors.primaryDark} />
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

        <Button
          onPress={() =>
            theme.updateTheme({
              colors: getColors(Math.floor(Math.random() * 255) + 1)
            })
          }
          title="Feeling Lucky?"
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  text: {
    marginBottom: 24,
    textAlign: 'center'
  }
});
