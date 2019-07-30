const path = require('path');
// const expoConfig = require('@expo/webpack-config');

module.exports = async function (env, argv) {

  // const config = await expoConfig(env,argv);

  return {
    entry: path.resolve(__dirname, './src/WebServer.ts'),
    target: 'node',
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'my-first-webpack.bundle.js'
    },
    module: {
      rules: [
        {test: /\.[jt]sx?$/, use: 'babel-loader'},
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          // test: /\..*$/,
          exclude: /node_modules/,
          use: { loader: 'url-loader', options: { limit: 5000, name: '[path][name].[ext]'} },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|node)/,
          use: {loader: 'file-loader', options: { name: '[path][name].[ext]' }},
        }, // fonts
      ]
    }
  }
};
