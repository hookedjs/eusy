import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Helmet } from '../lib/Helmet';
import { useRouter } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';

export const InnerPageScreen = () => {
  const { history } = useRouter();

  return (
    <>
      <Helmet title="Inner Page" />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: 60,
          paddingHorizontal: 30
        }}
      >
        <LogoModule />
        <Text h4 style={styles.text}>
          This is an inner page, to demonstrate routing and SEO.
        </Text>
        <Button onPress={() => history.goBack()} title="Go Back" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 24
  }
});
