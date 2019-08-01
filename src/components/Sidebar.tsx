import React from 'react';
import { Text, Button, List, ListItem } from 'react-native-ui-kitten';
import { Image, Platform, View } from 'react-native';
import { ListRenderItemInfo } from 'react-native';
import { SvgImage } from './lib/SvgImage';
import { IconFill } from './lib/Icons';

export class Sidebar extends React.PureComponent {
  private data: string[] = ['Home Page', 'Inner Page'];

  private onItemPress = (index: number) => {
    // Handle item press
    console.dir('Pressed');
  };

  private renderItem = (info: ListRenderItemInfo<any>): React.ReactElement<any> => {
    return (
      <ListItem
        // icon={style => IconFill(require('../assets/img/icon.png'), {tintColor: "white"})}
        icon={style => (
          <Image
            style={{
              ...style,
              tintColor: 'white'
            }}
            source={require('../assets/img/icon.png')}
          />
        )}
        title={info.item}
        // description='Description'
        onPress={this.onItemPress}
        style={{
          backgroundColor: 'none'
        }}
        titleStyle={{
          color: 'white'
        }}
      />
    );
  };

  render() {
    return (
      <View
        style={{
          paddingTop: Platform.OS === 'web' ? 40 : 60
          // paddingHorizontal: 30
        }}
      >
        <List
          data={this.data}
          renderItem={this.renderItem}
          style={{
            backgroundColor: 'none'
          }}
        />
      </View>
    );
  }
}
