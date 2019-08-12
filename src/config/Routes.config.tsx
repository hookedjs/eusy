import React from 'react';
import { Route, Stack } from '../components/lib/Routing';
import { HeaderSection } from '../components/sections/Header.section';
import { FooterFixedSection } from '../components/sections/FooterFixed.section';
import { SidebarModule } from '../components/modules/Sidebar.module';
import { FooterEndSection } from '../components/sections/FooterEnd.section';

import { NotFoundScreen } from '../components/screens/NotFound.screen';
import { HomeScreen } from '../components/screens/Home.screen';
import { LoginScreen } from '../components/screens/Login.screen';
import { RegisterScreen } from '../components/screens/Register.screen';
import { InnerPageScreen } from '../components/screens/InnerPage.screen';
import { SettingsScreen } from '../components/screens/Settings.screen';
import { UserEditScreen } from '../components/screens/UserEdit.screen';
import { UserProfileScreen } from '../components/screens/UserProfile.screen';

export const RoutesConfig = () => {
  return (
    <Stack animationType="slide-horizontal">
      <Route
        path="/"
        exact
        component={HomeScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
      />

      <Route
        path="/settings"
        component={SettingsScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
      />

      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />

      <Route
        path="/user/profile"
        component={UserProfileScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
      />
      <Route
        path="/user/edit"
        component={UserEditScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
      />

      <Route
        path="/page"
        component={InnerPageScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
      />

      <Route
        component={NotFoundScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
      />
    </Stack>
  );
};
