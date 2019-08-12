import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, Text, ThemeContext } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Helmet } from '../lib/Helmet';
import { useRouter } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';

export const SettingsScreen = () => {
  const { history } = useRouter();
  const theme = useContext(ThemeContext).theme;

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
          This is the settings page, coming soon.
        </Text>
        <Button onPress={() => history.push('page')} title="Goto Inner Page" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 24
  }
});
