import React from 'react';
import { Route, Stack } from './components/lib/Routing';
import { HeaderSection } from './components/sections/Header.section';
import { FooterFixedSection } from './components/sections/FooterFixed.section';
import { FooterEndSection } from './components/sections/FooterEnd.section';
import { WindowState } from './state/Window.state';

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
import { NotFoundRoute } from './components/routes/NotFound.route';
import { HomeRoute } from './components/routes/Home.route';
import { LoginRoute } from './components/routes/Login.route';
import { RegisterRoute } from './components/routes/Register.route';
import { InnerPageRoute } from './components/routes/InnerPage.route';
import { SettingsRoute } from './components/routes/Settings.route';
import { UserEditRoute } from './components/routes/UserEdit.route';
import { UserProfileRoute } from './components/routes/UserProfile.route';
import { SidebarModule } from './components/modules/Sidebar.module';

export const AppRoutes = () => {
  return (
    <Stack animationType="slide-horizontal">
      <Route
        path="/"
        exact
        component={HomeRoute}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        animationType={WindowState.isLarge ? 'slide-horizontal' : 'slide-vertical'}
      />

      <Route
        path="/settings"
        component={SettingsRoute}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        animationType={WindowState.isLarge ? 'slide-horizontal' : 'slide-vertical'}
      />

      <Route
        path="/login"
        component={LoginRoute}
        animationType={WindowState.isLarge ? 'slide-horizontal' : 'slide-vertical'}
      />
      <Route path="/register" component={RegisterRoute} />

      <Route
        path="/user/profile"
        component={UserProfileRoute}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        animationType={WindowState.isLarge ? 'slide-horizontal' : 'slide-vertical'}
      />
      <Route
        path="/user/edit"
        component={UserEditRoute}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
      />

      <Route
        path="/page"
        component={InnerPageRoute}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
      />

      <Route
        component={NotFoundRoute}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
      />
    </Stack>
  );
};
