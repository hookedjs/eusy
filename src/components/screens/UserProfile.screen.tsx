import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Helmet } from '../lib/Helmet';
import { useRouter } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';

export const UserProfileScreen = () => {
  const { history } = useRouter();

  return (
    <ScrollView>
      <Helmet title="Settings" />
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
          User Profile
        </Text>
        <Button onPress={() => history.push('/user/edit')} title="Edit Profile" />
        <Button onPress={() => history.push('/user/logout')} title="Log Out" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 24
  }
});
