import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Helmet } from '../lib/Helmet';
import { Link } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';

export const SettingsScreen = () => {
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
          This is the settings page, coming soon.
        </Text>
        <Link to="/settings/page">
          <Button title="Goto Inner Page" />
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
