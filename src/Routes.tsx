import { Route, Stack } from './helpers/Routing';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Error from './Error';
import React from 'react';

import Home from './Home';
import InnerPage from './InnerPage';

export const Routes = () => (
  <Stack>
    <Route path="/" exact component={Home} headerComponent={Header} footerComponent={Footer} />
    <Route path="/page" component={InnerPage} headerComponent={Header} footerComponent={Footer} />
    <Route component={Error} headerComponent={Header} footerComponent={Footer} />
  </Stack>
);
