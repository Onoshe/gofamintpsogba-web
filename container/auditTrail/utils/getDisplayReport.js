import { getStartAndEndDate } from "@/lib/dummyData/getStartAndEndDate";
import { getRecordedTransactionsForDisplay } from "./getRecordedTransactionsForDisplay";
import { getTransactionsListing } from "@/container/reports/utils/reportUtils/moreFunctions/getTransactionsListing";
import { getHeadersTitle } from "@/container/reports/utils/ledgers/getHeaders"; 
import { sortArrayByDate } from "@/lib/sort/sortArrayByDate";
import { filterByDateRange } from "@/lib/date/filterByDateRange";


const keysTranDetails = ['particulars', 'debit', 'credit'];
const activityKeys = ["activityDate", "activity", "activityDescription", "fullName",  "email", "userId"];
const rowHeaders = [{name:'activityDate', title:'Date'}, {name:'activity', title:'Activity'}, {name:'activityDescription', title:'Description'},
    {name:'userId', title:'User'},{name:'email', title:'Email'} ]

export const keysPersonalBalances =  ['accountCode', 'name', 'accountGroup', 'closingBal'];



export const getDisplayReport =({reportName, activityLog, transProcessor, activityQuery, viewTransId, transactionsDetails,  dateForm, user})=>{
    sortArrayByDate(activityLog, 'activityDate', "ASC");
    
    let result = {};
    let moreDocHeader = [];
    const pdfData = {
        reportRowKeys:[],
        noFmtCols:[],
        headerFSize:[14],
        tableColsWch:[], //Empty is auto
        tableColsFSize:8,
        tablePlain:[],
        footerArr:[],
        tableHeaderFSize:8,
    };
   
    if(viewTransId){
        if(viewTransId === "activities-log"){
            const activityRow = filterByDateRange(activityLog, dateForm.startDate, dateForm.endDate, 'activityDate');
            const date = `Query from ${new Date(dateForm.startDate).toDateString()} to ${new Date(dateForm.endDate).toDateString()}`
            result = {date,title:'Activities Query', name:'Activities Query', rowKeysShow:activityKeys, rowHeaders, rows:activityRow};
        }else{
            result = getTransactionsListing({transProcessor, viewTransId, keysTranDetails, reportName, pdfData, getHeadersTitle, moreDocHeader, transactionsDetails, dateForm, user});
            result.name = "Transaction View";
            const trans = transProcessor.getRecordedTransactions(dateForm);
            const tran = trans?.recordedTransArr?.find((dt)=> dt.transId === viewTransId);        
            result.rows = [...result.rows, {particulars:"Posted by: "+tran?.postedBy}, {particulars:"Posted date: "+tran?.postedDate}];
        }
    }else{
       result = getRecordedTransactionsForDisplay(({dateForm, reportName,  transProcessor, query:viewTransId}));
    }
    return result;

};


  