import { Route, Stack } from './components/lib/Routing';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import NotFound from './components/NotFound';
import React from 'react';

import Home from './components/Home';
import InnerPage from './components/InnerPage';

export const Routes = () => (
  <Stack>
    <Route path="/" exact component={Home} headerComponent={Header} footerComponent={Footer} />
    <Route path="/page" component={InnerPage} headerComponent={Header} footerComponent={Footer} />
    <Route component={NotFound} headerComponent={Header} footerComponent={Footer} />
  </Stack>
);
