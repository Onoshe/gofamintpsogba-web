import { getHeadersTitle } from "@/container/reports/utils/ledgers/getHeaders"; 
import { sortTableData } from "@/container/reports/utils/others/sortTableData";
import { getStartAndEndDate } from "@/lib/dummyData/getStartAndEndDate";
import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";

////recordedTransArr

const keysRecordTrans = ["date", "entryType", "account", "accountSub","description",  "transactionNo","voucher", "documentNo", "reference", "debit", "credit"];
const keysRecordTransSummary = ["date", "entryType", "account", "accountSub", "description",   "transactionNo","voucher", "documentNo", "reference", "postedBy", "postedDate", "debit", "credit"];



 export const getRecordedTransactionsForDisplay =({dateForm, reportName,  transProcessor, query, clickedHeader})=>{
    const dateFormFmt = dateForm?.defaultDate? getStartAndEndDate("THIS-MONTH") : dateForm;
    const res = transProcessor.getRecordedTransactions(dateFormFmt);

   // console.log(res)
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
    sortArrayByKey(rows, 'transId', 'ASC');       

    const rowsDt = clickedHeader.name? sortTableData([...rows], clickedHeader.name) : rows;

    result =  {date, name:reportName, title:"Transactions Query", clickables:"ALL", rowKeysShow, rowHeaders:getHeadersTitle(rowKeysShow), rows:rowsDt, pdfData}

    

return result
}

