import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'dist/browser/browser.js',
  name: 'JsExcelTemplate',
  plugins: [resolve({ browser: true }), uglify()],
  output: {
    file: 'dist/js-excel-template.min.js',
    format: 'umd'
  },
  external: ['xlsx'],
  globals: {
    xlsx: 'XLSX'
  }
}
