const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');

const { pages, routes } = require('./webpack-routes');

const outputPath = path.resolve(__dirname, 'build-dev');
const common = require('./webpack.common')({ outputPath });

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    compress: true,
    historyApiFallback: {
      rewrites: routes,
    },
    host: 'localhost',
    hot: true,
    proxy: {
      '/mcssapi': 'http://localhost:5253',
    },
  },
  output: {
    path: outputPath,
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  plugins: [new CleanWebpackPlugin()].concat(
    pages.map(({ srcPath, destPath }) => {
      return new HtmlWebpackPlugin({
        filename: destPath,
        template: path.join('./', 'pages', srcPath),
      });
    })
  ),
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
});
