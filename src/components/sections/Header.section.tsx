import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { observer } from 'mobx-react-lite';
import { Feather } from '@expo/vector-icons';
import { observable } from 'mobx';
import { SearchBar } from 'react-native-elements';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useRouter } from '../lib/Routing';
import { SidebarState } from './Sidebar.section';
import { LogoCircleIcon } from '../svgs';

export const HeaderState = observable({
  numberOfBackSteps: 0,
  search: ''
});

export const HeaderSection = observer(() => {
  const { history } = useRouter();
  const windowDims = useWindowDimensions();

  useEffect(() => {
    return history.listen((location, action) => {
      if (action === 'PUSH') HeaderState.numberOfBackSteps = HeaderState.numberOfBackSteps + 1;
      else if (action === 'POP') HeaderState.numberOfBackSteps = HeaderState.numberOfBackSteps - 1;
    });
  }, []);

  return (
    <View
      style={{
        zIndex: 2,
        backgroundColor: '#C5CCD7',
        padding: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <View
        style={{
          minWidth: windowDims.isLarge ? 48 : 0
        }}
      >
        {windowDims.isMobileWeb ? (
          <LogoCircleIcon width={24} height={24} style={{ paddingRight: 10 }} />
        ) : (
          !!HeaderState.numberOfBackSteps && (
            <Feather
              name="chevron-left"
              size={24}
              color="#2D3C56"
              onPress={() => history.goBack()}
              style={{ paddingLeft: 10, paddingRight: 14 }}
            />
          )
        )}
      </View>
      <View style={{ flex: 1, maxWidth: 500 }}>
        <SearchBar
          placeholder="Search..."
          showLoading={false}
          onFocus={() => console.log('focus')}
          onBlur={() => console.log('blur')}
          onCancel={() => console.log('cancel')}
          onClear={() => console.log('cleared')}
          value={HeaderState.search}
          onChangeText={s => (HeaderState.search = s)}
          lightTheme={true}
          containerStyle={{
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            padding: 0
          }}
          inputContainerStyle={{
            backgroundColor: '#e4e7e8',
            borderRadius: 20,
            paddingHorizontal: 6
          }}
          inputStyle={{ minHeight: 35 }}
          leftIconContainerStyle={{ height: 35 }}
          rightIconContainerStyle={{ height: 35 }}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {windowDims.isLarge && (
          <Avatar
            rounded
            showEditButton
            source={require('../../assets/img/brian-eus-author.jpg')}
            onPress={() => history.push('/')}
            containerStyle={{ marginLeft: 10 }}
          />
        )}
        {windowDims.isMobileWeb && (
          <Feather
            name="menu"
            size={24}
            color="#2D3C56"
            onPress={() => (SidebarState.toggled = !SidebarState.toggled)}
            style={{ paddingLeft: 10 }}
          />
        )}
      </View>
    </View>
  );
});
