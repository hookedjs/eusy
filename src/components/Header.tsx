import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { withRouter } from '../helpers/Routing.web';
import { LogoWhite } from '../Config';

export const Header = withRouter(({ history }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText} onPress={() => history.goBack()}>
        ← &nbsp;
      </Text>
      <Image source={LogoWhite} style={{ width: 20, height: 20 }} />
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
