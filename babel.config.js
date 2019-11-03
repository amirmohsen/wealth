const babelConfigTemplate = require('./build/babelConfigs/template');

module.exports = api => {
  api.cache(true);
  return babelConfigTemplate({
    envOptions: {
      targets: {
        node: 'current',
      },
    },
  });
};
