import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Helmet } from '../lib/Helmet';
import { useRouter } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';

export const UserEditScreen = () => {
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
        <LogoModule />
        <Text h4 style={styles.text}>
          User Edit
        </Text>
        <Button onPress={() => history.push('/user/profile')} title="View Profile" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 24
  }
});
