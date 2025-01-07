import { getStartAndEndDate } from "@/lib/dummyData/getStartAndEndDate";
//import {getFinancialStatementForDisplay, getIndividualLedgersForDisplay, getLedgersAndPersonalAcctsForDisplay } from "./getDisplayReportUtils";
import { getFinancialStatementForDisplay } from "./reportUtils/getFinancialStatementForDisplay";
import { getIndividualLedgersForDisplay } from "./reportUtils/getIndividualLedgersForDisplay";
import { getLedgersAndPersonalAcctsForDisplay } from "./reportUtils/getLedgersAndPersonalAcctsForDisplay";
import { getRecordedTransactionsForDisplay } from "./reportUtils/getRecordedTransactionsForDisplay";
import { getAgingReport } from "./others/generateAging";
import { getProductsValuation } from "./reportUtils/getProductsValuation";
import { getReceiptsAndPaymentsForDisplay } from "./reportUtils/getReceiptsAndPaymentsForDisplay";
import { getJournalEntries } from "./reportUtils/getJournalEntries";
import { loanReportIndex } from "../components/loans/loanReportIndex";


export const getDisplayReport =({reportName, pathname, transProcessor, customers, vendors, products, coaStructure, viewTransId, transactionsDetails, ledgerCode, monthlyQuery, 
    dateForm, user, chartOfAccounts, clickedHeader, settings})=>{
    const startDateFmt = new Date(dateForm?.startDate).toDateString();
    const endDateFmt = new Date(dateForm?.endDate).toDateString();
    const date = 'Report from '+startDateFmt+" to "+endDateFmt;
    let result =  {rowKeysShow:['name', 'debit', 'credit', ],title:'Trial Balance', clickables:"ALL", name:'trial-balance', rowHeaders:[{title:'Account Name', name:'name'}, {title:'Debit', name:'debit'},{title:'Credit', name:'credit', date}], 
                    rows:transProcessor.getTrialBalance().values, repDate: dateForm?.endDate? dateForm : getStartAndEndDate()};
    
    //console.log(reportName)
    const searchLeadgers = !reportName || pathname === "/demo/reports" || pathname === "/demo/reports/"; //|| reportName === 'general-ledger-accounts' || reportName === 'customers-ledger-accounts' || reportName ==='vendors-ledger-accounts' || reportName === 'products-ledger-accounts';
    if(searchLeadgers) return result; //For report page
    
    if( (reportName === 'gl' || reportName === 'vendors'|| reportName === 'customers'|| reportName === 'products') && ledgerCode){ 
        //For individual ledger account. Individual General Ledger, Customers Ledger, Vendors Ledger & Products Ledger
        
        const subReports = [reportName, ledgerCode];
        const selLedgerCode = subReports[1];
        let ledgers = transProcessor.processTransactions(dateForm?.startDate, dateForm?.endDate);
        const processedLedgers = ledgers.processedLedgers;
        let rows = processedLedgers[subReports[1]]?.trans || [];
        rows = rows.map((dt)=> {return dt?.balance && !dt.isOB? {...dt, classNameTD:'hover:underline hover:text-[blue] cursor-pointer'} : dt});

        result = getIndividualLedgersForDisplay({transProcessor, subReports, rows,  selLedgerCode, dateForm, user, monthlyQuery, chartOfAccounts, products, vendors, customers});

    }else if (['fs'].includes(reportName.split('-')[0])){ 
        result = getFinancialStatementForDisplay({reportName,  transProcessor, coaStructure, dateForm, user, transactionsDetails});
    }else if (reportName === "receipts-and-payments"){ 
        result = getReceiptsAndPaymentsForDisplay(({dateForm, reportName,  transProcessor, query:viewTransId}));
    }else if (reportName === "recorded-transactions"){ 
        result = getRecordedTransactionsForDisplay(({dateForm, reportName,  transProcessor, query:viewTransId}));
        //console.log(result)
    }else if (reportName === "customers-aging" || reportName === "vendors-aging"){ 
        result = getAgingReport({reportName,  transProcessor, dateForm, settings});
        //console.log(result)
    }else if(reportName === "products-valuation"){
        result = getProductsValuation({reportName,  transProcessor,  dateForm, products, viewTransId});
        //console.log(result)
    }else if(reportName === "journals"){
        result = getJournalEntries({dateForm, reportName,  transProcessor, query:'', clickedHeader})
        //console.log(result)loanReportIndex
    }else if(reportName === "customers-loan"){
        result = loanReportIndex({dateForm, reportName,  transProcessor, query:'', clickedHeader})
        //console.log(result)
    }else{
        result = getLedgersAndPersonalAcctsForDisplay({reportName,  transProcessor, customers, vendors, products, dateForm, transactionsDetails, viewTransId, user, clickedHeader});
    }

    
    if(!result?.date){result.date = date}
    if(!result.moreDocHeader?.length){result.moreDocHeader = []};
    if(!result.acctStmt){result.acctStmt = {}}

    if(result?.noData){
        const rowHeaders = [{name:"name", title:"Name"}, {name:"account", title:"Account"}];
        const rowKeysShow = ["name", "account"];
        const title = "No data Available";
        const rows = [{name:"Data not available"}];
        result = {...result, rowHeaders, rowKeysShow, title, rows};
    }
    //console.log(result);

    return result
};


  