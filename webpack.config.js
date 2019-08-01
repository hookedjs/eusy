// Ref: https://github.com/expo/web-examples/blob/master/docs/WEBPACK.md

const expoConfig = require('@expo/webpack-config');
const merge = require('webpack-merge');

module.exports = async function(env, argv) {
  const config = await expoConfig(env, argv);
  // config.entry.server = __dirname + "/src/WebServer.ts";

  for (let key in config.module.rules[1]) {
    // console.dir(config.module.rules[1][key]);

    // Adjust to not use url-loader for svgs. This causes issues with SvgImage.web.tsx.
    // Remove svg from current rule
    for (let key2 in config.module.rules[1][key]) {
      // console.dir(config.module.rules[1][key][key2]);
      if (
        config.module.rules[1][key][key2].test &&
        config.module.rules[1][key][key2].test.test('somefile.svg')
      ) {
        // console.dir('found it!');
        config.module.rules[1][key][key2].test = /\.(gif|jpe?g|png)$/; // was /\.(gif|jpe?g|png|svg)$/
      }
    }
    // Now add a rule for svgs
    config.module.rules[1][key].push({
      test: /\.(svg)$/,
      use: {
        loader: 'file-loader'
      }
    });
  }

  // console.dir(config.module.rules[1]

  return config;
};
