import path from 'path';
import webpack from 'webpack';

export default {
  devtools: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.jsx'),
  ],
  output: {
    path: '/',
    publicPath: '/public/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        loaders: ['react-hot', 'babel'],
      },
      {
        test: [/\.jsx$/],
        include: path.join(__dirname, 'client'),
        loaders: ['react-hot-loader', 'babel-loader'],
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'client'),
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
    ],
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
  },
  node: {
    net: 'empty',
    dns: 'empty',
  },
};
