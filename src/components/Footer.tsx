import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withRouter } from './lib/Routing';

export const Footer = withRouter(({ history }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText} onPress={() => history.goBack()}>
        ← &nbsp;
      </Text>
      <Text style={styles.headerText}>Footer</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flex: -1,
    height: 80,
    paddingTop: 40,
    backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'white'
  }
});
