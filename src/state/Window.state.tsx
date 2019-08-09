import { observable, set } from 'mobx';
import { Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';

export function getCurrentDims() {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const isSmall = width < 720;

  const statusBarHeight = Platform.select({
    ios: Constants.deviceName.includes('iPhone X')
      ? Constants.statusBarHeight - 10
      : Constants.statusBarHeight,
    default: Constants.statusBarHeight
  });

  const bottomheightUnsafe = Platform.select({
    ios: Constants.deviceName.includes('iPhone X') ? 16 : 0,
    default: 0
  });

  return {
    width: width,
    heightUnsafe: height,
    heightHeader: statusBarHeight + 47,
    heightFooter: isSmall && Platform.OS !== 'web' ? bottomheightUnsafe + 47 : 0,
    height: height - statusBarHeight - bottomheightUnsafe,
    heightBody:
      height -
      (statusBarHeight + 47) -
      (isSmall && Platform.OS !== 'web' ? bottomheightUnsafe + 47 : 0),
    isSmall,
    isSmallWeb: isSmall && Platform.OS === 'web',
    isSmallNative: isSmall && Platform.OS !== 'web',
    isLarge: !isSmall,
    isLargeWeb: !isSmall && Platform.OS === 'web',
    isLargeNative: !isSmall && Platform.OS !== 'web',
    statusBarHeight,
    bottomheightUnsafe
  };
}

export const WindowState = observable(getCurrentDims());

setInterval(() => {
  const WindowStateNext = getCurrentDims();
  if (WindowStateNext.width != WindowState.width || WindowStateNext.height != WindowState.height)
    set(WindowState, WindowStateNext);
}, 400);
