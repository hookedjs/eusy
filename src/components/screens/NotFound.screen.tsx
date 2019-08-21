import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Helmet } from '../lib/Helmet';
import { Link } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';

export const NotFoundScreen = () => {
  return (
    <ScrollView>
      <Helmet title="404" />
      <View
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          paddingVertical: 60,
          paddingHorizontal: 30
        }}
      >
        <LogoModule />
        <Text h4 style={styles.text}>
          Uh oh, the url you entered does not exist.
        </Text>
        <Link to="/">
          <Button title="Go Home?" />
        </Link>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 24
  }
});
