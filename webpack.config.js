// Ref: https://github.com/expo/web-examples/blob/master/docs/WEBPACK.md

const expoConfig = require('@expo/webpack-config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = async function(env, argv) {
  const config = await expoConfig(env, argv);
  // config.entry.server = __dirname + "/src/WebServer.ts";

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

  return config;
};
