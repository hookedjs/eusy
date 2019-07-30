const express = require('express');
const path = require('path');
const ssr = require('./ssr');

const port = process.env.PORT || 3000;
const app = express();

app.use(
  express.static(path.join(__dirname, './web-build/static'))
);

app.use(ssr);

app.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Express listening on port ${port}`);
  }
});
