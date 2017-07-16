import * as XLSX from "xlsx";

it("", () => {
    const workbook = XLSX.readFile("demo/test.xlsx");
    XLSX.writeFile(workbook, "spec/out.xlsx");
    // expect(true).toEqual(true);
});
