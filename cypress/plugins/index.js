const webpack = require('@cypress/webpack-preprocessor');
const { cypressConfigResolver } = require('../config/cypress-config-resolver');
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = (on, config) => {
  var customConfig = cypressConfigResolver();
  require('@cypress/code-coverage/task')(on, customConfig);
  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions: require('../../webpack.cypress'),
    watchOptions: {},
  };

  on(
    'file:preprocessor',
    cucumber(),
    require('@cypress/code-coverage/use-babelrc'),
    webpack(options)
  );

  // `config` is the resolved Cypress config
  return { ...config, ...customConfig };
};
