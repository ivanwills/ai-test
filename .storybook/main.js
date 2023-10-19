const path = require('path');

const commonConfig = require('../webpack.common')();

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/components/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-jest',
    '@storybook/addon-controls',
    '@storybook/addon-notes/register',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.stories\.(js|tsx)?$/],
          include: [path.resolve(__dirname, '../stories')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: {
            printWidth: 80,
            singleQuote: false,
          },
        },
      },
    },
  ],
  webpackFinal: (config) => {
    // exclude svg from default loader
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test.toString().indexOf('svg') !== -1
    );
    fileLoaderRule.exclude = /\.svg(\?.*)?$/;

    // add common scss, svg config
    config.module.rules.push(
      ...commonConfig.module.rules.filter(
        (rule) =>
          rule.test.toString().includes('svg') ||
          rule.test.toString().includes('scss')
      )
    );

    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](styled-components)[\\/]/,
            name: 'styled',
            chunks: 'all',
          },
        },
      },
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      ...commonConfig.resolve.alias,
    };

    config.resolve.fallback = {
      path: require.resolve('path-browserify'),
    };

    return config;
  },
};
