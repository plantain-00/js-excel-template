module.exports = {
  include: [
    'dist/**/*',
    'LICENSE',
    'package.json',
    'README.md'
  ],
  exclude: [
  ],
  base: 'dist',
  askVersion: true,
  changesGitStaged: true,
  postScript: [
    'npm publish "[dir]" --access public',
    'git add package.json',
    'git commit -m "v[version]"',
    'git tag v[version]',
    'git push',
    'git push origin v[version]'
  ]
}
