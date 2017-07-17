import * as XLSX from "xlsx";

import { JsExcelTemplateBase } from "./common";

function arrayBufferToString(data: ArrayBuffer) {
    return String.fromCharCode(...new Uint8Array(data));
    // let result = "";
    // const size = 10240;
    // const count = data.byteLength / size;
    // let i = 0;
    // for (; i < count; i++) {
    //     result += String.fromCharCode.apply(null, new Uint8Array(data.slice(i * size, i * size + size)));
    // }
    // result += String.fromCharCode.apply(null, new Uint8Array(data.slice(i * size)));
    // return result;
}

function stringToArrayBuffer(s: string) {
    const arrayBuffer = new ArrayBuffer(s.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < s.length; i++) {
        // tslint:disable-next-line:no-bitwise
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return arrayBuffer;
}

export class JsExcelTemplate extends JsExcelTemplateBase {
    static fromArrayBuffer(arrayBuffer: ArrayBuffer) {
        const ascii = btoa(arrayBufferToString(arrayBuffer));
        const workbook = XLSX.read(ascii, {
            type: "base64",
            cellNF: true,
            cellStyles: true,
            cellDates: true,
        });
        return new JsExcelTemplate(workbook);
    }

    toArrayBuffer(bookType: XLSX.BookType) {
        return stringToArrayBuffer(XLSX.write(this.workbook, { bookType, type: "binary" }));
    }

    toBlob(bookType: XLSX.BookType = "xlsx") {
        const arrayBuffer = this.toArrayBuffer(bookType);
        return new Blob([arrayBuffer], { type: "application/octet-stream" });
    }
}
