import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, Text, ThemeContext } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { LogoIcon } from '../svgs';
import { Helmet } from '../lib/Helmet';
import { useRouter } from '../lib/Routing';

export const InnerPageRoute = () => {
  const { history } = useRouter();
  const theme = useContext(ThemeContext).theme;
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
        <LogoIcon width={200} height={200} fill={theme.colors.primaryDark} />
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
