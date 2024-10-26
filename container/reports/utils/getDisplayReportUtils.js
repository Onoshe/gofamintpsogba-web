import { getFinancialStatementData } from "./ledgers/getFinancialStatements";

const { getHeadersTitle } = require("./ledgers/getHeaders");


export const keysTB = ['name', 'debit', 'credit', ];
export const keysGL = ['transactionDate', 'description', 'accountCodeSub', 'transactionNo', 'documentNo', 'voucher', 'offsetAccountCode', 'offsetAccountName', 'reference', 'debit', 'credit', 'balance'];
export const keysGLProducts = ['transactionDate', 'description', 'transactionNo', 'documentNo', 'quantity', 'quantBalance', 'reference', 'debit', 'credit', 'balance'];
export const keysPersonalAcct =  ['title', 'accountCode', 'lastname', 'firstname', 'phoneNo', 'email', 'position', 'formNo', 'companyName', 'companyPhoneNo', 'companyEmail', 'registeredDate'];
export const keysProductsAcct =  ['productCode', 'productName', 'description', 'category'];
export const keysTransListing = ['edit', 'view', 'transactionDate', 'transactionNo', 'description', 'debitAccount', 'creditAccount', 'voucher', 'reference', 'postingPlat', 'amount'];
export const keysTranDetails = ['particulars', 'debit', 'credit'];

export const keysPersonalBalances =  ['accountCode', 'name', 'accountGroup', 'closingBal'];


 //For individual ledger account. Individual General Ledger, Customers Ledger, Vendors Ledger & Products Ledger
export const getIndividualLedgersForDisplay =({transProcessor, subReports, rows, selLedgerCode, dateForm})=>{
        let result = {};
        const pdfData = {
            reportRowKeys:keysGLProducts,
            noFmtCols:[10, 11, 12],
            headerFSize:[14],
            tableColsWch:[15, 30, "", "", "", "", "", "", "", "","", ""], //Empty is auto
            tableColsFSize:6,
            tablePlain:[],
            footerArr:[],
            tableHeaderFSize:11,
        }
        switch (subReports[0]){
            case 'gl':
                //console.log(dateForm, subReports)
                const genLedgerName = rows?.find(dt=> dt.accountCodeSubName)?.accountCodeSubName;
                const title = `General Ledger: ${selLedgerCode} ${genLedgerName}`;
                result = {name:subReports[0], title, rowKeysShow:keysGLProducts, rowHeaders:getHeadersTitle(keysGLProducts), rows, pdfData}
                break;
            case 'customers':
                let rowsCus = transProcessor.getPersonalAccounts('customersLedger', dateForm)[selLedgerCode]?.trans || [];
                const cusLedgerName = rowsCus?.find(dt=> dt.accountCodeSubName)?.accountCodeSubName;
                const titleCus = `Customer Ledger: ${selLedgerCode} ${cusLedgerName}`;
                result = {name:subReports[0], title:titleCus, rowKeysShow:keysGLProducts, rowHeaders:getHeadersTitle(keysGLProducts), rows:rowsCus, pdfData}
                break;
            case 'vendors':
                let rowsVed = transProcessor.getPersonalAccounts('vendorsLedger', dateForm)[selLedgerCode]?.trans || [];
                const vedLedgerName = rowsVed?.find(dt=> dt.accountCodeSubName)?.accountCodeSubName;
                const titleVed = `Vanedor Ledger: ${selLedgerCode} ${vedLedgerName}`;
                result = {name:subReports[0], title:titleVed, rowKeysShow:keysGLProducts, rowHeaders:getHeadersTitle(keysGLProducts), rows:rowsVed, pdfData}
                break;
            case 'products':
                const rowsPro = transProcessor.getPersonalAccounts('productsLedger', dateForm)[selLedgerCode]?.trans || [];
                const proLedgerName = rowsPro?.find(dt=> dt.accountCodeSubName)?.accountCodeSubName;
                const titlePro = `Product Ledger: ${selLedgerCode} ${proLedgerName}`;
                result = {name:subReports[0], title:titlePro, rowKeysShow:keysGLProducts, rowHeaders:getHeadersTitle(keysGLProducts), rows:rowsPro, pdfData}
                break;
        
            default:
                result = {rowKeysShow:keysGL, rowHeaders:getHeadersTitle(keysGL), rows, pdfData}
                break;
        }
   
    return result
}

export const getLedgersAndPersonalAcctsForDisplay =({reportName,  transProcessor, customers, vendors, products, viewTransId, transactionsDetails, dateForm})=>{
        let result = {};
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
       //console.log(transProcessor.getGeneralLedgers());

        switch (reportName) {
            case 'trial-balance':
                pdfData.reportRowKeys = keysTB;
                pdfData.noFmtCols = [2,3];
                pdfData.tableHeaderFSize=10,
                result = {name:reportName, title:'Trial Balance', rowKeysShow:keysTB, rowHeaders:getHeadersTitle(keysTB, 'TB'), rows:transProcessor.getTrialBalance(dateForm).values, 
                        clickables:"ALL", pdfData}
                break;
            case 'general-ledger':
                pdfData.reportRowKeys = keysGL;
                pdfData.noFmtCols = [10,11,12];
                pdfData.tableColsWch = [20, 40, "", "", "", "", "", "", "", "", "", ""];
                result = {name:reportName, title:"General Ledger", rowKeysShow:keysGL, rowHeaders:getHeadersTitle(keysGL), rows:transProcessor.getGeneralLedgers(dateForm),  pdfData}
                break;
            case 'personal-ledgers-customers':
                pdfData.reportRowKeys = keysGL;
                pdfData.noFmtCols = [2,8,9];
                pdfData.tableColsWch = [20, 40, "", "", "", "", "", "", ""];
                result = {name:reportName, title:"Customers Ledgers", rowKeysShow:keysGL, rowHeaders:getHeadersTitle(keysGL), rows:transProcessor.getPersonalLedgers('customersLedger', dateForm),  pdfData}
                break;
            case 'personal-ledgers-vendors':
                pdfData.reportRowKeys = keysGL;
                pdfData.noFmtCols = [2,8,9];
                pdfData.tableColsWch = [20, 40, "", "", "", "", "", "", ""];
                result = {name:reportName, title:"Vendors Ledgers", rowKeysShow:keysGL, rowHeaders:getHeadersTitle(keysGL), rows:transProcessor.getPersonalLedgers('vendorsLedger', dateForm),  pdfData}
                break;
            case 'personal-ledgers-products':
                pdfData.reportRowKeys = keysGLProducts;
                pdfData.noFmtCols = [8,9,10];
                pdfData.tableColsWch = [15, 30, "", "", "", "", "", "", "", ""];
                result = {name:reportName, title:"Products Ledgers", rowKeysShow:keysGLProducts, rowHeaders:getHeadersTitle(keysGLProducts), rows:transProcessor.getPersonalLedgers('productsLedger', dateForm),  pdfData}
                break;
            case 'transaction-view':
                let transListRows = transProcessor.getTransactionsListing(dateForm);
                if(viewTransId){
                    pdfData.reportRowKeys = keysTranDetails;
                    pdfData.noFmtCols = [3];
                    pdfData.tableColsWch = 'auto';
                    const transEntries = transactionsDetails.filter((dt)=> dt.transId == viewTransId);
                    const debitTrans = []; const creditTrans = []; let totals = {debit:0, credit:0};
                    for (let tran of transEntries) {
                        if(tran.entryType === "DR"){
                            debitTrans.push(tran); totals.debit += parseFloat(tran.amount);
                        }else{creditTrans.push(tran); totals.credit += parseFloat(Math.abs(tran.amount));}
                    }
                    const emptyRow = {};
                    transListRows = [...debitTrans, emptyRow, emptyRow, ...creditTrans].map((dt)=> {
                        const particulars = dt?.description? dt.accountCode + " "+dt.accountName : '';
                        return dt.entryType === "DR"? {...dt, particulars, debit:dt?.amount} : {...dt, particulars, credit:dt?.amount?.toString()?.replace("-","")}
                    });
                    transListRows.push(emptyRow);
                    transListRows.push(emptyRow);
                    transListRows.push({particulars:"Being: "+debitTrans[0]?.description});
                    transListRows.push({particulars:'Total', debit:totals.debit, credit:totals.credit});

                    result = {name:reportName, title:"Transaction details", rowKeysShow:keysTranDetails, rowHeaders:getHeadersTitle(keysTranDetails), rows:transListRows,
                            pdfData, date:'Transaction no: '+viewTransId}
                }else{
                    pdfData.reportRowKeys = keysTransListing.slice(1);
                    pdfData.noFmtCols = [6];
                    pdfData.tableColsWch = [20, 25, "", "", "",  "",];
                    transListRows = transListRows.map((dt)=> {
                        const debitAccount = dt?.accountCodeDr?  dt.accountCodeDr+" "+dt.accountNameDr : "";
                        const creditAccount = dt?.accountCodeCr? dt.accountCodeCr+" "+dt.accountNameCr : "";
                        return {...dt, debitAccount, creditAccount}
                    });
                    result = {name:reportName, title:"Transaction View", rowKeysShow:keysTransListing, rowHeaders:getHeadersTitle(keysTransListing), rows:transListRows, clickables:['edit', 'view'],
                            pdfData,}
                }
                break;
            
            //Personal Account Balances
            case 'personal-ledgers-customers-balances':
                pdfData.reportRowKeys = keysPersonalBalances;
                pdfData.noFmtCols = [3];
                let ledgersCus = transProcessor.processTransactions(dateForm?.startDate, dateForm?.endDate);
                ledgersCus = ledgersCus.customersLedger;
                
                const cusBal = Object.keys(ledgersCus).map((acctCode)=> {
                    const ledger = ledgersCus[acctCode];
                    return {...ledger, accountCode:ledger?.trans[0]?.accountCodeSub}
                });
                //console.log(cusBal)
                result = {name:reportName, title:"Customers Balances", rowKeysShow:keysPersonalBalances, rowHeaders:getHeadersTitle(keysPersonalBalances), rows:cusBal,  pdfData}
                break;
             case 'personal-ledgers-vendors-balances':
                    pdfData.reportRowKeys = keysPersonalBalances;
                    pdfData.noFmtCols = [3];
                    let ledgersVed = transProcessor.processTransactions(dateForm?.startDate, dateForm?.endDate);
                    ledgersVed = ledgersVed.vendorsLedger;
                    //console.log(ledgersVed)
                    const vedBal = Object.keys(ledgersVed).map((acctCode)=> {
                        const ledger = ledgersVed[acctCode];
                        return {...ledger, accountCode:ledger?.trans[0]?.accountCodeSub}
                    });
                    result = {name:reportName, title:"Vendors Balances", rowKeysShow:keysPersonalBalances, rowHeaders:getHeadersTitle(keysPersonalBalances), rows:vedBal,  pdfData}
                    break;

                case 'personal-ledgers-products-balances':
                    pdfData.reportRowKeys = keysPersonalBalances;
                    pdfData.noFmtCols = [3];
                    let ledgersProd = transProcessor.processTransactions(dateForm?.startDate, dateForm?.endDate);
                    ledgersProd = ledgersProd.productsLedger;
                    const prodBal = Object.keys(ledgersProd).map((acctCode)=> {
                        const ledger = ledgersProd[acctCode];
                        return {...ledger, accountCode:ledger[0]?.accountCodeSub}
                    });
                    result = {name:reportName, title:"Products Balances", rowKeysShow:keysPersonalBalances, rowHeaders:getHeadersTitle(keysPersonalBalances), rows:prodBal,  pdfData}
                break;

            //Personal accounts Listing
            case 'account-list-customers':
                pdfData.reportRowKeys = keysPersonalAcct;
                pdfData.noFmtCols = [];
                pdfData.tableColsWch = ["", "", "", "", "",  20, "", "", "",  "","",  "",];
                pdfData.tableColsFSize= 6;
                pdfData.tableHeaderFSize=6,
                result = {name:reportName, title:"Customers List", rowKeysShow:keysPersonalAcct, rowHeaders:getHeadersTitle(keysPersonalAcct), rows:customers, pdfData}
                break;
            case 'account-list-vendors':
                pdfData.reportRowKeys = keysPersonalAcct;
                pdfData.noFmtCols = [];
                pdfData.tableColsWch = ["", "", "", "", "",  20, "", "", "",  "","",  "",];
                pdfData.tableColsFSize= 6;
                pdfData.tableHeaderFSize=6,
                result = {name:reportName, title:"Vendors List", rowKeysShow:keysPersonalAcct, rowHeaders:getHeadersTitle(keysPersonalAcct), rows:vendors, pdfData}
                break;
            case 'account-list-products':
                pdfData.reportRowKeys = keysProductsAcct;
                pdfData.noFmtCols = [];
                pdfData.tableColsWch = [];
                result = {name:reportName, title:"Products List", rowKeysShow:keysProductsAcct, rowHeaders:getHeadersTitle(keysProductsAcct), rows:products, pdfData}
                break;
            default:
                result = {name:'trial-balance', title:'Trial Balance', rowKeysShow:keysTB, rowHeaders:getHeadersTitle(keysTB), rows:transProcessor.getTrialBalance().values, pdfData}
                break;
        }
    
    return result
}


const keysMain = ['classTitle',  'title', 'closingBal'];
const keysDetails = ['classTitle', 'accountCode', 'title', 'closingBal'];
const headerMain = [{name:'classTitle', title:'Class'},{name:'accountCode', title:'Account'}, {name:'title', title:'Account'},{name:'closingBal', title:'Amount'}];
const headerDetails = [{name:'classTitle', title:'Class'},{name:'accountCode', title:'Account'}, {name:'title', title:''},{name:'closingBal', title:'Amount'}];


export const getFinancialStatementForDisplay = ({reportName,  transProcessor, coaStructure, dateForm})=>{
    let result = {};
    const col1WchInDigit= 30;  //First column width in exported excel sheet
    const tb = transProcessor.getTrialBalance().values;
    let coaSMapped = transProcessor.getCOAStructureMapped(coaStructure);
    
    const {bsRowsFmt, bsRowsFmtDetails, plRowsFmt, plRowsFmtDetails} = getFinancialStatementData({tb, coaSMapped})
    //console.log(plRowsFmt);
    const pdfData = {
        reportRowKeys:keysMain,
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
        case 'fs-balance-sheet-details':
            pdfData.reportRowKeys = keysDetails;
            pdfData.noFmtCols = [4];
            result = {name:reportName, title:'Balance Sheet', rowKeysShow:keysDetails, rowHeaders:headerDetails, rows:bsRowsFmtDetails, col1WchInDigit, pdfData}
            break;   
    default:
        result = {name:reportName, title:'Balance Sheet', rowKeysShow:keysMain, rowHeaders:headerMain, rows:bsRowsFmt, col1WchInDigit, pdfData}
        break;
    }
    
    return result
}