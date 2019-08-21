import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Helmet } from '../lib/Helmet';
import { Link } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';

export const UserProfileScreen = () => {
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
        <Link to="/user/edit">
          <Button title="Edit Profile" />
        </Link>
        <Link to="/user/logout">
          <Button title="Log Out" />
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
