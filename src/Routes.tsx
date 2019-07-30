import {Route, Stack} from "./helpers/Routing";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import Error from "./Error";
import React from "react";

import Home from "./Home";
import InnerPage from "./InnerPage";
import {light as lightTheme, mapping} from "@eva-design/eva";
import {ApplicationProvider} from "react-native-ui-kitten";

export const Routes = () => (
  <ApplicationProvider
    mapping={mapping}
    theme={lightTheme}
  >
    <Stack>
      <Route path="/" exact component={Home} headerComponent={Header} footerComponent={Footer}/>
      <Route path="/page" component={InnerPage} headerComponent={Header} footerComponent={Footer}/>
      <Route component={Error} headerComponent={Header} footerComponent={Footer}/>
    </Stack>
  </ApplicationProvider>
);
