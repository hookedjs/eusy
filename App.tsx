import React from 'react';
import { StyleSheet } from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import { Text, Button } from 'react-native-ui-kitten';

export default function App() {
  return (
      <ApplicationProvider
          mapping={mapping}
          theme={lightTheme}>
          <Layout style={styles.container}>
              <Text style={styles.text} category='h4'>Welcome to UI Kitten</Text>
              <Text style={styles.text}>We also recommend React-Native-Elements, but it's a little bloated at 30% more code.</Text>
              <Text style={styles.text}>Use react native for native AND web.</Text>
              <Button style={styles.button}>Get Started</Button>
          </Layout>
      </ApplicationProvider>
  );
}

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
