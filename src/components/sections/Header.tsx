import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LogoIcon } from '../icons';
import { withRouter } from '../lib';

export const Header = withRouter(({ history }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText} onPress={() => history.goBack()}>
        ← &nbsp;
      </Text>
      <LogoIcon width={20} height={20} fill="white" />
      <Text style={styles.headerText}>HookedJS</Text>
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
