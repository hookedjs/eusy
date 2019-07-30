import React from "react";
import {Button, Layout, Text} from "react-native-ui-kitten";
import {StyleSheet} from "react-native";
import {withRouter} from "./helpers/Routing";

import Test3 from './components/Test3';
import Test4 from './components/Test3b';
import {Helmet} from "./components/Helmet";


export const Home = withRouter(({history}) => {
  return <>
    <Helmet title="Home" />
    <Layout style={styles.container}>
      <Text style={styles.text} category='h4'>Welcome to UI Kitten</Text>
      <Text style={styles.text}>We also recommend React-Native-Elements, but it's a little bloated at 30% more code.</Text>
      <Text style={styles.text}>Use react native for native AND web.</Text>
      <Button onPress={() => history.push('/page')} style={styles.button}>Get Started</Button>
      <Test3/>
      <Test4/>
    </Layout>
  </>;
});

export default Home;

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
