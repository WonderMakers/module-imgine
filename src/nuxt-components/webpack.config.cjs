const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  target: 'web',
  mode: 'production',
  entry: {
    'imgine-container': __dirname + '/imgine-container.vue',
    'imgine-image': __dirname + '/imgine-image.vue'
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin()
  ]
}
