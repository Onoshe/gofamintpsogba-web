import { getHeadersTitle } from "@/container/reports/utils/ledgers/getHeaders"; 
import { getStartAndEndDate } from "@/lib/dummyData/getStartAndEndDate";

////recordedTransArr

const keysRecordTrans = ["date", "account", "accountSub","description",  "transactionNo","voucher", "reference", "debit", "credit"];
const keysRecordTransSummary = ["date", "account", "accountSub", "description",   "transactionNo","voucher", "reference", "postedBy", "postedDate", "debit", "credit"];



 export const getRecordedTransactionsForDisplay =({dateForm, reportName,  transProcessor, query})=>{
    const dateFormFmt = dateForm?.defaultDate? getStartAndEndDate("THIS-MONTH") : dateForm;
    const res = transProcessor.getRecordedTransactions(dateFormFmt);

    const startDateFmt = new Date(dateFormFmt?.startDate).toDateString();
    const endDateFmt = new Date(dateFormFmt?.endDate).toDateString();
    const date = 'Transactions from '+startDateFmt+" to "+endDateFmt;

    //return {}
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
    let rows = res.recordedTransArr;        

    result =  {date, name:reportName, title:"Transactions Query", clickables:"ALL", rowKeysShow, rowHeaders:getHeadersTitle(rowKeysShow), rows, pdfData}

    

return result
}

