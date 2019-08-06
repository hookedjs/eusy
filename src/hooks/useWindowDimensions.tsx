/**
 * Will allow for watching window size.
 * Caution: Using this will force a re-render of a component every second, so will make window resizing choppy for
 * with high level components I recommend you favor useCssBreakPoint most of the time
 */

import * as React from 'react';
import { Dimensions, Platform } from 'react-native';
import { useEffect } from 'react';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

export function useWindowDimensions() {
  const getCurrentDims = () => {
    return {
      width: Dimensions.get('window').width,
      unsafeHeight: Dimensions.get('window').height,
      height: Dimensions.get('window').height - getStatusBarHeight() - getBottomSpace(),
      isSmall: Dimensions.get('window').width < 720,
      isLarge: Dimensions.get('window').width >= 720,
      isMobileWeb: Dimensions.get('window').width < 720 && Platform.OS === 'web',
    };
  };

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
