import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import { View } from 'react-native';
import { Sidebar } from './Sidebar';
import * as Animatable from 'react-native-animatable';
import { HoverObserver } from '../helpers/HoverObserver';
import { SvgImage } from './lib/SvgImage';

export const SidebarSection = ({ children }: { children: React.ReactElement }) => {
  let [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  useEffect(() => {
    const i = setInterval(() => setWindowWidth(Dimensions.get('window').width), 400);
    return () => i;
  });

  const sidebarWidthFull = 250;
  const sidebarWidthClosed = windowWidth > 720 ? 70 : 0;
  let [sidebarToggled, setSidebarToggled] = useState(windowWidth > 720);

  return (
    <Layout style={{ flex: 1, flexDirection: 'row' }}>
      <Animatable.View
        transition="width"
        duration={400}
        easing="ease-in-out-quad"
        style={{
          width: sidebarToggled && windowWidth > 720 ? sidebarWidthFull : sidebarWidthClosed,
          backgroundColor: '#333',
          zIndex: 1
        }}
      >
        <HoverObserver
          children={({ isHovering }) => (
            <Animatable.View
              transition="width"
              duration={400}
              easing="ease-in-out-quad"
              style={{
                width: sidebarToggled || isHovering ? sidebarWidthFull : sidebarWidthClosed,
                backgroundColor: '#333',
                zIndex: 2,
                position: 'absolute',
                height: Dimensions.get('window').height
              }}
            >
              <View style={{ position: 'relative' }}>
                <ScrollView scrollsToTop={false}>
                  <View style={{ width: sidebarWidthFull }}>
                    <Sidebar />
                  </View>
                </ScrollView>

                <TouchableOpacity
                  onPress={() => setSidebarToggled(!sidebarToggled)}
                  style={{
                    position: 'absolute',
                    top: 100,
                    right: -28,
                    backgroundColor: '#333',
                    borderTopRightRadius: 99,
                    borderBottomRightRadius: 99,
                    paddingLeft: 4,
                    paddingRight: 6,
                    paddingVertical: 6,
                    zIndex: 1
                  }}
                >
                  <View>
                    <SvgImage
                      width={20}
                      height={20}
                      fill="#999"
                      fillAll={true}
                      source={
                        sidebarToggled
                          ? require('../assets/icons/arrow-left.svg')
                          : isHovering
                          ? require('../assets/icons/lock.svg')
                          : require('../assets/icons/arrow-right.svg')
                      }
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          )}
        />
      </Animatable.View>

      <Layout style={{ flex: 5 }}>{children}</Layout>
    </Layout>
  );
};
