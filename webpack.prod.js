const { merge } = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const outputPath = path.resolve(__dirname, 'build');
const common = require('./webpack.common')({ outputPath });
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const pkg = require('./package.json');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: outputPath,
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
    new WebpackManifestPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-sizes.html',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        /* additional options here */
      }),
    ],
  },
});
