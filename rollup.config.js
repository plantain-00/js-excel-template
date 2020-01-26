import { uglify } from 'rollup-plugin-uglify'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'dist/browser/browser.js',
  plugins: [resolve({ browser: true }), uglify()],
  output: {
    name: 'JsExcelTemplate',
    file: 'dist/js-excel-template.min.js',
    format: 'umd',
    globals: {
      xlsx: 'XLSX'
    }
  },
  external: ['xlsx']
}
