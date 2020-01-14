const babelConfigTemplate = ({ root, envOptions = {} } = {}) => ({
  presets: [['@babel/preset-env', envOptions], '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        root: [root],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  ],
});

module.exports = babelConfigTemplate;
