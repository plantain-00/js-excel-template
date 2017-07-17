import * as FileSaver from "file-saver";
import { JsExcelTemplate } from "../browser";

fetch("./test.xlsx").then(response => response.arrayBuffer()).then(arrayBuffer => {
    const excelTemplate = JsExcelTemplate.fromArrayBuffer(arrayBuffer);
    excelTemplate.set("baz", [{ key: "baz 1" }, { key: "baz 2" }, { key: "baz 2" }]);
    FileSaver.saveAs(excelTemplate.toBlob(), "test.xlsx");
});
