import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Platform, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import { ThemeContext } from '../elements';
import { SidebarModule } from '../modules/Sidebar.module';
import { HoverObserver } from '../lib/HoverObserver';
import { TouchableOpacity } from '../lib/Touchables';
import { GlobalState } from '../../GlobalState';
import { useRouter } from '../lib/Routing';
import { ThemeType } from '../../config/Theme.config';

export const SidebarSection = observer(({ children }: { children: React.ReactElement }) => {
  const { history } = useRouter();
  const theme = useContext(ThemeContext).theme as ThemeType;

  const sidebarWidthFull = 210;
  const sidebarWidthClosed = GlobalState.viewportInfo.isLarge ? 70 : 0;

  useEffect(() => {
    GlobalState.sidebarToggled = GlobalState.viewportInfo.isLarge;
    return history.listen(
      () => GlobalState.viewportInfo.isSmall && (GlobalState.sidebarToggled = false)
    );
  }, []);

  if (!GlobalState.sidebarComponent) return <>{children}</>;
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Animatable.View
        transition="width"
        duration={400}
        easing="ease-in-out-quad"
        style={{
          width:
            GlobalState.sidebarToggled && GlobalState.viewportInfo.isLarge
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
                top: GlobalState.viewportInfo.isLarge ? 0 : GlobalState.viewportInfo.heightHeader,
                height: GlobalState.viewportInfo.isLarge
                  ? GlobalState.viewportInfo.heightUnsafe
                  : GlobalState.viewportInfo.heightBody
              }}
            >
              <Animatable.View
                transition="width"
                duration={400}
                easing="ease-in-out-quad"
                style={{
                  width:
                    GlobalState.sidebarToggled || isHovering
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

              {isHovering && GlobalState.viewportInfo.isLarge && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 40,
                    right: -25
                  }}
                >
                  <HoverObserver
                    children={touchableHoverResults => (
                      <TouchableOpacity
                        onPress={() => (GlobalState.sidebarToggled = !GlobalState.sidebarToggled)}
                        style={{
                          backgroundColor: touchableHoverResults.isHovering
                            ? theme.colors.primaryDarker
                            : theme.colors.primaryDark,
                          borderTopRightRadius: 8,
                          borderBottomRightRadius: 8,
                          paddingLeft: 2,
                          paddingRight: 3,
                          paddingVertical: 20,
                          zIndex: 4
                        }}
                      >
                        <View style={{ zIndex: 5 }}>
                          {GlobalState.sidebarToggled ? (
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
