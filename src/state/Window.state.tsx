import { observable, set } from 'mobx';
import { Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';

export function getCurrentDims() {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const statusBarHeight = Platform.select({
    ios: Constants.deviceName.includes('iPhone X')
      ? Constants.statusBarHeight - 10
      : Constants.statusBarHeight,
    default: Constants.statusBarHeight
  });

  const bottomUnsafeHeight = Platform.select({
    ios: Constants.deviceName.includes('iPhone X') ? 16 : 0,
    default: 0
  });

  return {
    width: width,
    unsafeHeight: height,
    height: height - statusBarHeight - bottomUnsafeHeight,
    isSmall: width < 720,
    isSmallWeb: width < 720 && Platform.OS === 'web',
    isSmallNative: width < 720 && Platform.OS !== 'web',
    isLarge: width >= 720,
    isLargeWeb: width >= 720 && Platform.OS === 'web',
    isLargeNative: width >= 720 && Platform.OS !== 'web',
    statusBarHeight,
    bottomUnsafeHeight
  };
}

export const WindowState = observable(getCurrentDims());

setInterval(() => {
  const WindowStateNext = getCurrentDims();
  if (WindowStateNext.width != WindowState.width || WindowStateNext.height != WindowState.height)
    set(WindowState, WindowStateNext);
}, 400);
