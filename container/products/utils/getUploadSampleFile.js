const { handleExportTemplate2Excel } = require("@/lib/exel/handleExportTemplate2Excel");



export const getUploadSampleFile =()=>{
    const docName = "Product upload sample";
    const dataTemp = [
        ["productName",	"productCode",	"description",	"category"],
        ["Carbonated drink",	"CAD0001",	"50L Carbonated drink",	"Grocery"],
        ["Red Wine",	"RDW0001",	"America Red Wine",	"Grocery"],
        ["Top Detergent",	"TOD0001",	"Top detergent",	"Grocery"],
        ["TV Shelf ",	"TVS0001",	"TV Black Shelf ",	"Furnitures"],
        ["Office Chair",	"OFC0001",	"Victory R Swivel Office Chair",	"Furnitures"],
        ["Office Chair",	"OFC0002",	"Victory L Swivel Office Chair",	"Furnitures"]
    ];
    const dataGuide = [
        ["Upload Sample Guide"],
        [""],

        ["1. The data file must have four columns only"],
        ["2. The first row is the header with the following columns: productName, productCode, description and category."],
        ["3. The header names MUST not be changed"],
        ["4. Maximum characters for category is 24, productName is 52 and productCode is 12"],
        ["5. Product Code should be alphanumeric and must not begin with digit"],
        ["6. The sample file must be the first visible sheet in the workbook to upload."]

    ];
    const col1MaxW = "";
    handleExportTemplate2Excel({docName, dataTemp, dataGuide, col1MaxW,}); 
}


function objectToArray(arr, keys, exclude) {
    const returnVal = {keys:keys || [],  data:[], dataWithHeader:[]};
    
    if(arr?.length){
        if(keys?.length){
            if(exclude){
                const specKeysData  = arr.map(obj => {
                    return Object.entries(obj)
                        .filter(([key, value]) => !keys.includes(key))
                        .map(([key, value]) => value)
                });
                returnVal.keys = Object.keys(arr[0]).filter((key) => !keys.includes(key)),
                returnVal.data = specKeysData;
            }else{
                const specKeysData  = arr.map(obj => keys.map(key => obj[key]));
                returnVal.keys = keys,
                returnVal.data = specKeysData;
            }
            
        }else{
            const allKeysData = arr.map(obj => Object.keys(arr[0]).map(key => obj[key]));
            returnVal.data = allKeysData;
        }
        const fmtHeader = tableHeaderFormater(returnVal?.keys);        
        returnVal.dataWithHeader = [fmtHeader, ...returnVal.data];
    }
    return returnVal
  }
