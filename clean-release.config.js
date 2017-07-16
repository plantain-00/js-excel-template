module.exports = {
  include: [
    'index.js',
    'index.d.ts',
    'LICENSE',
    'package.json',
    'README.md'
  ],
  exclude: [
  ],
  postScript: 'npm publish [dir] --access public'
}
