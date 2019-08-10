import React from 'react';
import { Image, ImageProps } from 'react-native-elements';
import { WindowState } from '../../state/Window.state';

// Leaving props type as any until we get an SVG logo, then we'll switch it to svg.
export const LogoModule = ({ width, height, style, ...props }: Partial<ImageProps>) => {
  return (
    <Image
      source={require('../../assets/img/logo-icon-circle.png')}
      style={{
        width: width || (WindowState.isLarge ? 200 : 120),
        height: height || (WindowState.isLarge ? 200 : 120),
        // @ts-ignore: false spread warning
        ...style
      }}
      {...props}
    />
  );
};
