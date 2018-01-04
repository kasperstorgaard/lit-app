const path = require('path');
const {
  NoEmitOnErrorsPlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin
} = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ServiceWorkerWepbackPlugin = require('serviceworker-webpack-plugin');

const loaders = require('./webpack.loaders');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

loaders.push({
  test: /\.css$/,
  loaders: ['style-loader', 'css-loader?importLoaders=1'],
  exclude: ['node_modules']
});

module.exports = {
  entry: [
    './src/app.js'
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders
  },
  devServer: {
    contentBase: "./public",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new NamedModulesPlugin(),
    new HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
    new ServiceWorkerWepbackPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
    })
  ]
};