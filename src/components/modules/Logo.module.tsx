import React from 'react';
import { GlobalState } from '../../GlobalState';
import { LogoIcon } from '../svgs/LogoIcon';
import { SvgProps } from 'react-native-svg';

// Leaving props type as any until we get an SVG logo, then we'll switch it to svg.
export const LogoModule = ({ width, height, ...props }: Partial<SvgProps>) => {
  return (
    <LogoIcon
      width={width || (GlobalState.viewportInfo.isLarge ? 200 : 120)}
      height={height || (GlobalState.viewportInfo.isLarge ? 200 : 120)}
      {...props}
    />
  );
};
