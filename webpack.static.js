const { merge } = require('webpack-merge')
const path = require('path')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { pages } = require('./webpack-routes')
const outputPath = path.resolve(__dirname, 'build-static')
const common = require('./webpack.common')({ outputPath })

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: outputPath,
    publicPath: '/',
    filename: '[name].[contenthash].js'
  },
  plugins: [new CleanWebpackPlugin()]
    .concat(
      pages.map(({ srcPath, destPath }) => {
        return new HtmlWebpackPlugin({
          filename: destPath,
          template: path.join('./', 'pages', srcPath)
        })
      })
    )
    .concat(new CompressionPlugin(), new WebpackManifestPlugin())
})
