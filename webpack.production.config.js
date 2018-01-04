const { optimize, DefinePlugin } = require('webpack');
const { UglifyJsPlugin, OccurrenceOrderPlugin } = optimize;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ServiceWorkerWepbackPlugin = require('serviceworker-webpack-plugin');

const loaders = require('./webpack.loaders');

loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use : 'css-loader?localIdentName=[local]___[hash:base64:5]'
  }),
  exclude: ['node_modules']
});

module.exports = {
  entry: [
    './src/app.js',
    './styles/app.css'
  ],
  output: {
    publicPath: './',
    path: path.join(__dirname, 'public'),
    filename: '[chunkhash].js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js'],
      }
    }),
    new ServiceWorkerWepbackPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
    })
  ]
};