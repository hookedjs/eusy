import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { LogoIcon } from '../icons';
import { withRouter } from '../lib/Routing';

export const HeaderSection = withRouter(({ history }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText} onPress={() => history.goBack()}>
        ← &nbsp;
      </Text>
      <LogoIcon width={20} height={20} fill="#2D3C56" />
      <Text style={styles.headerText}>HookedJS</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flex: -1,
    height: Platform.OS === 'web' ? 60 : 80,
    paddingTop: Platform.OS === 'web' ? 0 : 34,
    backgroundColor: '#d4d7d8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: '#2D3C56'
  }
});
