/**
 * Will allow for watching window size.
 * Caution: Using this will force a re-render of a component every second, so will make window resizing choppy for
 * with high level components I recommend you favor useCssBreakPoint most of the time
 */

import * as React from 'react';
import { Dimensions } from 'react-native';
import { useEffect } from 'react';

export function useWindowDimensions() {
  const getCurrentDims = () => {
    return {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    };
  };

  const [windowDims, setWindowDims] = React.useState(getCurrentDims());

  useEffect(() => {
    const i = setInterval(() => {
      const windowDimsNext = getCurrentDims();
      if (windowDims.width != windowDims.width || windowDims.height != windowDimsNext.height)
        setWindowDims(windowDimsNext);
    }, 400);
    return () => i;
  }, []);

  return windowDims;
}
