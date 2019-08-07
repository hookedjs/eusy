/**
 * Will allow for watching window size.
 * Caution: Using this will force a re-render of a component every second, so will make window resizing choppy for
 * with high level components I recommend you favor useCssBreakPoint most of the time
 */

import * as React from 'react';
import { Dimensions, Platform } from 'react-native';
import { useEffect } from 'react';
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

export function useWindowDimensions() {
  const [windowDims, setWindowDims] = React.useState(getCurrentDims());

  useEffect(() => {
    const i = setInterval(() => {
      const windowDimsNext = getCurrentDims();
      if (windowDimsNext.width != windowDims.width || windowDims.height != windowDimsNext.height)
        setWindowDims(windowDimsNext);
    }, 400);
    return () => i;
  }, []);

  return windowDims;
}
