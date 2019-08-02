import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { withRouter } from '../lib/Routing';

export const FooterSection = withRouter(({ history }) => {
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
    height: Platform.OS === 'web' ? 70 : 80,
    paddingBottom: Platform.OS === 'web' ? 0 : 20,
    backgroundColor: '#555',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'white'
  }
});
