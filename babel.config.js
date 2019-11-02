const babelConfigTemplate = require('./build/babelConfigTemplate');

module.exports = (api) => {
  api.cache(true);
  return babelConfigTemplate({
    envOptions: {
      targets: {
        node: 'current'
      }
    }
  })
};
