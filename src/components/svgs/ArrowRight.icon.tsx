import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ArrowRightIcon = (svgProps: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...svgProps}>
    <Path d="m0 0h24v24h-24z" opacity="0" transform="matrix(-1 0 0 -1 24 24)" />
    <Path d="m10.46 18a2.23 2.23 0 0 1 -.91-.2 1.76 1.76 0 0 1 -1.05-1.59v-8.42a1.76 1.76 0 0 1 1.05-1.59 2.1 2.1 0 0 1 2.21.26l5.1 4.21a1.7 1.7 0 0 1 0 2.66l-5.1 4.21a2.06 2.06 0 0 1 -1.3.46z" />
  </Svg>
);
