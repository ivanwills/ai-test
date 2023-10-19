const fs = require('fs');

const routes = require('./routes').map((entry) => {
  return Object.assign(entry, {
    to: '/' + entry.srcPath.replace(/^\//, '').replace('/', '__'),
  });
});

const pages = routes.reduce((acc, route) => {
  if (fs.existsSync('./pages/' + route.srcPath)) {
    acc.push({ srcPath: route.srcPath, destPath: route.to.replace('/', '') });
  }
  return acc;
}, []);

module.exports = {
  routes: routes.map(({ from, to }) => {
    return {
      from,
      to,
    };
  }),
  routesForServe: routes.map(({ route, to }) => {
    return {
      source: route,
      destination: to,
    };
  }),
  pages,
};
