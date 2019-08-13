import React, { useContext } from 'react';
import Svg, { SvgProps, Circle, G, Path, Use, Defs, Mask } from 'react-native-svg';
import { ThemeContext } from 'react-native-elements';

export const LogoIconSvg = (svgProps: SvgProps) => {
  const theme = useContext(ThemeContext).theme;
  return (
    <Svg height="135" viewBox="0 0 135 135" width="135" {...svgProps}>
      <Defs>
        <Circle id="a" cx="67.5" cy="67.5" r="67.5" />
        <Mask id="b" fill="#fff">
          <Use fill="#fff" fillRule="evenodd" href="#a" />
        </Mask>
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Use fill="#fff" href="#a" />
        <G mask="url(#b)">
          <Path d="m0 0h135v135h-135z" />
          <G transform="translate(4 10)">
            <G strokeLinecap="round" strokeWidth="5">
              <Path
                d="m96.4915972 13.6482429 4.7933208 7.8945214c.933097-9.4391127-.193125-15.19302743-3.378668-17.2617442-1.664571-1.080985-3.66023-1.5540186-5.90625-1.46875-12.128506.4604504-31.698321 17.1600739-47.6875 41.7812499-18.950138 29.180653-25.684504 58.42545-15.03125 65.34375 5.056946 3.28402 8.230362.706453 17.333965-5.780837h-9.9634035"
                stroke={theme.colors.primaryLighter}
              />
              <Path
                d="m117.364954 64.8568745-3.647787 7.4277118c8.340337-4.4548849 12.601282-8.4144069 12.782833-11.8785663.6648-12.685141-26.94124-24.429026-61.6875-26.25-3.257461-.170716-6.460588-.260544-9.59375-.25-30.287234.101927-53.9287749 8.410341-54.53125 19.90625-.18557177 3.5409199 3.41618281 7.5511733 10.8052637 12.03076l-2.81858763-7.9864409"
                stroke={theme.colors.primaryLight}
              />
              <Path
                d="m40.8580048 6.92356242 9.7440306 1.34513396c-5.1990051-5.71008821-9.2538502-8.4559803-12.1645354-8.23767628-1.23461.0925969-2.376432.3968591-3.4375.9375-11.318054 5.7668366-7.702368 35.5921229 8.09375 66.5937499 15.796118 31.00163 37.775696 51.45434 49.09375 45.6875 10.8844-5.54588 8.94666-28.337754-5.34375-58.03125l-.84375 12.34375"
                stroke={theme.colors.primary}
              />
            </G>
            <Path
              d="m71.5 58c0 4.1421356-3.3578644 7.5-7.5 7.5s-7.5-3.3578644-7.5-7.5 3.3578644-7.5 7.5-7.5 7.5 3.3578644 7.5 7.5z"
              fill={theme.colors.primary}
              fillRule="nonzero"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};
