import * as XLSX from "xlsx";

export class JsExcelTemplateBase {
    constructor(protected workbook: XLSX.WorkBook) { }

    set(name: string, value: any) {
        if (Array.isArray(value)) {
            if (value.length === 0) {
                return;
            }
            for (const sheetName of this.workbook.SheetNames) {
                const sheet = this.workbook.Sheets[sheetName];
                const targetRowIndex = this.findRowIndex(name, sheet);
                if (targetRowIndex >= 0) {
                    const ref = sheet["!ref"];
                    if (ref) {
                        const [leftRange, rightRange] = ref.split(":");
                        const { column: maxColumnName, rowIndex: maxRowCount } = this.parseCellName(rightRange);
                        const newMaxRowCount = maxRowCount + value.length;
                        if (maxRowCount >= 0) {
                            sheet["!ref"] = `${leftRange}:${maxColumnName}${newMaxRowCount}`;
                        }
                    }

                    for (const cellName in sheet) {
                        if (cellName.indexOf("!") !== 0) {
                            const { column, rowIndex } = this.parseCellName(cellName);
                            const cell: XLSX.CellObject = sheet[cellName];
                            if (rowIndex === targetRowIndex && cell.w) {
                                const index = cell.w.indexOf(`{${name}.`);
                                if (index >= 0) {
                                    let fieldName: string | undefined;
                                    for (let i = index + `{${name}.`.length; i < cell.w.length; i++) {
                                        if (cell.w[i] === "}") {
                                            fieldName = cell.w.substring(index + `{${name}.`.length, i);
                                            break;
                                        }
                                    }
                                    if (fieldName) {
                                        for (let i = 1; i < value.length; i++) {
                                            sheet[column + (rowIndex + i)] = JSON.parse(JSON.stringify(sheet[cellName]));
                                        }
                                        for (let i = 0; i < value.length; i++) {
                                            const newCell: XLSX.CellObject = sheet[column + (rowIndex + i)];
                                            newCell.v = cell.w.split(`{${name}.${fieldName}}`).join(value[i][fieldName]);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    return;
                }
            }
        } else {
            for (const sheetName of this.workbook.SheetNames) {
                const sheet = this.workbook.Sheets[sheetName];
                for (const cellName in sheet) {
                    if (cellName.indexOf("!") !== 0) {
                        const cell: XLSX.CellObject = sheet[cellName];
                        if (cell.w && cell.w.indexOf(`{${name}}`) >= 0) {
                            cell.v = cell.w.split(`{${name}}`).join(value);
                        }
                    }
                }
            }
        }
    }

    private parseCellName(cellName: string) {
        for (let i = 0; i < cellName.length; i++) {
            if (!isNaN(+cellName[i])) {
                return {
                    column: cellName.substring(0, i),
                    rowIndex: +cellName.substring(i),
                };
            }
        }
        return {
            column: "",
            rowIndex: -1,
        };
    }

    private findRowIndex(name: string, sheet: XLSX.WorkSheet) {
        for (const cellName in sheet) {
            if (cellName.indexOf("!") !== 0) {
                const cell: XLSX.CellObject = sheet[cellName];
                if (cell.w && cell.w.indexOf(`{${name}.`) >= 0) {
                    const { rowIndex } = this.parseCellName(cellName);
                    return rowIndex;
                }
            }
        }
        return -1;
    }
}
