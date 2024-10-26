const { handleExportTemplate2Excel } = require("@/lib/exel/handleExportTemplate2Excel");



export const getRecordProductByUploadSampleFile =()=>{
    const docName = "Record Product by Upload sample";
    const dataTemp = [
        ["Fields for PRODUCT PURCHASE"],
        ["", "date", "description", "reference","amount", "accountCodeDr", "subCodeDr", "accountCodeCr", "subCodeCr"],
        [],
        [],
        [],

        ["Fields for PRODUCT SALE"],
        ["", "date", "description", "reference","amount", "accountCodeDr", "subCodeDr", "accountCodeCr", "subCodeCr", "accountCodeProduct", "subCodeProduct", "quantityProduct", "accountCodeCOS"],

        [],
        [],
        [],

        ["Other Fields"],
        ["", "quantityDr", "unitsDr", "quantityCr", "unitsCr", "unitsProduct", "quantityBal"]
      ];
    const dataGuide = [
        ["Upload Sample Guide"],
        [],

        ["1. The data file must have four columns only"],
        ["2. For Product Purchase, the first row is the header with the following columns: date, description, reference, amount, accountCodeDr, subCodeDr, quantityDr, unitsDr, accountCodeCr, subCodeCr, quantityCr, unitsCr"],
        ["3. For Product Purchase, the first row is the header with the following columns: date, description, reference, amount, accountCodeDr, subCodeDr, quantityDr,unitsDr,accountCodeCr, subCodeCr, quantityCr,unitsCr,accountCodeProduct, subCodeProduct, quantityProduct,unitsProduct, accountCodeCOS, quantityBal"]
        ["4. The header names MUST not be changed"],
        ["5. The sample file must be the first visible sheet in the workbook to upload."]

    ];

    handleExportTemplate2Excel({docName, dataTemp, dataGuide}); 
}

