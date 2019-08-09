import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, Text, ThemeContext } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { LogoIcon } from '../svgs';
import { Helmet } from '../lib/Helmet';
import { useRouter } from '../lib/Routing';

export const UserEditRoute = () => {
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
        <LogoIcon width={200} height={200} fill={theme.colors.primaryDark} />
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
