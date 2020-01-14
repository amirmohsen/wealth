const babelConfigTemplate = require('./build/babelConfigs/template');

module.exports = api => {
  api.cache(true);
  return babelConfigTemplate({
    root: __dirname,
    envOptions: {
      targets: {
        node: 'current',
      },
    },
  });
};
