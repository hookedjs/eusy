import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Platform, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import { SidebarModule } from '../modules/Sidebar.module';
import { HoverObserver } from '../lib/HoverObserver';
import { TouchableOpacity } from '../lib/Touchables';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useRouter } from '../lib/Routing';
import { SidebarSectionState } from './Sidebar.section.state';

export const SidebarSection = observer(({ children }: { children: React.ReactElement }) => {
  const { history, location } = useRouter();

  console.dir(location);

  const windowDims = useWindowDimensions();
  const sidebarWidthFull = 210;
  const sidebarWidthClosed = windowDims.isLarge ? 70 : 0;

  useEffect(() => {
    SidebarSectionState.toggled = windowDims.isLarge;
    return history.listen(() => windowDims.isSmall && (SidebarSectionState.toggled = false));
  }, []);

  if (!SidebarSectionState.sidebarComponent) return <>{children}</>;
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Animatable.View
        transition="width"
        duration={400}
        easing="ease-in-out-quad"
        style={{
          width:
            SidebarSectionState.toggled && windowDims.isLarge
              ? sidebarWidthFull
              : sidebarWidthClosed,
          backgroundColor: '#C5CCD7',
          zIndex: 1
        }}
      >
        <HoverObserver
          children={({ isHovering }) => (
            <View
              // @ts-ignore: position fixed
              style={{
                // backgroundColor: '#2D3C56',
                zIndex: 2,
                // View types don't allow 'fixed', but it's actually allowed and needed for web. Need to enhance typings
                position: Platform.OS === 'web' ? 'fixed' : 'relative',
                top: windowDims.isLarge ? 0 : windowDims.statusBarHeight + 47,
                height: windowDims.isLarge ? windowDims.height : windowDims.height - 94
              }}
            >
              <Animatable.View
                transition="width"
                duration={400}
                easing="ease-in-out-quad"
                style={{
                  width:
                    SidebarSectionState.toggled || isHovering
                      ? sidebarWidthFull
                      : sidebarWidthClosed,
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                <View style={{ flex: 1, width: sidebarWidthFull, overflow: 'hidden' }}>
                  <SidebarModule />
                </View>
              </Animatable.View>

              {windowDims.isLarge && (
                <View
                  style={{
                    position: 'absolute',
                    top: Platform.OS === 'web' ? 70 : 86,
                    right: -30
                  }}
                >
                  <HoverObserver
                    children={touchableHoverResults => (
                      <TouchableOpacity
                        onPress={() => (SidebarSectionState.toggled = !SidebarSectionState.toggled)}
                        style={{
                          backgroundColor: touchableHoverResults.isHovering ? '#171E2C' : '#2D3C56',
                          borderTopRightRadius: 99,
                          borderBottomRightRadius: 99,
                          paddingLeft: 4,
                          paddingRight: 6,
                          paddingVertical: 6,
                          zIndex: 4
                        }}
                      >
                        <View style={{ zIndex: 5 }}>
                          {SidebarSectionState.toggled ? (
                            <Feather name="arrow-left" size={20} color="#999" />
                          ) : isHovering ? (
                            <Feather name="lock" size={20} color="#999" />
                          ) : (
                            <Feather name="arrow-right" size={20} color="#999" />
                          )}
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>
          )}
        />
      </Animatable.View>

      <View style={{ flex: 5 }}>{children}</View>
    </View>
  );
});
