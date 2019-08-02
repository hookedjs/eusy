import React from 'react';
import { Button, Layout, Text } from 'react-native-ui-kitten';
import { StyleSheet } from 'react-native';
import { withRouter } from '../lib/Routing';
import { Helmet } from '../lib/Helmet';

export const InnerPageRoute = withRouter(({ history }) => (
  <>
    <Helmet title="Inner Page" description="This is an inner page." />
    <Layout style={styles.container}>
      <Text style={styles.text} category="h4">
        Welcome to an inner page.
      </Text>
      <Button onPress={() => history.goBack()}>Go Back</Button>
    </Layout>
  </>
));
export default InnerPageRoute;

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
