const childProcess = require('child_process')
const util = require('util')

const execAsync = util.promisify(childProcess.exec)

module.exports = {
  build: [
    `rimraf dist/`,
    {
      back: `tsc -p src/tsconfig.nodejs.json`,
      front: [
        `tsc -p src/tsconfig.browser.json`,
        {
          rollup: `rollup --config rollup.config.js`,
          demo: [
            `tsc -p demo`,
            `webpack --display-modules --config demo/webpack.config.js`
          ]
        }
      ]
    }
  ],
  lint: {
    ts: `tslint "src/*.ts" "spec/*.ts"`,
    js: `standard "**/*.config.js"`,
    export: `no-unused-export "src/*.ts" "spec/*.ts"`
  },
  test: [
    'tsc -p spec',
    'jasmine',
    async () => {
      const { stdout } = await execAsync('git status -s')
      if (stdout) {
        console.log(stdout)
        throw new Error(`generated files doesn't match.`)
      }
    }
  ],
  fix: {
    ts: `tslint --fix "src/*.ts" "spec/*.ts"`,
    js: `standard --fix "**/*.config.js"`
  },
  release: `clean-release`
}
