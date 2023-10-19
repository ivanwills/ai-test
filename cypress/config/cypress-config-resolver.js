const fs = require('fs-extra');
const path = require('path');

const cypressConfigResolverByFile = (filename) => {
  console.log(
    'resolvled dirname',
    path.resolve(path.dirname(process.execPath), __dirname)
  );
  console.log(
    'resolvled dirname',
    path.resolve(path.dirname(process.execPath), __dirname)
  );
  console.log('fielname', { filename });
  const pathToConfigFile = path.resolve(__dirname, `${filename}.json`);
  return fs.readJsonSync(pathToConfigFile);
};
const cypressConfigResolver = () =>
  cypressConfigResolverByFile(process.env.CYPRESS_ENVIRON || 'localhost');

module.exports.cypressConfigResolver = cypressConfigResolver;
