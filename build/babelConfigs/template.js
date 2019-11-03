const babelConfigTemplate = ({ envOptions = {} } = {}) => ({
  presets: [['@babel/preset-env', envOptions], '@babel/preset-typescript'],
});

module.exports = babelConfigTemplate;
