import { getHeadersTitle } from "@/container/reports/utils/ledgers/getHeaders"; 
import { sortTableData } from "@/container/reports/utils/others/sortTableData";
import { getStartAndEndDate } from "@/lib/dummyData/getStartAndEndDate";
import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";

////recordedTransArr

const keysRecordTrans = ["date", "account", "accountSub","description",  "transactionNo","voucher",  "reference", "debit", "credit"];
const keysRecordTransSummary = ["date", "entryType", "account", "accountSub", "description",   "transactionNo","voucher", "documentNo", "reference", "postedBy", "postedDate", "debit", "credit"];



 export const getJournalEntries =({dateForm, reportName,  transProcessor, query, clickedHeader})=>{
    const dateFormFmt = dateForm?.defaultDate? getStartAndEndDate("THIS-MONTH") : dateForm;
    const res = transProcessor.getRecordedTransactions(dateFormFmt);
    let rowsRes = res.recordedTransArr.filter((dt)=> dt?.voucher?.toLowerCase() === "journal");
   // console.log(res)
   // console.log(res)
    const startDateFmt = new Date(dateFormFmt?.startDate).toDateString();
    const endDateFmt = new Date(dateFormFmt?.endDate).toDateString();
    const date = 'Journal Entries Transactions from '+startDateFmt+" to "+endDateFmt;

    //return {}
    let result = {};
    const pdfDataFullData = {
        reportRowKeys:keysRecordTrans,
        noFmtCols:[8,9], // Number format columns 1234567 => 1,234,567
        headerFSize:[13],
        tableColsWch:[15, 35, "", "", "", "", "", "", "", ""], //Empty is auto
        tableColsFSize:6,
        tablePlain:[],
        footerArr:[],
        tableHeaderFSize:11,
    }
    const pdfData =  pdfDataFullData;
    let rowKeysShow = keysRecordTrans; 
    sortArrayByKey(rowsRes, 'transId', 'ASC');
    const rows = rowsRes.reduce((rowsFmt, row, i) => {
        const prevRow = rowsRes[i - 1];
        
        if (i > 0 && prevRow.transId !== row.transId) {
          // Add a separator (empty object) and the current row
          rowsFmt = [...rowsFmt, {}, row];
        } else {
          // Just add the current row
          rowsFmt = [...rowsFmt, row];
        }
        return rowsFmt; // Return the updated array
      }, []);   
    //  console.log(rows)
    const rowsDt = clickedHeader.name? sortTableData([...rows], clickedHeader.name) : rows;

    result =  {date, name:reportName, title:"Journal Entries", clickables:"ALL", rowKeysShow, rowHeaders:getHeadersTitle(rowKeysShow), rows:rowsDt, pdfData}

return result
}


