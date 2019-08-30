import { Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';

export function getViewportInfo() {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const isSmall = width < 720;

  const heightStatusBar = Platform.select({
    ios: Constants.deviceName.includes('iPhone X')
      ? Constants.statusBarHeight - 10
      : Constants.statusBarHeight,
    default: Constants.statusBarHeight
  });

  const heightBottomSpeaker = Platform.select({
    ios: Constants.deviceName.includes('iPhone X') ? 16 : 0,
    default: 0
  });

  return {
    width: width,
    heightUnsafe: height,
    heightStatusBar,
    heightBottomSpeaker,
    heightHeader: heightStatusBar + 47,
    heightFooter: isSmall && Platform.OS !== 'web' ? heightBottomSpeaker + 47 : 0,
    height: height - heightStatusBar - heightBottomSpeaker,
    heightBody:
      height -
      (heightStatusBar + 47) -
      (isSmall && Platform.OS !== 'web' ? heightBottomSpeaker + 47 : 0),
    isSmall,
    isSmallWeb: isSmall && Platform.OS === 'web',
    isSmallNative: isSmall && Platform.OS !== 'web',
    isLarge: !isSmall,
    isLargeWeb: !isSmall && Platform.OS === 'web',
    isLargeNative: !isSmall && Platform.OS !== 'web'
  };
}
