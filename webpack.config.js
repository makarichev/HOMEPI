const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'share/vendors.js': path.join(__dirname, 'share', 'vendorsModule.js'),
    'share/bundle.js': path.join(__dirname, 'share', 'config.js')
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'app')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components')
      ],
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },


  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/dist/')
  }
};