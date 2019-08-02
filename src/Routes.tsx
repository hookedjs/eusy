import { Route, Stack } from './components/lib/Routing';
import { Header } from './components/sections/Header';
import { Footer } from './components/sections/Footer';
import NotFound from './routes/NotFound';
import React from 'react';

import Home from './routes/Home';
import InnerPage from './routes/InnerPage';

export const Routes = () => (
  <Stack>
    <Route path="/" exact component={Home} headerComponent={Header} footerComponent={Footer} />
    <Route path="/page" component={InnerPage} headerComponent={Header} footerComponent={Footer} />
    <Route component={NotFound} headerComponent={Header} footerComponent={Footer} />
  </Stack>
);
