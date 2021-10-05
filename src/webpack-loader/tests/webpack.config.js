const path = require('path');

module.exports = function (entry) {
  return {
    mode: 'production',
    entry: path.resolve(__dirname, entry),
    // output: {
    //   filename: 'index.js'
    // },
    output: {
      path: path.resolve(__dirname, './dist'),
      library: {
        name: '__RESULT__',
        type: 'var'
      },
      filename: entry,
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|webp)$/,
          loader: require.resolve('../index.js'),
          options: {
            name: 'image[width].[ext]',
          }
        }
      ]
    }
  }
}
