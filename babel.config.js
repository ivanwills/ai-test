module.exports = function (api) {
  const babelPlugins = [
    '@babel/plugin-syntax-dynamic-import',
    [`babel-plugin-styled-components`, { pure: true }],
    ['istanbul', {}, 'istanbul-plugin'],
  ];
  const isTestEnv = api.env('test');
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: isTestEnv ? { node: 'current' } : { ie: 11 },
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: babelPlugins,
  };
};
