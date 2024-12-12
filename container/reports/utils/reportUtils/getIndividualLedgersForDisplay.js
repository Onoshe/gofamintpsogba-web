import { getLedgerMonthlySummary } from "./moreFunctions/geLedgerMonthlySummary";
import { getHeadersTitle } from "../ledgers/getHeaders";


export const keysGLProducts = ['transactionDate', 'description', 'transactionNo', 'documentNo', 'quantity', 'quantBalance', 'reference', 'debit', 'credit', 'balance'];
export const keysPersonalAcct =  ['title', 'accountCode', 'lastname', 'firstname', 'phoneNo', 'email', 'position', 'formNo', 'companyName', 'companyPhoneNo', 'companyEmail', 'registeredDate'];
export const keysProductsAcct =  ['productCode', 'productName', 'description', 'category'];
export const keysTransListing = ['edit', 'view', 'transactionDate', 'transactionNo', 'description', 'debitAccount', 'creditAccount', 'voucher', 'reference', 'postingPlat', 'amount'];
export const keysTranDetails = ['particulars', 'debit', 'credit'];
export const keysMonthlySum = ["month", "debit", "credit", "balance"];

 
 //For individual ledger account. Individual General Ledger, Customers Ledger, Vendors Ledger & Products Ledger
 export const getIndividualLedgersForDisplay =({transProcessor, subReports, rows, selLedgerCode, dateForm, chartOfAccounts, monthlyQuery, products, vendors, customers})=>{
    let result = {};
    const subTitle = monthlyQuery? "Monthly Summary" : ""
    let moreDocHeader = monthlyQuery? [[subTitle]] : []; //For pdf header
    const pdfDataFullData = {
        reportRowKeys:keysGLProducts,
        noFmtCols:[10, 11, 12], // Number format columns 1234567 => 1,234,567
        headerFSize:[14],
        tableColsWch:[15, 30, "", "", "", "", "", "", "", "","", ""], //Empty is auto
        tableColsFSize:6,
        tablePlain:[],
        footerArr:[],
        tableHeaderFSize:11,
    }
    const pdfDataMonthlySum = {
        reportRowKeys:keysMonthlySum,
        noFmtCols:[2, 3, 4],
        headerFSize:[14],
        tableColsWch:[], //Empty is auto
    }
    const pdfData = monthlyQuery? pdfDataMonthlySum : pdfDataFullData;
    let rowKeysShow = monthlyQuery? keysMonthlySum : keysGLProducts;
    const clickables = ['accountCode', 'name'];
   
    switch (subReports[0]){
        case 'gl':
            const monthlySum = getLedgerMonthlySummary(rows, dateForm);
            let rowsArr = rows;
            const genLedgerName = chartOfAccounts?.find(dt=> dt.accountCode == selLedgerCode)?.accountName; //rows?.find(dt=> dt.accountName)?.accountName;
            const title = `General Ledger: ${selLedgerCode} ${genLedgerName}`;
            const rowStyle = {classNameTD:'hover:text-blue-700 cursor-pointer hover:underline', clickables:"ALL"};
            rowsArr = rowsArr.map((dt, i)=> {return i != 0? {...dt, ...rowStyle} : dt}) 
            let rowsGl = monthlyQuery? monthlySum : rowsArr;
            //const clickables = "ALL";
            //console.log(rowsGl, rowKeysShowGl, monthlyQuery)
            result = {name:subReports[0], title, rowKeysShow, rowHeaders:getHeadersTitle(rowKeysShow), rows:rowsGl, subTitle,moreDocHeader, clickables:"ALL", pdfData}
            break;
        case 'customers':
            let rowsCus = transProcessor.getPersonalAccounts('customersLedger', dateForm)[selLedgerCode]?.trans || [];
            //console.log(rowsCus, )
            let cusLedgerName = rowsCus?.find(dt=> dt.accountCodeSubName)?.accountCodeSubName;
            cusLedgerName = cusLedgerName? cusLedgerName : rowsCus?.find(dt=> dt.accountName)?.accountName;
            const titleCus = `Customer Ledger: ${selLedgerCode} ${cusLedgerName}`;
            rowsCus = monthlyQuery? getLedgerMonthlySummary(rowsCus, dateForm) : rowsCus;
            result = {name:subReports[0], title:titleCus, rowKeysShow, rowHeaders:getHeadersTitle(rowKeysShow), rows:rowsCus, subTitle,moreDocHeader, clickables,clickables:"ALL", pdfData}
            break;
        case 'vendors':
            let rowsVed = transProcessor.getPersonalAccounts('vendorsLedger', dateForm)[selLedgerCode]?.trans || [];
            let vedLedgerName = rowsVed?.find(dt=> dt.accountCodeSubName)?.accountCodeSubName;
            vedLedgerName = vedLedgerName? vedLedgerName : rowsVed?.find(dt=> dt.accountName)?.accountName;
            const titleVed = `Vandor Ledger: ${selLedgerCode} ${vedLedgerName}`;
            rowsVed = monthlyQuery? getLedgerMonthlySummary(rowsVed, dateForm) : rowsVed;
            result = {name:subReports[0], title:titleVed, rowKeysShow, rowHeaders:getHeadersTitle(rowKeysShow), rows:rowsVed, subTitle,moreDocHeader, clickables,clickables:"ALL", pdfData}
            break;
        case 'products':
            let rowsPro = transProcessor.getPersonalAccounts('productsLedger', dateForm)[selLedgerCode]?.trans || [];
            let proLedgerName = products?.find(dt=> dt.productCode === selLedgerCode)?.productName;
            const titlePro = `Product Ledger: ${selLedgerCode} ${proLedgerName}`;
            rowsPro = monthlyQuery? getLedgerMonthlySummary(rowsPro, dateForm) : rowsPro;
            result = {name:subReports[0], title:titlePro, rowKeysShow, rowHeaders:getHeadersTitle(rowKeysShow), rows:rowsPro, subTitle,moreDocHeader, clickables:"ALL",  pdfData}
            break;
    
        default:
            result = {rowKeysShow:keysGL, rowHeaders:getHeadersTitle(keysGL), rows,subTitle,moreDocHeader, pdfData}
            break;
    }
    //console.log(result)

return result
}

