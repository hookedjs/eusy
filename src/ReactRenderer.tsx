const fs = require('fs');
const path = require('path');
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';

import {Routes} from './Routes';

export const ReactRenderer = express();
ReactRenderer
  .disable('x-powered-by')
  // .use(express.static("web-build", {index: "index.html"}))
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <Routes />
      </StaticRouter>
    );


    // @ts-ignore
    if (context.url) res.redirect(context.url);
    else {
      const html = fs
        .readFileSync(path.join('web-build', 'index.html'), 'utf8')
        .replace('root', markup);
      res.status(200).send(html);

    }
  });
