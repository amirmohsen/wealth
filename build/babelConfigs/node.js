const babelConfigTemplate = require('./template');

module.exports = api => {
  api.cache(true);
  return babelConfigTemplate({
    envOptions: {
      targets: {
        node: 8,
      },
    },
  });
};
