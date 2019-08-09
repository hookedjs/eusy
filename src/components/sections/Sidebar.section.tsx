import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Platform, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from 'react-native-elements';
import { SidebarModule } from '../modules/Sidebar.module';
import { HoverObserver } from '../lib/HoverObserver';
import { TouchableOpacity } from '../lib/Touchables';
import { WindowState } from '../../state/Window.state';
import { useRouter } from '../lib/Routing';
import { SidebarState } from '../../state/Sidebar.state';

export const SidebarSection = observer(({ children }: { children: React.ReactElement }) => {
  const { history } = useRouter();
  const theme = useContext(ThemeContext).theme;

  const sidebarWidthFull = 210;
  const sidebarWidthClosed = WindowState.isLarge ? 70 : 0;

  useEffect(() => {
    SidebarState.toggled = WindowState.isLarge;
    return history.listen(() => WindowState.isSmall && (SidebarState.toggled = false));
  }, []);

  if (!SidebarState.sidebarComponent) return <>{children}</>;
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Animatable.View
        transition="width"
        duration={400}
        easing="ease-in-out-quad"
        style={{
          width:
            SidebarState.toggled && WindowState.isLarge ? sidebarWidthFull : sidebarWidthClosed,
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
                top: WindowState.isLarge ? 0 : WindowState.heightHeader,
                height: WindowState.isLarge ? WindowState.heightUnsafe : WindowState.heightBody
              }}
            >
              <Animatable.View
                transition="width"
                duration={400}
                easing="ease-in-out-quad"
                style={{
                  width: SidebarState.toggled || isHovering ? sidebarWidthFull : sidebarWidthClosed,
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                <View style={{ flex: 1, width: sidebarWidthFull, overflow: 'hidden' }}>
                  <SidebarModule />
                </View>
              </Animatable.View>

              {WindowState.isLarge && (
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
                        onPress={() => (SidebarState.toggled = !SidebarState.toggled)}
                        style={{
                          backgroundColor: touchableHoverResults.isHovering
                            ? theme.colors.primaryDarker
                            : theme.colors.primaryDark,
                          borderTopRightRadius: 99,
                          borderBottomRightRadius: 99,
                          paddingLeft: 4,
                          paddingRight: 6,
                          paddingVertical: 6,
                          zIndex: 4
                        }}
                      >
                        <View style={{ zIndex: 5 }}>
                          {SidebarState.toggled ? (
                            <Feather name="arrow-left" size={20} color="white" />
                          ) : isHovering ? (
                            <Feather name="lock" size={20} color="white" />
                          ) : (
                            <Feather name="arrow-right" size={20} color="white" />
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
