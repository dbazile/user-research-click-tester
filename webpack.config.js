'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: './index.js',
  devtool: 'source-map',

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css?module&localIdentName=[name]__[local]'},
      {test: /\.(png|jpg|gif)$/, loader: 'file'}
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV || 'development'}'`
    }),
    new HtmlWebpackPlugin({
      title: `${pkg.name} v${pkg.version}`,
      hash: true,
      xhtml: true
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin())
}
