// Ref: https://github.com/expo/web-examples/blob/master/docs/WEBPACK.md

const expoConfig = require('@expo/webpack-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = async function(env, argv) {
  /**
   * There is a bug in expo-cli that prevents prodenv from being set.
   * Ref: https://github.com/expo/expo-cli/issues/919
   *
   * The following will force webpack to bundle in production mode
   */
  if (process.env.BUILD_ENV === 'production') {
    env.mode = 'production';
    env.development = false;
    env.production = true;
  }

  const config = await expoConfig(env, argv);

  // TODO: Install https://github.com/firede/ts-transform-graphql-tag

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
