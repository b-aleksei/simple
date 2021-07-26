const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  context: path.resolve(__dirname, 'source'),
  mode: 'development',
  entry: {
    main: './js/main.js',
  },
  devtool: isDev ? 'eval-source-map' : false,
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'build/js'),
  },
  optimization: {
    minimize: !isDev,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ["@babel/plugin-proposal-class-properties"]
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
