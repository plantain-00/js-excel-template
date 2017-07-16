import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

function arrayBufferToString(data: ArrayBuffer) {
    let result = "";
    let index = 0;
    const size = 10240;
    const count = data.byteLength / size;
    for (; index < count; index++) {
        result += String.fromCharCode.apply(null, new Uint8Array(data.slice(index * size, index * size + size)));
    }
    result += String.fromCharCode.apply(null, new Uint8Array(data.slice(index * size)));
    return result;
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

fetch("./test.xlsx").then(response => response.arrayBuffer()).then(arrayBuffer => {
    const workbook = XLSX.read(btoa(arrayBufferToString(arrayBuffer)), { type: "base64" });

    FileSaver.saveAs(new Blob([stringToArrayBuffer(XLSX.write(workbook, { bookType: "xlsx", type: "binary" }))], { type: "application/octet-stream" }), "test.xlsx");
});
