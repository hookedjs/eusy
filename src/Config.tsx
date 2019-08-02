import { Route, Stack } from './components/lib/Routing';
import { HeaderSection } from './components/sections/Header.section';
import { FooterSection } from './components/sections/Footer.section';
import React from 'react';

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

// export const MixpanelId = AppEnv === 'production'
//   ? ''
//   : '';
//
// export const GoogleTagManagerTag = AppEnv === 'production'
//     ? `(function(w,d,s,l,i)(...GTM-XXXXXXX');`
//     : `(function(w,d,s,l,i)(...GTM-XXXXXXX');`;

import HomeRoute from './components/routes/Home.route';
import InnerPageRoute from './components/routes/InnerPage.route';
import NotFoundRoute from './components/routes/NotFound.route';

export const AppRoutes = () => (
  <Stack>
    <Route
      path="/"
      exact
      component={HomeRoute}
      headerComponent={HeaderSection}
      footerComponent={FooterSection}
    />
    <Route
      path="/page"
      component={InnerPageRoute}
      headerComponent={HeaderSection}
      footerComponent={FooterSection}
    />
    <Route
      component={NotFoundRoute}
      headerComponent={HeaderSection}
      footerComponent={FooterSection}
    />
  </Stack>
);
