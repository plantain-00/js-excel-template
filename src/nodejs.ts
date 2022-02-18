import JsExcelTemplateBase from './common'

/**
 * @public
 */
export default class JsExcelTemplate extends JsExcelTemplateBase {
  public static async fromFile(filepath: string) {
    const template = new JsExcelTemplate()
    await template.workbook.xlsx.readFile(filepath)
    return template
  }

  public async toBuffer() {
    const arrayBuffer = await this.toArrayBuffer()
    return Buffer.from(arrayBuffer)
  }

  public saveAs(filepath: string) {
    return this.workbook.xlsx.writeFile(filepath)
  }
}
