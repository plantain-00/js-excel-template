import JsExcelTemplateBase from './common'

/**
 * @public
 */
export default class JsExcelTemplate extends JsExcelTemplateBase {
  public static async fromArrayBuffer(arrayBuffer: ArrayBuffer) {
    const template = new JsExcelTemplate()
    await template.workbook.xlsx.load(arrayBuffer)
    return template
  }

  public async toBlob() {
    const arrayBuffer = await this.toArrayBuffer()
    return new Blob([arrayBuffer], { type: 'application/octet-stream' })
  }
}
