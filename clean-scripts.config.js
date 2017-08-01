module.exports = {
  build: [
    `rimraf dist/`,
    `tsc -p src/tsconfig.nodejs.json`,
    `tsc -p src/tsconfig.browser.json`,
    `rollup --config rollup.config.js`,
    `tsc -p demo`,
    `webpack --display-modules --config demo/webpack.config.js`
  ],
  lint: [
    `tslint "*.ts" "spec/*.ts"`,
    `standard "**/*.config.js"`
  ],
  test: [
    'tsc -p spec',
    'jasmine'
  ],
  fix: [
    `standard --fix "**/*.config.js"`
  ],
  release: [
    `clean-release`
  ]
}
