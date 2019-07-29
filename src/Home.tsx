import React, {useState} from "react";
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

export const Home = withNavigation(({navigation}) => (
  <Layout style={styles.container}>
    <Text style={styles.text} category='h4'>Welcome to UI Kitten</Text>
    <Text style={styles.text}>We also recommend React-Native-Elements, but it's a little bloated at 30% more
      code.</Text>
    <Text style={styles.text}>Use react native for native AND web.</Text>
    <Button onPress={() => navigation.navigate('Page')} style={styles.button}>Get Started</Button>
  </Layout>
));

export default Home;
