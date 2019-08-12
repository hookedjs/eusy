import React, { useContext } from 'react';
import { Platform, View } from 'react-native';
import { Button, Text, ThemeContext } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Helmet } from '../lib/Helmet';
import { Link, useRouter } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';

export const NotificationsScreen = () => {
  const { history } = useRouter();
  const theme = useContext(ThemeContext).theme;

  return (
    <>
      <Helmet title="Notifications" />
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
          This is the notifications page, coming soon.
        </Text>
        <Link to="/home/page">
          <Button
            onPress={() => Platform.OS !== 'web' && history.push('/home/page')}
            title="Goto Inner Page"
          />
        </Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 24
  }
});
