const { uglify } = require('rollup-plugin-uglify')
const resolve = require('@rollup/plugin-node-resolve')

module.exports = {
  input: 'dist/browser/browser.js',
  plugins: [resolve({ browser: true }), uglify()],
  output: {
    name: 'JsExcelTemplate',
    file: 'dist/js-excel-template.min.js',
    format: 'umd',
    globals: {
      exceljs: 'ExcelJS'
    }
  },
  external: ['exceljs']
}
