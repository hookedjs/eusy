import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { LogoIcon } from '../svgs';
import { Helmet } from '../lib/Helmet';
import { useRouter } from '../lib/Routing';

export const UserProfileRoute = () => {
  const { history } = useRouter();
  return (
    <>
      <Helmet title="Settings" />
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
          User Profile
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
