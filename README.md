[![Dependency Status](https://david-dm.org/plantain-00/js-excel-template.svg)](https://david-dm.org/plantain-00/js-excel-template)
[![devDependency Status](https://david-dm.org/plantain-00/js-excel-template/dev-status.svg)](https://david-dm.org/plantain-00/js-excel-template#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/js-excel-template.svg?branch=master)](https://travis-ci.org/plantain-00/js-excel-template)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/js-excel-template?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/js-excel-template/branch/master)
[![npm version](https://badge.fury.io/js/js-excel-template.svg)](https://badge.fury.io/js/js-excel-template)
[![Downloads](https://img.shields.io/npm/dm/js-excel-template.svg)](https://www.npmjs.com/package/js-excel-template)

# js-excel-template
A js excel template used in browser or nodejs environment.

#### install

`npm i js-excel-template`

#### features

+ Generate Excel based on Excel template
+ (for nodejs)Read excel file as template
+ (for nodejs)Write to excel file
+ (for nodejs)To a `Buffer` for downloading
+ (for browser-side js)Take `ArrayBuffer` as template, coming from HTTP downloading, browser uploading or Websocket downloading
+ (for browser-side js)To a `ArrayBuffer` or `Blob` for HTTP uploading, browser-side downloading or Websocket uploading

#### example

![](https://raw.githubusercontent.com/plantain-00/js-excel-template/master/doc/template.PNG)

```ts
// nodejs:
import JsExcelTemplate from "js-excel-template/nodejs/nodejs";
const excelTemplate = JsExcelTemplate.fromFile("demo/test.xlsx");

// browser(module):
// import * as FileSaver from "file-saver";
// import JsExcelTemplate from "js-excel-template/browser/browser";
// fetch("./test.xlsx").then(response => response.arrayBuffer()).then(arrayBuffer => {
//     const excelTemplate = JsExcelTemplate.fromArrayBuffer(arrayBuffer);

// browser(script tag):
// <script src="file-saver/FileSaver.min.js"></script>
// <script src="xlsx/dist/xlsx.full.min.js"></script>
// <script src="js-excel-template/browser/browser.min.js"></script>
// <script>
//     fetch("./test.xlsx").then(response => response.arrayBuffer()).then(arrayBuffer => {
//         const excelTemplate = JsExcelTemplate.fromArrayBuffer(arrayBuffer);

excelTemplate.set("name", "John");
excelTemplate.set("age", 123);
excelTemplate.set("now", new Date());
excelTemplate.set("isBoy", true);
excelTemplate.set("isGirl", false);

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

excelTemplate.set("students", students);

// nodejs:
excelTemplate.saveAs("spec/out.xlsx");

// browser(module):
//     FileSaver.saveAs(excelTemplate.toBlob(), "test.xlsx");
// });

// browser(script tag):
//         saveAs(excelTemplate.toBlob(), "test.xlsx");
//     });
// </script>
```

![](https://raw.githubusercontent.com/plantain-00/js-excel-template/master/doc/out.PNG)

#### change logs

```ts
// v2
import JsExcelTemplate from "js-excel-template/nodejs/nodejs";
import JsExcelTemplate from "js-excel-template/browser/browser";

// v1
import { JsExcelTemplate } from "js-excel-template/nodejs";
import { JsExcelTemplate } from "js-excel-template/browser";
```
