import React from 'react';
import { Redirect, Route, Stack, useRouter } from '../components/lib/Routing';
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
import { NotificationsScreen } from '../components/screens/Notifications.screen';
import { WindowState } from '../state/Window.state';
import { UserStateReset } from '../state/User.state';

export const RoutesConfig = () => {
  const { location } = useRouter();

  function getTabAnimationType(path: string): string {
    return location.pathname !== path && (location.pathname.startsWith(path) || WindowState.isLarge)
      ? 'slide-horizontal'
      : 'none';
  }

  return (
    <Stack animationType="slide-horizontal">
      <Route path="/" exact render={() => <Redirect to="/home" />} />
      <Route
        path="/home"
        exact
        component={HomeScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        animationType={getTabAnimationType('/home')}
        requiresRole={['Identified']}
      />
      <Route
        path="/home/page"
        component={InnerPageScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        requiresRole={['Identified']}
      />

      <Route
        path="/settings"
        exact
        component={SettingsScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        animationType={getTabAnimationType('/settings')}
        requiresRole={['Identified']}
      />
      <Route
        path="/settings/page"
        component={InnerPageScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        requiresRole={['Identified']}
      />

      <Route
        path="/notifications"
        exact
        component={NotificationsScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        animationType={getTabAnimationType('/notifications')}
        requiresRole={['Identified']}
      />

      <Route
        path="/user"
        exact
        component={UserProfileScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        animationType={getTabAnimationType('/user')}
        requiresRole={['Identified']}
      />
      <Route path="/user/login" component={LoginScreen} />
      <Route
        path="/user/logout"
        component={() => {
          UserStateReset();
          return <Redirect to="/user/login" />;
        }}
      />
      <Route path="/user/register" component={RegisterScreen} />
      <Route
        path="/user/edit"
        component={UserEditScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        requiresRole={['Identified']}
      />

      <Route
        component={NotFoundScreen}
        sidebarComponent={SidebarModule}
        headerComponent={HeaderSection}
        footerComponent={FooterFixedSection}
        footerEndComponent={FooterEndSection}
        requiresRole={['Identified']}
      />
    </Stack>
  );
};
