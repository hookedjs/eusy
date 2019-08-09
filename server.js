const express = require('express');
const logger = require('morgan');
const shrinkRay = require('shrink-ray-current');

const app = express();

app.use(logger('dev'));

app.use(shrinkRay());

app.use(express.static('web-build', { index: 'index.html' }));

// Handle 404
app.use(function(req, res) {
  res.sendFile('index.html', { root: 'web-build' });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  throw err;
});

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log('Server listening on:', port);
});
