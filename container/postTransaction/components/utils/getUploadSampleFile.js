const { handleExportTemplate2Excel } = require("@/lib/exel/handleExportTemplate2Excel");


//Remember to validate and assign dueDateType for uploaded transactions

export const getUploadSampleFile =()=>{
    const docName = "Transactions upload sample";
    const dataTemp = [
        ["date", "description", "debitAccount", "creditAccount", "debitSub", "creditSub", "reference", "dueDate", "amount"],
        ["2024-03-04",	"Purchase of Office furnitures",	"113000",	"121000",	"",	"",	"Invoice 231",	"",	"700000",],
        ["2024-03-04",	"Payment received from Customer",	"121000",	"152000",	"",	"C-000004",	"Receipt no 040",	"",	"1000000",],
        ["2024-03-07",	"Payment for professional services",	"531011",	"121000",	"",	"",	"Invoice 232",	"",	"250000",],
        ["2024-03-12",	"Payment to a vendor",	"222000",	"121000",	"V-000003",	"",	"Invoice 241",	"",	"600000",],
        ["2024-03-14",	"Sale of fully depreciated laptop to a staff",	"112000",	"411000",	"",	"",	"Ref- MEMO 111",	"",	"150000",]
    ];
    const dataGuide = [
        ["Upload Sample Guide"],
        [""],

        ["1. The data file must have nine columns only"],
        ["2. The first row is the header with the following columns: date, description, debitAccount, creditAccount, debitSub, creditSub, reference, dueDate and amount"],
        ["3. The header names MUST not be changed"],
        ["4. For each row, debitAccount is the account to be debited while creditAccount is the account to be credited."],
        ["5. SubAccount codes are the personal account codes; being Customers or Vendors account code. SubAccount code should be provided in cases where the debitAccount or creditAccount is a control account."],
        ["6. The dueDate is the expected due date for customer or vendor's payment. They should be provided when Customer account is debited or Vendor account is credited."],
        ["7. Please note that all provided debitAccount, creditAccount, debitSub and creditSub account codes must be existing in your chart of account (for debitAccount and creditAccount) and personal accounts (for debitSub and creditSub). You can create a new chart of account for a new accountCode"],
        ["8. Also note that you cannot record a product products in product list throught this module. Use Record Product module"],
        ["9. The sample file must be the first visible sheet in the workbook to upload."]

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
