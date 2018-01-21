import * as XLSX from 'xlsx'

import JsExcelTemplateBase from './common'

function arrayBufferToString (data: ArrayBuffer) {
  return String.fromCharCode(...new Uint8Array(data))
}

function stringToArrayBuffer (s: string) {
  const arrayBuffer = new ArrayBuffer(s.length)
  const view = new Uint8Array(arrayBuffer)
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return arrayBuffer
}

/**
 * @public
 */
export default class JsExcelTemplate extends JsExcelTemplateBase {
  public static fromArrayBuffer (arrayBuffer: ArrayBuffer) {
    const ascii = btoa(arrayBufferToString(arrayBuffer))
    const workbook = XLSX.read(ascii, {
      type: 'base64',
      cellNF: true,
      cellStyles: true,
      cellDates: true
    })
    return new JsExcelTemplate(workbook)
  }

  public toArrayBuffer (bookType: XLSX.BookType) {
    return stringToArrayBuffer(XLSX.write(this.workbook, { bookType, type: 'binary' }))
  }

  public toBlob (bookType: XLSX.BookType = 'xlsx') {
    const arrayBuffer = this.toArrayBuffer(bookType)
    return new Blob([arrayBuffer], { type: 'application/octet-stream' })
  }
}
