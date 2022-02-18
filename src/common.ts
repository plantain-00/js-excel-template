import * as ExcelJS from 'exceljs'

export default class JsExcelTemplateBase {
  protected workbook = new ExcelJS.Workbook()

  public set(name: string, value: ExcelTemplateValue, options?: Partial<{
    duplicateCellIfArray: boolean
  }>) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return
      }
      for (const sheet of this.workbook.worksheets) {
        sheet.eachRow((row, rowIndex) => {
          let rowDuplicated = false
          const duplicateAndSetCell = (text: string, columnIndex: number) => {
            const fieldNames = this.getFieldNames(text, name)
            for (const fieldName of fieldNames) {
              if (options?.duplicateCellIfArray) {
                if (!rowDuplicated) {
                  for (let i = 1; i < value.length; i++) {
                    row.getCell(columnIndex + i).value = row.getCell(columnIndex).value
                  }
                  rowDuplicated = true
                }
                for (let i = 0; i < value.length; i++) {
                  this.setCell(row.getCell(columnIndex + i), `{${name}.${fieldName}}`, value[i][fieldName])
                }
              } else {
                if (!rowDuplicated) {
                  if (value.length > 1) {
                    sheet.duplicateRow(rowIndex, value.length - 1, true)
                  }
                  rowDuplicated = true
                }
                for (let i = 0; i < value.length; i++) {
                  this.setCell(sheet.getRow(rowIndex + i).getCell(columnIndex), `{${name}.${fieldName}}`, value[i][fieldName])
                }
              }
            }
          }
          row.eachCell((cell, columnIndex) => {
            if (typeof cell.value === 'string') {
              duplicateAndSetCell(cell.value, columnIndex)
            } else if (typeof cell.value === 'object' && cell.value) {
              const richTextCell = cell.value as ExcelJS.CellRichTextValue
              if (richTextCell.richText && Array.isArray(richTextCell.richText)) {
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

  private getFieldNames(text: string, name: string) {
    const fieldNames: string[] = []
    let position = 0
    while (position >= 0 && position < text.length) {
      const index = text.indexOf(`{${name}.`, position)
      if (index >= 0) {
        const endIndex = text.indexOf('}', index + `{${name}.`.length)
        if (endIndex >= 0) {
          fieldNames.push(text.substring(index + `{${name}.`.length, endIndex))
          position = endIndex
        } else {
          break
        }
      } else {
        break
      }
    }
    return fieldNames
  }

  private setCell(cell: ExcelJS.Cell, name: string, value: ExcelJS.CellValue) {
    if (cell.value) {
      if (typeof cell.value === 'string') {
        if (cell.value.includes(name)) {
          cell.value = cell.value === name ? value : cell.value.split(name).join(String(value))
        }
      } else if (typeof cell.value === 'object') {
        const richTextCell = cell.value as ExcelJS.CellRichTextValue
        if (richTextCell.richText && Array.isArray(richTextCell.richText)) {
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

/**
 * @public
 */
export type ExcelTemplateValue = ExcelJS.CellValue | Record<string, ExcelJS.CellValue>[]
