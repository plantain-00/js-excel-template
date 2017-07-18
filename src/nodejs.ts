import * as XLSX from "xlsx";

import JsExcelTemplateBase from "./common";

export default class JsExcelTemplate extends JsExcelTemplateBase {
    static fromFile(filepath: string) {
        const workbook = XLSX.readFile(filepath, {
            cellNF: true,
            cellStyles: true,
            cellDates: true,
        });
        return new JsExcelTemplate(workbook);
    }

    toBuffer(bookType: XLSX.BookType) {
        return XLSX.write(this.workbook, { bookType, type: "buffer" });
    }

    saveAs(filepath: string) {
        XLSX.writeFile(this.workbook, filepath);
    }
}
