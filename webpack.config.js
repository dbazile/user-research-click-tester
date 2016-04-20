'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

const event = process.env.EVENT || 'demo';

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: './index.js',
  devtool: 'source-map',

  devServer: {
    proxy: {
      '/responses': {
        target: 'http://click-testing.andsoitcontinues.com',
        changeOrigin: true
      }
    }
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: path.join(__dirname, 'dist', event),
    filename: 'bundle.js'
  },

  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css?module&localIdentName=[name]__[local]'},
      {test: /\.(png|jpg|gif)$/, loader: 'file', exclude: /\/events\//},
      {test: /\.png$/, loader: `file?name=[name].[ext]`, include: /\/events\//}
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV || 'development'}'`
    }),
    new HtmlWebpackPlugin({
      title: `${pkg.name} v${pkg.version}`,
      hash: true,
      xhtml: true,
      favicon: 'favicon.png'
    }),
    new webpack.ProvidePlugin({
      fetch: 'isomorphic-fetch',
      '__TASKS__': path.resolve(__dirname, 'events', event)
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = 'source-map';
  module.exports.output.publicPath = `/${event}/`;
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin())
}
