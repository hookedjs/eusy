// Ref: https://github.com/expo/web-examples/blob/master/docs/WEBPACK.md

const expoConfig = require('@expo/webpack-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/*

There is a bug in expo-cli that prevents prodenv from being set.
Ref: https://github.com/expo/expo-cli/issues/919

prodEnv = { projectRoot:
   '/Users/briandombrowski/Dev/Node/hookedjs/hookedjs/services/react',
  pwa: true,
  mode: 'development',
  https: undefined,
  polyfill: false,
  development: true,
  production: false,
  info: false }

devEnv = { projectRoot:
   '/Users/briandombrowski/Dev/Node/hookedjs/hookedjs/services/react',
  pwa: true,
  mode: 'development',
  https: undefined,
  polyfill: false,
  development: true,
  production: false,
  info: false }


 */

module.exports = async function(env, argv) {
  const config = await expoConfig(env, argv);
  // config.entry.server = __dirname + "/server.ts";
  // config.entry.ssr = __dirname + '/ssr-test.js';

  // for (let key in config.module.rules[1]) {
  //   console.dir(config.module.rules[1][key]);
  //   if (config.module.rules[1][key].use) {
  //     console.dir(config.module.rules[1][key].use);
  //   }
  //   // if (config.module.rules[key].include) {
  //   //   if (!Array.isArray(config.module.rules[key].include))
  //   //     config.module.rules[key].include = [config.module.rules[key].include];
  //   //   config.module.rules[key].include.push(__dirname + "/node_modules/react-native-ui-kitten");
  //   // }
  // }

  config.plugins.push(process.env.ANALYZE ? new BundleAnalyzerPlugin() : () => null);

  config.plugins.push(
    new CopyWebpackPlugin([
      { from: __dirname + '/web/favicon.ico' },
      { from: __dirname + '/web/preview.png' }
    ])
  );

  return config;
};
