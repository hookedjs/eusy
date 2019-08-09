import React from 'react';
import { Route, Stack } from '../components/lib/Routing';
import { HeaderSection } from '../components/sections/Header.section';
import { FooterFixedSection } from '../components/sections/FooterFixed.section';
import { SidebarModule } from '../components/modules/Sidebar.module';
import { FooterEndSection } from '../components/sections/FooterEnd.section';

import { NotFoundRoute } from '../components/screens/NotFound.route';
import { HomeRoute } from '../components/screens/Home.route';
import { LoginRoute } from '../components/screens/Login.route';
import { RegisterRoute } from '../components/screens/Register.route';
import { InnerPageRoute } from '../components/screens/InnerPage.route';
import { SettingsRoute } from '../components/screens/Settings.route';
import { UserEditRoute } from '../components/screens/UserEdit.route';
import { UserProfileRoute } from '../components/screens/UserProfile.route';

export const Routes = () => {
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
      />

      <Route
        path="/settings"
        component={SettingsRoute}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
      />

      <Route path="/login" component={LoginRoute} />
      <Route path="/register" component={RegisterRoute} />

      <Route
        path="/user/profile"
        component={UserProfileRoute}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
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
