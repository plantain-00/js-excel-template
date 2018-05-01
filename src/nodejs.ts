import * as XLSX from 'xlsx'

import JsExcelTemplateBase from './common'

/**
 * @public
 */
export default class JsExcelTemplate extends JsExcelTemplateBase {
  public static fromFile(filepath: string) {
    const workbook = XLSX.readFile(filepath, {
      cellNF: true,
      cellStyles: true,
      cellDates: true
    })
    return new JsExcelTemplate(workbook)
  }

  public toBuffer(bookType: XLSX.BookType) {
    return XLSX.write(this.workbook, { bookType, type: 'buffer' })
  }

  public saveAs(filepath: string) {
    XLSX.writeFile(this.workbook, filepath)
  }
}
