module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/npm', {
      pkgRoot: 'lib',
    }],
    ['@semantic-release/git', {
      assets: ['package.json']
    }],
    '@semantic-release/github'
  ]
};
