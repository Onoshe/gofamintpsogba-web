import { getTransactionsListing } from "./moreFunctions/getTransactionsListing";
import { getHeadersTitle } from "../ledgers/getHeaders";
import { sortTableData } from "../others/sortTableData";


export const keysTB = ['accountCode', 'name', 'debit', 'credit', ];
export const keysGL = ['transactionDate', 'description', 'accountCodeSub', 'transactionNo', 'documentNo', 'voucher', 'offsetAccountCode', 'offsetAccountName', 'reference', 'debit', 'credit', 'balance'];
export const keysGLMain = ['transactionDate', 'accountCode', 'description', 'transactionNo', 'documentNo', 'voucher', 'offsetAccountCode', 'offsetAccountName', 'reference', 'debit', 'credit', 'balance'];
export const keysGLProducts = ['transactionDate', 'description', 'transactionNo', 'documentNo', 'quantity',  'reference', 'debit', 'credit', 'balance'];
export const keysPersonalAcct =  ['title', 'accountCode', 'lastname', 'firstname', 'phoneNo', 'email', 'position','accountGroup', 'formNo', 'companyName', 'companyPhoneNo', 'companyAddress', 'companyEmail', 'registeredDate'];
export const keysProductsAcct =  ['productCode', 'productName', 'description', 'category'];
export const keysTransListing = ['view', 'transactionDate', 'transactionNo', 'description', 'debitAccount', 'creditAccount', 'voucher', 'reference', 'postingPlat', 'amount'];
export const keysTranDetails = ['particulars', 'debit', 'credit'];

export const keysPersonalBalances =  ['accountCode', 'name', 'group', 'closingBal'];



export const getLedgersAndPersonalAcctsForDisplay =({reportName,  transProcessor, customers, vendors, products, viewTransId, transactionsDetails, user, dateForm, clickedHeader})=>{
        let result = {};
        let moreDocHeader = [];
        const clickables = ['accountCode', 'name']; //For personal-ledgers-******-balances
        const discAndTranNo = ['description', 'transactionNo'];
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
        const rowsTb = transProcessor.getTrialBalance(dateForm).values;
        //console.log(rowsTb);

        const date = "Report as at "+new Date().toDateString(); //For personal account list and balances
        
        //Sort data
        const customersStd = clickedHeader.name? sortTableData([...customers], clickedHeader.name) : customers;
        const vendorsStd =  clickedHeader.name? sortTableData([...vendors], clickedHeader.name) : vendors;
        const productsStd =  clickedHeader.name? sortTableData([...products], clickedHeader.name) : products;
        //console.log(customers, customersStd);

        switch (reportName) {
            case 'trial-balance':
                pdfData.reportRowKeys = keysTB;
                pdfData.noFmtCols = [2,3];
                pdfData.tableHeaderFSize=10,
                result = {name:reportName, title:'Trial Balance', rowKeysShow:keysTB, rowHeaders:getHeadersTitle(keysTB, 'TB'), rows:rowsTb, 
                        clickables:"ALL", pdfData}
                break;
            case 'general-ledger':
                pdfData.reportRowKeys = keysGLMain;
                pdfData.noFmtCols = [10,11,12];
                pdfData.tableColsWch = [20, 17, 40, "", "", "", "", "", "", "", "", "", ""];
                let rowsGl = transProcessor.getGeneralLedgers(dateForm);
                rowsGl = rowsGl.filter((row)=> row.transactionDate !== "TOTAL");
                //rowsGl = transaction.classNameTD = 'hover:text-[blue] cursor-pointer';
                result = {name:reportName, title:"General Ledger", rowKeysShow:keysGLMain, rowHeaders:getHeadersTitle(keysGLMain), rows:rowsGl, clickables:discAndTranNo, pdfData}
                break;
            case 'personal-ledgers-customers':
                pdfData.reportRowKeys = keysGL;
                pdfData.noFmtCols = [2,8,9];
                pdfData.tableColsWch = [20, 40, "", "", "", "", "", "", ""];
                result = {name:reportName, title:"Customers Ledgers", rowKeysShow:keysGL, rowHeaders:getHeadersTitle(keysGL), rows:transProcessor.getPersonalLedgers('customersLedger', dateForm), clickables:discAndTranNo, pdfData}
                break;
            case 'personal-ledgers-vendors':
                pdfData.reportRowKeys = keysGL;
                pdfData.noFmtCols = [2,8,9];
                pdfData.tableColsWch = [20, 40, "", "", "", "", "", "", ""];
                result = {name:reportName, title:"Vendors Ledgers", rowKeysShow:keysGL, rowHeaders:getHeadersTitle(keysGL), rows:transProcessor.getPersonalLedgers('vendorsLedger', dateForm),clickables:discAndTranNo,  pdfData}
                break;
            case 'personal-ledgers-products':
                pdfData.reportRowKeys = keysGLProducts;
                pdfData.noFmtCols = [8,9,10];
                pdfData.tableColsWch = [15, 30, "", "", "", "", "", "", "", ""];
                result = {name:reportName, title:"Products Ledgers", rowKeysShow:keysGLProducts, rowHeaders:getHeadersTitle(keysGLProducts), rows:transProcessor.getPersonalLedgers('productsLedger', dateForm), clickables:discAndTranNo, pdfData}
                break;
            case 'transaction-view':
                result = getTransactionsListing({result, transProcessor, viewTransId, keysTranDetails, reportName, pdfData, getHeadersTitle, moreDocHeader, transactionsDetails, dateForm, user});
                break;
            
            //Personal Account Balances
            case 'personal-ledgers-customers-balances':
                pdfData.reportRowKeys = keysPersonalBalances;
                pdfData.noFmtCols = [3];
                let ledgersCus = transProcessor.processTransactions(dateForm?.startDate, dateForm?.endDate);
                ledgersCus = ledgersCus.customersLedger;

                const cusBalance = getSubAcctBalances(ledgersCus);
                const cusBal = clickedHeader.name? sortTableData([...cusBalance], clickedHeader.name) : cusBalance;

                result = {name:reportName, date, title:"Customers Balances", rowKeysShow:keysPersonalBalances, rowHeaders:getHeadersTitle(keysPersonalBalances), clickables, rows:cusBal,  pdfData}
                break;
             case 'personal-ledgers-vendors-balances':
                    pdfData.reportRowKeys = keysPersonalBalances;
                    pdfData.noFmtCols = [3];
                    let ledgersVed = transProcessor.processTransactions(dateForm?.startDate, dateForm?.endDate);
                    ledgersVed = ledgersVed.vendorsLedger;
                    //console.log(ledgersVed)
                    const vedBalance = getSubAcctBalances(ledgersVed);
                    const orderBy = clickedHeader.name === "closingBal"? "ASC" : "";
                    const vedBal = clickedHeader.name? sortTableData([...vedBalance], clickedHeader.name, orderBy) : vedBalance;
                    result = {name:reportName, date, title:"Vendors Balances", rowKeysShow:keysPersonalBalances, rowHeaders:getHeadersTitle(keysPersonalBalances), clickables, rows:vedBal,  pdfData}
                    break;

                case 'personal-ledgers-products-balances':
                    pdfData.reportRowKeys = keysPersonalBalances;
                    pdfData.noFmtCols = [3];
                    let ledgersProd = transProcessor.processTransactions(dateForm?.startDate, dateForm?.endDate);
                    ledgersProd = ledgersProd.productsLedger;
                    //console.log(ledgersProd)
                    const prodBalance = getSubAcctBalances(ledgersProd);
                    const prodBal = clickedHeader.name? sortTableData([...prodBalance], clickedHeader.name) : prodBalance;

                    result = {name:reportName, date, title:"Products Balances", rowKeysShow:keysPersonalBalances, rowHeaders:getHeadersTitle(keysPersonalBalances), clickables, rows:prodBal,  pdfData}
                break;

            //Personal accounts Listing
            case 'account-list-customers':
                pdfData.reportRowKeys = keysPersonalAcct;
                pdfData.noFmtCols = [];
                pdfData.tableColsWch = ["", "", "", "", "",  20, "", "", "",  "","",  "",];
                pdfData.tableColsFSize= 6;
                pdfData.tableHeaderFSize=6,

                result = {name:reportName, date, title:"Customers List", rowKeysShow:keysPersonalAcct, rowHeaders:getHeadersTitle(keysPersonalAcct), rows:customersStd, pdfData}
                break;
            case 'account-list-vendors':
                pdfData.reportRowKeys = keysPersonalAcct;
                pdfData.noFmtCols = [];
                pdfData.tableColsWch = ["", "", "", "", "",  20, "", "", "",  "","",  "",];
                pdfData.tableColsFSize= 6;
                pdfData.tableHeaderFSize=6,
                result = {name:reportName, date, title:"Vendors List", rowKeysShow:keysPersonalAcct, rowHeaders:getHeadersTitle(keysPersonalAcct), rows:vendorsStd, pdfData}
                break;
            case 'account-list-products':
                pdfData.reportRowKeys = keysProductsAcct;
                pdfData.noFmtCols = [];
                pdfData.tableColsWch = [];
                result = {name:reportName, title:"Products List", rowKeysShow:keysProductsAcct, rowHeaders:getHeadersTitle(keysProductsAcct), rows:productsStd, pdfData}
                break;
            default:
                result = {name:'trial-balance', date, title:'Trial Balance', rowKeysShow:keysTB, rowHeaders:getHeadersTitle(keysTB), rows:rowsTb, pdfData}
                break;
        }
    
    return result
}



function getSubAcctBalances(ledgers){      
    //console.log(ledgers) 
    const clickableCells = {nameClassName:'cursor-pointer hover:text-[blue] active:text-blue-400', accountCodeClassName:'cursor-pointer hover:text-[blue] active:text-blue-400',  clickables:['accountCode', 'name']};        
    const accountCodes = Object.keys(ledgers);
    const rows = []; let totalBal = 0;
    for (let i = 0; i < accountCodes.length; i++) {
        const acctCode = accountCodes[i];
        const ledger = ledgers[acctCode];
        totalBal += parseFloat(ledger?.closingBal) || 0;
        rows.push({...ledger, accountCode:acctCode, ...clickableCells});
    }
    rows.push({accountCode:"Total", closingBal:totalBal});
    return rows;
}

