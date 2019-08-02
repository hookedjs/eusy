import React from 'react';
import { Text } from 'react-native-ui-kitten';
import { Platform, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { HoverObserver } from '../lib/HoverObserver';
import { withRouter } from '../lib/Routing';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const SidebarDefault = withRouter(({ history }) => (
  <View style={{ paddingTop: Platform.OS === 'web' ? 40 : 60 }}>
    <HoverObserver
      children={({ isHovering }) => (
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 18,
            paddingVertical: 20,
            backgroundColor: isHovering ? '#5D6C86' : 'inherit'
          }}
        >
          <Feather name="activity" size={32} color="white" />
          <TouchableOpacity onPress={() => history.push('/')}>
            <View style={{ alignContent: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: 'white', paddingLeft: 20 }}>Home</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />

    <HoverObserver
      children={({ isHovering }) => (
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 18,
            paddingVertical: 20,
            backgroundColor: isHovering ? '#5D6C86' : 'inherit'
          }}
        >
          <Feather name="activity" size={32} color="white" />
          <TouchableOpacity onPress={() => history.push('/page')}>
            <View style={{ alignContent: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: 'white', paddingLeft: 20 }}>Inner Page</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  </View>
));
