import { getHeadersTitle } from "../ledgers/getHeaders";
import { getStartAndEndDate } from "@/lib/dummyData/getStartAndEndDate";


const keysRecordTrans = ["date", "account", "accountSub","description",  "transactionNo","voucher", "reference", "debit", "credit"];
const keysRecordTransSummary = ["date", "account", "accountSub", "description",   "transactionNo","voucher", "reference", "debit", "credit"];


 export const getReceiptsAndPaymentsForDisplay =({dateForm, reportName,  transProcessor, query})=>{
    const dateFormFmt = dateForm?.defaultDate? getStartAndEndDate("THIS-MONTH") : dateForm;
    const recordedTrans = transProcessor.getReceiptsAndPayment(dateFormFmt);

    console.log(recordedTrans)
    const startDateFmt = new Date(dateFormFmt?.startDate).toDateString();
    const endDateFmt = new Date(dateFormFmt?.endDate).toDateString();
    const date = 'Report from '+startDateFmt+" to "+endDateFmt;

    //console.log(recordedTrans)
    let result = {};
    const pdfDataFullData = {
        reportRowKeys:keysRecordTrans,
        noFmtCols:[8,9], // Number format columns 1234567 => 1,234,567
        headerFSize:[14],
        tableColsWch:[15, 35, "", "", "", "", "", "", "", ""], //Empty is auto
        tableColsFSize:6,
        tablePlain:[],
        footerArr:[],
        tableHeaderFSize:11,
    }
    const pdfData =  pdfDataFullData;
    let rowKeysShow = keysRecordTransSummary;
    let rows = recordedTrans.paymentsAndReceipts.all;        
    //console.log(recordedTrans)
    result = result = {date, name:reportName, title:"Receipts & Payments", clickables:"ALL", rowKeysShow, rowHeaders:getHeadersTitle(rowKeysShow), rows, pdfData}

return result
}

