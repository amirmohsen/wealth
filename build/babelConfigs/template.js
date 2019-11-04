const babelConfigTemplate = ({ envOptions = {} } = {}) => ({
  presets: [['@babel/preset-env', envOptions], '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
      },
    ],
  ],
});

module.exports = babelConfigTemplate;
