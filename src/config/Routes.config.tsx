import React from 'react';

import { GlobalState } from '../GlobalState';

import { Redirect, Route, Stack } from '../components/lib/Routing';
import { HeaderDefaultSection } from '../components/sections/HeaderDefault.section';
import { FooterFixedSection } from '../components/sections/FooterFixed.section';
import { SidebarModule } from '../components/modules/Sidebar.module';
import { FooterEndSection } from '../components/sections/FooterEnd.section';

import { NotFoundScreen } from '../components/screens/NotFound.screen';
import { LoginScreen } from '../components/screens/Login.screen';
import { RegisterScreen } from '../components/screens/Register.screen';
import { MenuScreen } from '../components/screens/Menu.screen';
import { SettingsScreen } from '../components/screens/Settings.screen';
import { UserEditScreen } from '../components/screens/UserEdit.screen';
import { HomeScreen } from '../components/screens/Home.screen';
import { InnerPageScreen } from '../components/screens/InnerPage.screen';
import { NotificationsScreen } from '../components/screens/Notifications.screen';
import { SearchScreen } from '../components/screens/Search.screen';
import { HeaderInnerPageSection } from '../components/sections/HeaderInnerPage.section';

export const RoutesConfig = () => {
  return (
    <Stack animationType="slide-horizontal">
      <Route path="/" exact render={() => <Redirect to="/home" />} />
      <Route
        path="/home"
        exact
        component={HomeScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderDefaultSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        requiresRole={['identified']}
      />
      <Route
        path="/home/page"
        component={InnerPageScreen}
        sidebarComponent={SidebarModule}
        headerComponent={
          GlobalState.viewportInfo.isSmallNative ? HeaderInnerPageSection : HeaderDefaultSection
        }
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        requiresRole={['identified']}
      />

      <Route
        path="/menu"
        exact
        component={MenuScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderDefaultSection}
        footerComponent={FooterFixedSection}
        // footerEndComponent={FooterEndSection}
        requiresRole={['identified']}
      />

      <Route
        path="/settings"
        exact
        component={SettingsScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderDefaultSection}
        footerComponent={FooterFixedSection}
        // footerEndComponent={FooterEndSection}
        requiresRole={['identified']}
      />
      <Route
        path="/settings/user"
        component={UserEditScreen}
        sidebarComponent={SidebarModule}
        headerComponent={
          GlobalState.viewportInfo.isSmallNative ? HeaderInnerPageSection : HeaderDefaultSection
        }
        footerComponent={FooterFixedSection}
        // footerEndComponent={FooterEndSection}
        requiresRole={['identified']}
      />

      <Route
        path="/search"
        component={SearchScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderDefaultSection}
        footerComponent={FooterFixedSection}
        // footerEndComponent={FooterEndSection}
        requiresRole={['identified']}
      />

      <Route
        path="/notifications"
        exact
        component={NotificationsScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderDefaultSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        requiresRole={['identified']}
      />

      <Route path="/user/login" component={LoginScreen} />
      <Route path="/user/register" component={RegisterScreen} />
      <Route
        path="/user/logout"
        component={() => {
          GlobalState.logout();
          return <Redirect to="/user/login" />;
        }}
      />

      <Route
        component={NotFoundScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderDefaultSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        requiresRole={['identified']}
      />
    </Stack>
  );
};
