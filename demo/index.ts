import * as FileSaver from 'file-saver'
import JsExcelTemplate from '../dist/browser/browser'

(async () => {
  const response = await fetch('./test.xlsx')
  const arrayBuffer = await response.arrayBuffer()
  const excelTemplate = await JsExcelTemplate.fromArrayBuffer(arrayBuffer)

  excelTemplate.set('name', 'John')
  excelTemplate.set('age', 123)
  excelTemplate.set('now', new Date())
  excelTemplate.set('isBoy', true)
  excelTemplate.set('isGirl', false)

  const students = [
    { name: 'Tommy', age: 12 },
    { name: 'Philips', age: 13 },
    { name: 'Sara', age: 14 }
  ]

  for (let i = 1; i <= 5; i++) {
    if (i <= students.length) {
      excelTemplate.set(`name${i}`, students[i - 1].name)
      excelTemplate.set(`age${i}`, students[i - 1].age)
    } else {
      excelTemplate.set(`name${i}`, '')
      excelTemplate.set(`age${i}`, '')
    }
  }
  excelTemplate.set('average', students.reduce((p, c) => p + c.age, 0) / students.length)

  excelTemplate.set('fields', [{ name: 'Name' }, { name: 'Age' }], { duplicateCellIfArray: true })

  excelTemplate.set('students', students)

  const blob = await excelTemplate.toBlob()
  FileSaver.saveAs(blob, 'test.xlsx')
})()
