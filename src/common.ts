import * as ExcelJS from 'exceljs'

export default class JsExcelTemplateBase {
  protected workbook = new ExcelJS.Workbook()

  public set(name: string, value: unknown, options?: Partial<{
    duplicateCellIfArray: boolean
  }>) {
    if (isArray(value)) {
      if (value.length === 0) {
        return
      }
      for (const sheet of this.workbook.worksheets) {
        sheet.eachRow((row, rowIndex) => {
          let rowDuplicated = false
          const duplicateAndSetCell = (text: string, columnIndex: number) => {
            const fieldName = this.getFieldName(text, name)
            if (fieldName) {
              if (options?.duplicateCellIfArray) {
                for (let i = 1; i < value.length; i++) {
                  row.getCell(columnIndex + i).value = row.getCell(columnIndex).value
                }
                for (let i = 0; i < value.length; i++) {
                  this.setCell(row.getCell(columnIndex + i), `{${name}.${fieldName}}`, (value[i] as Record<string, unknown>)[fieldName])
                }
              } else {
                if (!rowDuplicated) {
                  if (value.length > 1) {
                    sheet.duplicateRow(rowIndex, value.length - 1, true)
                  }
                  rowDuplicated = true
                }
                for (let i = 0; i < value.length; i++) {
                  this.setCell(sheet.getRow(rowIndex + i).getCell(columnIndex), `{${name}.${fieldName}}`, (value[i] as Record<string, unknown>)[fieldName])
                }
              }
            }
          }
          row.eachCell((cell, columnIndex) => {
            if (typeof cell.value === 'string') {
              duplicateAndSetCell(cell.value, columnIndex)
            } else if (typeof cell.value === 'object' && cell.value) {
              const richTextCell = cell.value as ExcelJS.CellRichTextValue
              if (richTextCell.richText && isArray(richTextCell.richText)) {
                for (const richText of richTextCell.richText) {
                  duplicateAndSetCell(richText.text, columnIndex)
                }
              }
            }
          })
        })
      }
    } else {
      for (const sheet of this.workbook.worksheets) {
        sheet.eachRow((row) => {
          row.eachCell((cell) => {
            this.setCell(cell, `{${name}}`, value)
          })
        })
      }
    }
  }

  public toArrayBuffer() {
    return this.workbook.xlsx.writeBuffer()
  }

  private getFieldName(text: string, name: string) {
    const index = text.indexOf(`{${name}.`)
    if (index >= 0) {
      const endIndex = text.indexOf('}', index + `{${name}.`.length)
      if (endIndex >= 0) {
        return text.substring(index + `{${name}.`.length, endIndex)
      }
    }
    return ''
  }

  private setCell(cell: ExcelJS.Cell, name: string, value: unknown) {
    if (cell.value) {
      if (typeof cell.value === 'string') {
        if (cell.value.includes(name)) {
          cell.value = cell.value === name ? value as ExcelJS.CellValue : cell.value.split(name).join(String(value))
        }
      } else if (typeof cell.value === 'object') {
        const richTextCell = cell.value as ExcelJS.CellRichTextValue
        if (richTextCell.richText && isArray(richTextCell.richText)) {
          for (const richText of richTextCell.richText) {
            if (richText.text.includes(name)) {
              richText.text = richText.text === name ? String(value) : richText.text.split(name).join(String(value))
            }
          }
        }
      }
    }
  }
}

const isArray = (arg: unknown): arg is unknown[] => Array.isArray(arg)
