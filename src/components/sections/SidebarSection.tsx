import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ArrowLeft, ArrowRight, Lock } from '../icons';
import { SidebarDefault } from '../modules';
import { HoverObserver, TouchableOpacity } from '../lib';

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
              <View style={{ position: 'relative', zIndex: 3 }}>
                <ScrollView scrollsToTop={false}>
                  <View style={{ width: sidebarWidthFull }}>
                    <SidebarDefault />
                  </View>
                </ScrollView>

                <View
                  style={{
                    position: 'absolute',
                    top: 100,
                    right: -28
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setSidebarToggled(!sidebarToggled)}
                    style={{
                      backgroundColor: '#333',
                      borderTopRightRadius: 99,
                      borderBottomRightRadius: 99,
                      paddingLeft: 4,
                      paddingRight: 6,
                      paddingVertical: 6,
                      zIndex: 4
                    }}
                  >
                    <View style={{ zIndex: 5 }}>
                      {sidebarToggled ? (
                        <ArrowLeft width={20} height={20} fill="#999" />
                      ) : isHovering ? (
                        <Lock width={20} height={20} fill="#999" />
                      ) : (
                        <ArrowRight width={20} height={20} fill="#999" />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Animatable.View>
          )}
        />
      </Animatable.View>

      <Layout style={{ flex: 5 }}>{children}</Layout>
    </Layout>
  );
};
