import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";
import { getFinancialStatementData } from "../ledgers/getFinancialStatements";

const keysMain = ['classTitle',  'title', 'closingBal'];
const keysDetails = ['classTitle', 'accountCode', 'title', 'closingBal'];
const headerMain = [{name:'classTitle', title:'Class'},{name:'accountCode', title:'Account'}, {name:'title', title:'Account'},{name:'closingBal', title:'Amount'}];
const headerDetails = [{name:'classTitle', title:'Class'},{name:'accountCode', title:'Account'}, {name:'title', title:''},{name:'closingBal', title:'Amount'}];
const keysCashflow = ['classTitle', 'title',  'cashAmount'];
const headerCashflow = [{name:'classTitle', title:''}, {name:'title', title:''}, {name:'cashAmount', title:'Amount'}];

export const getFinancialStatementForDisplay = ({reportName,  transProcessor, coaStructure, dateForm, transactionsDetails})=>{
    let result = {};
    const col1WchInDigit= 30;  //First column width in exported excel sheet
    const tb = transProcessor.getTrialBalance(dateForm).values;
    let coaSMapped = transProcessor.getCOAStructureMapped();
    const incomeClassCode = coaStructure.find((dt)=> dt.name.toLowerCase()=== "incomeclass")?.code;
    const retEarningsTypeCode = coaStructure.find((dt)=> dt.name.toLowerCase()=== "retainedearnings")?.code;
    sortArrayByKey(tb, 'typeCode');

    //console.log(coaStructure, coaSMapped, incomeClassCode)
    //return {name:reportName, title:'Condensed Income Statement', rowKeysShow:keysMain, rowHeaders:headerMain, rows:[], col1WchInDigit, pdfData:{}}
    
    const {bsRowsFmt, bsRowsFmtDetails, plRowsFmt, plRowsFmtDetails, cashflow} = getFinancialStatementData({tb, coaSMapped,  incomeClassCode, retEarningsTypeCode, transactionsDetails})
    //console.log(plRowsFmt);
    const pdfData = {
        reportRowKeys:reportName==='fs-cashflow-statement'?keysCashflow: keysMain,
        noFmtCols:[3],
        headerFSize:[14],
        tableColsWch:[], //Empty is auto
        tableColsFSize:10,
        tablePlain:[],
        footerArr:[],
        tableHeaderFSize:10,
        //docHeader:headerPdf,
    }

    switch (reportName) {
        case 'fs-income-statement':
            result = {name:reportName, title:'Condensed Income Statement', rowKeysShow:keysMain, rowHeaders:headerMain, rows:plRowsFmt, col1WchInDigit, pdfData}
            break;  
        case 'fs-income-statement-details':
            pdfData.reportRowKeys = keysDetails;
            pdfData.noFmtCols = [4];
            result = {name:reportName, title:'Income Statement', rowKeysShow:keysDetails, rowHeaders:headerDetails, rows:plRowsFmtDetails, col1WchInDigit, pdfData}
            break;   
        case 'fs-balance-sheet':
            result = {name:reportName, title:'Condensed Balance Sheet', rowKeysShow:keysMain, rowHeaders:headerMain, rows:bsRowsFmt, col1WchInDigit, pdfData}
            break;
        case 'fs-cashflow-statement':
            result = {name:reportName, title:'Cashflow Statement', rowKeysShow:keysCashflow, rowHeaders:headerCashflow, rows:cashflow, col1WchInDigit, pdfData}
            break;
        case 'fs-balance-sheet-details':
            pdfData.reportRowKeys = keysDetails;
            pdfData.noFmtCols = [4];
            result = {name:reportName, title:'Balance Sheet', rowKeysShow:keysDetails, rowHeaders:headerDetails, rows:bsRowsFmtDetails, col1WchInDigit, pdfData}
            break;   
    default:
        result = {name:reportName, title:'Balance Sheet', rowKeysShow:keysMain, rowHeaders:headerMain, rows:bsRowsFmt, col1WchInDigit, pdfData}
        break;
    }   
    return {...result, clickables:["title", "amount"]}
}