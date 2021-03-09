const path = require('path');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: __dirname + '/index.js',
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../../'),
      path.resolve(__dirname, '../../node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'nuxt.imagine.module.js',
    libraryTarget: 'umd'
  }
}
