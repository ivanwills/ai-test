const path = require('path')
const { optimize } = require('svgo')

module.exports = function () {
  return {
    entry: { main: './src/index.tsx' },
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
          use: ['ts-loader']
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
    resolve: {
      alias: {
        react: path.resolve(path.join(__dirname, 'node_modules', 'react')),
        'styled-components': require.resolve('styled-components'),
        '@components': path.resolve(path.join(__dirname, 'src', 'components')),
        '@models': path.resolve(path.join(__dirname, 'src', 'models'))
      },
      extensions: ['.ts', '.tsx', '.js'],
      fallback: {
        fs: false
      }
    }
  }
}
