import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from '../elements';
import { StyleSheet } from 'react-native';
import { Helmet } from '../lib/Helmet';
import { useRouter } from '../lib/Routing';
import { LogoModule } from '../modules/Logo.module';

export const InnerPageScreen = () => {
  const title = 'Inner Page';
  const { history } = useRouter();

  return (
    <>
      <Helmet title={title} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
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
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 24
  }
});
