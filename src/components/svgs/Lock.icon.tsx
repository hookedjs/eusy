import React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

export const LockIcon = (svgProps: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...svgProps}>
    <Path d="m0 0h24v24h-24z" opacity="0" />
    <Circle cx="12" cy="15" r="1" />
    <Path d="m17 8h-1v-1.89a4 4 0 1 0 -8 0v1.89h-1a3 3 0 0 0 -3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-8a3 3 0 0 0 -3-3zm-7-1.89a2.06 2.06 0 0 1 2-2.11 2.06 2.06 0 0 1 2 2.11v1.89h-4zm2 11.89a3 3 0 1 1 3-3 3 3 0 0 1 -3 3z" />
  </Svg>
);
