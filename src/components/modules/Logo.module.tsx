import React from 'react';
import { WindowState } from '../../state/Window.state';
import { LogoCircleIcon } from '../svgs';
import { SvgProps } from 'react-native-svg';

// Leaving props type as any until we get an SVG logo, then we'll switch it to svg.
export const LogoModule = ({ width, height, ...props }: Partial<SvgProps>) => {
  return (
    <LogoCircleIcon
      width={width || (WindowState.isLarge ? 200 : 120)}
      height={height || (WindowState.isLarge ? 200 : 120)}
      {...props}
    />
  );
};
