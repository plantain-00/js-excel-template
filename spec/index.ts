import test from 'ava'
import JsExcelTemplate from '../src/nodejs'

test('JsExcelTemplate', async (t) => {
  const excelTemplate = await JsExcelTemplate.fromFile('demo/test.xlsx')

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

  await excelTemplate.saveAs('spec/out.xlsx')

  t.pass()
})
