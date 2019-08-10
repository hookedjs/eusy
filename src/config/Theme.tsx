/**
 * This file contains helper functions and constants for defining the theme
 *
 * Instead of statically defining the theme, we employ helper functions to enable
 * better code-reuse
 */
import { Theme as ThemeOrig, Colors as ColorsOrig } from 'react-native-elements';

type ColorsType = RecursivePartial<ColorsOrig> & {
  primaryDark: string;
  primaryDarker: string;
  primaryLight: string;
  primaryLighter: string;

  facebook: string;
  twitter: string;
  googleplus: string;
  pinterest: string;
  linkedin: string;
  youtube: string;
  vimeo: string;
  tumblr: string;
  instagram: string;
  quora: string;
  foursquare: string;
  wordpress: string;
  stumbleupon: string;
};
type ThemeType = ThemeOrig & {
  colors: ColorsType;
};

export const getColors = (primaryHue: number): ColorsType => ({
  primary: `hsl(${primaryHue},93%,40%)`,
  primaryLight: `hsl(${primaryHue},23%,60%)`,
  primaryLighter: `hsl(${primaryHue},23%,84%)`,
  primaryDark: `hsl(${primaryHue},93%,14%)`,
  primaryDarker: `hsl(${primaryHue},93%,8%)`,

  // secondary: '#2D3C56',
  // grey0: '#393e42',
  // grey1: '#43484d',
  // grey2: '#5e6977',
  // grey3: '#86939e',
  // grey4: '#bdc6cf',
  // grey5: '#e1e8ee',
  // greyOutline: '#bbb',
  // searchBg: '#303337',
  // success: '#52c41a',
  // error: '#ff190c',
  // warning: '#faad14',
  // disabled: 'hsl(208, 8%, 90%)',
  // // Darker color if hairlineWidth is not thin enough
  // divider: StyleSheet.hairlineWidth < 1 ? '#bcbbc1' : 'rgba(0, 0, 0, 0.12)',
  // platform: {
  //   ios: {
  //     primary: '#007aff',
  //     secondary: '#5856d6',
  //     success: '#4cd964',
  //     error: '#ff3b30',
  //     warning: '#ffcc00'
  //   },
  //   android: {
  //     primary: '#2196f3',
  //     secondary: '#9C27B0',
  //     success: '#4caf50',
  //     error: '#f44336',
  //     warning: '#ffeb3b'
  //   }
  // },

  facebook: '#3b5998',
  twitter: '#00aced',
  googleplus: '#dd4b39',
  pinterest: '#cb2027',
  linkedin: '#007bb6',
  youtube: '#bb0000',
  vimeo: '#aad450',
  tumblr: '#32506d',
  instagram: '#517fa4',
  quora: '#a82400',
  foursquare: '#0072b1',
  wordpress: '#21759b',
  stumbleupon: '#EB4823'
});

export const getTheme = (primaryHue: number): ThemeType => ({
  colors: getColors(primaryHue),

  // Text Theming tips:
  // - Headings are all bold, and it's currently impossible default unbold them without
  //   patching rne.
  // - You may need to patch if you want to override fonts for bold, italic, etc.
  // - when setting fontSize here, use rne's normalize feature as seen in the source
  // - some font styles do not currently work on web. For now, you may need to also add
  //   them to index.html
  Text: {
    allowFontScaling: false
    // h1Style: {},
    // h2Style: {},
    // h3Style: {},
    // h4Style: {},
    // style: {}
  },

  Input: {
    containerStyle: {
      marginBottom: 18
    },
    inputContainerStyle: {
      borderWidth: 2,
      borderBottomWidth: 2,
      borderRadius: 44 / 2,
      borderColor: '#2D3C56'
    },
    leftIconContainerStyle: {
      marginRight: 10
    }
  },
  // Note that SearchBar inherits Input, sadly. So we must reset.
  SearchBar: {
    placeholder: 'Search...',
    lightTheme: true,
    containerStyle: {
      backgroundColor: 'transparent',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      padding: 0,
      marginBottom: -18 // This is the only way to undo the default margin from input :-(
    },
    inputContainerStyle: {
      backgroundColor: '#e4e7e8',
      borderRadius: 20,
      borderWidth: 0,
      paddingHorizontal: 6
    },
    inputStyle: { minHeight: 35 },
    leftIconContainerStyle: { height: 35, marginRight: 0 },
    rightIconContainerStyle: { height: 35 }
  },
  Button: {
    containerStyle: {
      marginBottom: 30,
      paddingHorizontal: 12
    },
    buttonStyle: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 44 / 2
    }
  },
  Image: {
    placeholderStyle: {
      backgroundColor: 'transparent'
    }
  }
});

export const Theme = getTheme(219); // 219 = blue
