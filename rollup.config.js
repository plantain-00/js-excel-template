import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'dist/browser/browser.js',
  name: 'JsExcelTemplate',
  plugins: [resolve(), uglify()],
  output: {
    file: 'dist/browser/browser.min.js',
    format: 'umd'
  },
  external: ['xlsx'],
  globals: {
    xlsx: 'XLSX'
  }
}
