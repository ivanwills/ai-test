const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')

const { pages, routes } = require('./webpack-routes')
const { optimize } = require('svgo')

const outputPath = path.resolve(__dirname, 'build-dev')
const common = require('./webpack.common')({ outputPath })

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  watch: false,
  devServer: {
    compress: true,
    historyApiFallback: {
      rewrites: routes
    },
    host: 'localhost',
    hot: false,
    liveReload: false,
    port: 9090,
    proxy: {
      '/mcssapi': 'http://localhost:6253'
    }
  },
  output: {
    path: outputPath,
    publicPath: '/',
    filename: '[name].[contenthash].js'
  },
  plugins: [new CleanWebpackPlugin()].concat(
    pages.map(({ srcPath, destPath }) => {
      return new HtmlWebpackPlugin({
        filename: destPath,
        template: path.join('./', 'pages', srcPath)
      })
    })
  ),
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [/__node_modules__/],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/dom7'),
          path.resolve(__dirname, 'node_modules/ssr-window'),
          path.resolve(__dirname, 'node_modules/swiper')
        ],
        use: ['babel-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.svg$/,
        resourceQuery: /uri/,
        type: 'asset/inline',
        generator: {
          dataUrl: (content) =>
            `data:image/svg+xml;utf8,${
              optimize(content.toString(), { datauri: 'enc' }).data
            }`.replace(/#/, '%23')
        }
      },
      {
        test: /\.svg$/,
        resourceQuery: /^(?!\?uri$).*/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader']
      }
    ]
  },
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/
  }
})
