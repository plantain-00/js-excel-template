import { JsExcelTemplate } from "../nodejs";

it("", () => {
    const excelTemplate = JsExcelTemplate.fromFile("demo/test.xlsx");
    excelTemplate.set("baz", [{ key: "baz 1" }, { key: "baz 2" }, { key: "baz 2" }]);
    excelTemplate.saveAs("spec/out.xlsx");
    // expect(true).toEqual(true);
});
