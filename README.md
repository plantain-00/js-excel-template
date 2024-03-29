# js-excel-template

[![Dependency Status](https://david-dm.org/plantain-00/js-excel-template.svg)](https://david-dm.org/plantain-00/js-excel-template)
[![devDependency Status](https://david-dm.org/plantain-00/js-excel-template/dev-status.svg)](https://david-dm.org/plantain-00/js-excel-template#info=devDependencies)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/js-excel-template?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/js-excel-template/branch/master)
![Github CI](https://github.com/plantain-00/js-excel-template/workflows/Github%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/js-excel-template.svg)](https://badge.fury.io/js/js-excel-template)
[![Downloads](https://img.shields.io/npm/dm/js-excel-template.svg)](https://www.npmjs.com/package/js-excel-template)
[![gzip size](https://img.badgesize.io/https://unpkg.com/js-excel-template?compression=gzip)](https://unpkg.com/js-excel-template)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Fjs-excel-template%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/js-excel-template)

A js excel template used in browser or nodejs environment.

## install

`npm i js-excel-template`

## features

+ Generate Excel based on Excel template
+ (for nodejs)Read excel file as template
+ (for nodejs)Write to excel file
+ (for nodejs)To a `Buffer` for downloading
+ (for browser-side js)Take `ArrayBuffer` as template, coming from HTTP downloading, browser uploading or Websocket downloading
+ (for browser-side js)To a `ArrayBuffer` or `Blob` for HTTP uploading, browser-side downloading or Websocket uploading

## example

![template](https://raw.githubusercontent.com/plantain-00/js-excel-template/master/doc/template.PNG)

```ts
// nodejs:
import JsExcelTemplate from "js-excel-template";
const excelTemplate = await JsExcelTemplate.fromFile("demo/test.xlsx");

// browser(module):
// import * as FileSaver from "file-saver";
// import JsExcelTemplate from "js-excel-template";
// const response = await fetch('./test.xlsx')
// const arrayBuffer = await response.arrayBuffer()
// const excelTemplate = await JsExcelTemplate.fromArrayBuffer(arrayBuffer)

// browser(script tag):
// <script src="file-saver/FileSaver.min.js"></script>
// <script src="exceljs/dist/exceljs.min.js"></script>
// <script src="js-excel-template/js-excel-template.min.js"></script>
// <script>
//   const response = await fetch('./test.xlsx')
//   const arrayBuffer = await response.arrayBuffer()
//   const excelTemplate = await JsExcelTemplate.fromArrayBuffer(arrayBuffer)

excelTemplate.set("name", "John");
excelTemplate.set("age", 123);
excelTemplate.set("now", new Date());
excelTemplate.set("isBoy", true);
excelTemplate.set('isGirl', {
  richText: [
    {
      text: 'false',
      font: {
        strike: true,
      },
    },
  ],
})

const students = [
  { name: "Tommy", age: 12 },
  { name: "Philips", age: 13 },
  { name: "Sara", age: 14 },
];

for (let i = 1; i <= 5; i++) {
  if (i <= students.length) {
    excelTemplate.set(`name${i}`, students[i - 1].name);
    excelTemplate.set(`age${i}`, students[i - 1].age);
  } else {
    excelTemplate.set(`name${i}`, "");
    excelTemplate.set(`age${i}`, "");
  }
}
excelTemplate.set("average", students.reduce((p, c) => p + c.age, 0) / students.length);

excelTemplate.set('fields', [{ name: 'Name' }, { name: 'Age' }], { duplicateCellIfArray: true })

excelTemplate.set("students", students);

// nodejs:
await excelTemplate.saveAs("spec/out.xlsx");

// browser(module):
// const blob = await excelTemplate.toBlob()
// FileSaver.saveAs(blob, "test.xlsx");

// browser(script tag):
//   const blob = await excelTemplate.toBlob()
//   FileSaver.saveAs(blob, "test.xlsx");
// </script>
```

![out](https://raw.githubusercontent.com/plantain-00/js-excel-template/master/doc/out.PNG)

## change logs

```ts
// v3
const excelTemplate = await JsExcelTemplate.fromFile("demo/test.xlsx");
const excelTemplate = await JsExcelTemplate.fromArrayBuffer(arrayBuffer);
<script src="exceljs/dist/exceljs.min.js"></script>
await excelTemplate.saveAs("spec/out.xlsx");
const blob = await excelTemplate.toBlob()

// v2
const excelTemplate = JsExcelTemplate.fromFile("demo/test.xlsx");
const excelTemplate = JsExcelTemplate.fromArrayBuffer(arrayBuffer);
<script src="xlsx/dist/xlsx.full.min.js"></script>
excelTemplate.saveAs("spec/out.xlsx");
const blob = excelTemplate.toBlob()
```

```ts
// v2
import JsExcelTemplate from "js-excel-template/nodejs/nodejs";
import JsExcelTemplate from "js-excel-template/browser/browser";

// v1
import { JsExcelTemplate } from "js-excel-template/nodejs";
import { JsExcelTemplate } from "js-excel-template/browser";
```
