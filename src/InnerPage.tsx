import React from "react";
import {Button, Layout, Text} from "react-native-ui-kitten";
import {StyleSheet} from "react-native";
import {withNavigation} from "react-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  text: {
    marginVertical: 16,
  },
  button: {
    marginVertical: 16,
  }
});

export const Page = withNavigation(({navigation}) => (
  <Layout style={styles.container}>
    <Text style={styles.text} category='h4'>Welcome to an inner page.</Text>
    <Button onPress={() => navigation.goBack()} style={styles.button}>Get Started</Button>
  </Layout>
));


export default Page;
