import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'dist/browser/browser.js',
  dest: 'dist/browser/browser.min.js',
  format: 'umd',
  moduleName: 'JsExcelTemplate',
  plugins: [resolve(), uglify()],
  external: ['xlsx'],
  globals: {
    xlsx: 'XLSX'
  }
}
