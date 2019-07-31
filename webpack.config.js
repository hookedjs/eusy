// Ref: https://github.com/expo/web-examples/blob/master/docs/WEBPACK.md

require('dotenv').config();
const webpack = require('webpack');

const expoConfig = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await expoConfig(env, argv);

  config.plugins.push(
    // This will replace env variables during build
    new webpack.DefinePlugin({
      // Selectively choose with dotenv variables to pass,
      // because there may be some that are private (non-public)
      // Remember to also update @types/webpack on change.
      dotenv: JSON.stringify({
        APP_ENV: process.env.APP_ENV,
        PUBLIC_URL: process.env.PUBLIC_URL,
        DEBUG: process.env.DEBUG
      })
    })
  );
  process.env.DEBUG = false; // Deactivate WEbpack's debug features.

  // console.dir(config.plugins);
  return config;
};
