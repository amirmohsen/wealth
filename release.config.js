module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/npm', {
      pkgRoot: 'lib',
    }],
    ['@semantic-release/exec', {
      prepareCmd: 'cp -r ./lib/package.json .',
    }],
    ['@semantic-release/git', {
      assets: [
        'package.json'
      ]
    }],
    '@semantic-release/github'
  ]
};
