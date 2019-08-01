const PackageJson = require('../package.json');
const AppJson = require('../app.json').expo;
export const DotEnv = require('../.env.json');

// Const variables

export const AppName = AppJson.name;
export const AppDescription = AppJson.description;
export const NodeEnv = process.env.NODE_ENV;
export const AppEnv = DotEnv.APP_ENV;
export const PublicUrl = DotEnv.PUBLIC_URL;
export const Version = PackageJson.version;

import Logo from './assets/img/icon.png';
export { Logo, Logo as LogoWhite };

// export const MixpanelId = AppEnv === 'production'
//   ? ''
//   : '';
//
// export const GoogleTagManagerTag = AppEnv === 'production'
//     ? `(function(w,d,s,l,i)(...GTM-XXXXXXX');`
//     : `(function(w,d,s,l,i)(...GTM-XXXXXXX');`;
