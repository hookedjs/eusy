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
  // grey5: 'hsl(120, 0%, 90%)',
  // secondary: '#2D3C56',
  // success: 'green',
  // error: 'red',
  // warning: 'orange',
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

export let primaryHue = 219;
export const Theme: ThemeType = {
  colors: getColors(primaryHue),
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
  }
};
