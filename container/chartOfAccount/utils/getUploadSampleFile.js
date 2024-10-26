const { handleExportTemplate2Excel } = require("@/lib/exel/handleExportTemplate2Excel");



export const getUploadSampleFile =(coaStructure)=>{
    const docName = "Chart of Account upload sample";
    const dataTemp = [
        ["accountName",	"accountCode", "typeCode",	"description"],
        ["Plant and Equipments",	"114000",	"111",	"Non-current assets, Plant & Equipment"],
        ["ABC Bank- Savings Account",	"121500-001", "131",	"ABC Bank- Savings Account"],
        ["Directors Current Account",	"171100-001",	"143", "Directors Current Account"],
        ["Other Income- Asset disposal",	"412100",	"421", "Asset disposal income account"],
        ["Uncapitalized assets",	"532010-01-EN",	"521", "Uncapitalized assets expenses account"],
        ["Subscription expenses",	"532015-EN",	"521", "Subscriptions expenses account"]
    ];
    const dataGuide = [
        ["Upload Sample Guide"],
        [""],

        ["1. The data file must have four columns only"],
        ["2. The first row is the header with the following columns: accountName, accountCode, typeCode and description."],
        ["3. The header names MUST not be changed"],
        ["4. The typeCode is the code that represents each account type. Your inputed typeCode must be a valid typeCode. Check TypeCode sheet for the list of all valid typeCodes."],
        ["5. Account codes could be a mixture of digits (0 - 9), lower case or upper case letters and hyphen ( - ) but must begin with non-zero digit"],
        ["6. Maximum characters for account accountCode is 12, accountName is 52 and description is 500"],
        //["7. Receivables and Payables Control Account"],
        ["7. The sample file must be the first visible sheet in the workbook to upload."]

    ];
    const col1MaxW = "";
    const dataTypeCodes = getTypeCodes(coaStructure, ['code', 'title', 'class']);
    //console.log(dataTypeCodes);
    handleExportTemplate2Excel({docName, dataTemp, dataGuide, dataTypeCodes, col1MaxW,}); 
}



export function getTypeCodes(arr, keys) {
    //Exclude  classCodes (0) & retainedEarnings 
    const filterArr = arr.filter((dt)=>{
        return dt.subCode != 0 && dt.name != "retainedEarnings"
    })
    const data  = filterArr.map(obj => keys.map(key => obj[key]));
    const header = ["TypeCode", "Account Type", "Account Class"];

    data.unshift(header);

    return data
  }
