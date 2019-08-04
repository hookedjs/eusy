import React, { useState } from 'react';
import { Layout } from 'react-native-ui-kitten';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ArrowLeftIcon, ArrowRightIcon, LockIcon } from '../svgs';
import { SidebarModule } from '../modules/Sidebar.module';
import { HoverObserver } from '../lib/HoverObserver';
import { TouchableOpacity } from '../lib/Touchables';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

export const SidebarSection = ({ children }: { children: React.ReactElement }) => {
  const windowDims = useWindowDimensions();
  const tabletBreakpoint = 720;
  const sidebarWidthFull = 250;
  const sidebarWidthClosed = windowDims.width > tabletBreakpoint ? 70 : 0;
  let [sidebarToggled, setSidebarToggled] = useState(windowDims.width > tabletBreakpoint);

  return (
    <Layout style={{ flex: 1, flexDirection: 'row' }}>
      <Animatable.View
        transition="width"
        duration={400}
        easing="ease-in-out-quad"
        style={{
          width:
            sidebarToggled && windowDims.width > tabletBreakpoint
              ? sidebarWidthFull
              : sidebarWidthClosed,
          backgroundColor: '#333',
          zIndex: 1
        }}
      >
        <HoverObserver
          children={({ isHovering }) => (
            <View
              style={{
                backgroundColor: '#2D3C56',
                zIndex: 2,
                // View types don't allow 'fixed', but it's actually allowed and needed for web. Need to enhance typings
                position: 'fixed',
                height: windowDims.height
              }}
            >
              <Animatable.View
                transition="width"
                duration={400}
                easing="ease-in-out-quad"
                style={{
                  width: sidebarToggled || isHovering ? sidebarWidthFull : sidebarWidthClosed,
                  backgroundColor: '#2D3C56',
                  height: windowDims.height,
                  overflow: 'hidden'
                }}
              >
                <View style={{ flex: 1, width: sidebarWidthFull, overflow: 'hidden' }}>
                  <SidebarModule />
                </View>
              </Animatable.View>

              <View
                style={{
                  position: 'absolute',
                  top: 70,
                  right: -28
                }}
              >
                <TouchableOpacity
                  onPress={() => setSidebarToggled(!sidebarToggled)}
                  style={{
                    backgroundColor: '#2D3C56',
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
                      <ArrowLeftIcon width={20} height={20} fill="#999" />
                    ) : isHovering ? (
                      <LockIcon width={20} height={20} fill="#999" />
                    ) : (
                      <ArrowRightIcon width={20} height={20} fill="#999" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </Animatable.View>

      <Layout style={{ flex: 5 }}>{children}</Layout>
    </Layout>
  );
};
