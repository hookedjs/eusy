const PackageJson = require('../package.json');
const AppJson = require('../app.json').expo;

// Const variables
export const AppName = AppJson.name;
export const AppDescription = AppJson.description;
export const NodeEnv = process.env.NODE_ENV;
export const AppEnv = dotenv.APP_ENV;
export const PublicUrl = dotenv.PUBLIC_URL;
export const Version = PackageJson.version;

import Logo from '../assets/img/logo.svg';
export { Logo, Logo as LogoWhite };

// export const MixpanelId = AppEnv === 'production'
//   ? ''
//   : '';
//
// export const GoogleTagManagerTag = AppEnv === 'production'
//     ? `(function(w,d,s,l,i)(...GTM-XXXXXXX');`
//     : `(function(w,d,s,l,i)(...GTM-XXXXXXX');`;
