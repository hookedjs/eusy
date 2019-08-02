import React from 'react';
import { Layout, Text } from 'react-native-ui-kitten';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30
  },
  text: {
    marginVertical: 16
  },
  button: {
    marginVertical: 16
  }
});

export class NotFoundRoute extends React.Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Text style={styles.text} category="h4">
          404
        </Text>
      </Layout>
    );
  }
}

export default NotFoundRoute;
