module.exports = {
  include: [
    'browser.js',
    'browser.d.ts',
    'nodejs.js',
    'nodejs.d.ts',
    'common.js',
    'common.d.ts',
    'LICENSE',
    'package.json',
    'README.md'
  ],
  exclude: [
  ],
  postScript: 'npm publish [dir] --access public'
}
