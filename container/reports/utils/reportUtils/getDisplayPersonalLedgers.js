
export const getDisplayPersonalLedgers =(transProcessor, currentReport, reportDate)=>{
    const report = {ledgerCodes:[], ledgerAccts:[], ledgerTitle:'General Ledger Accounts'}; //Object.keys(processedLedgers);
    //const personalLg = reportName?.split('-');
    //console.log(currentReport.mainReport)
    
    switch (currentReport?.mainReport) {
        case 'CUSTOMERS':
            const cLedgers = transProcessor.getPersonalAccounts('customersLedger', reportDate);
            report.ledgerAccts = cLedgers;
            report.ledgerCodes = Object.keys(cLedgers);
            report.ledgerTitle = "Customers Ledgers"
            break;
    
        case 'VENDORS':
            const vLedgers = transProcessor.getPersonalAccounts('vendorsLedger', reportDate);
            report.ledgerAccts = vLedgers;
            report.ledgerCodes = Object.keys(vLedgers);
            report.ledgerTitle = "Vendors Ledgers"
            break;
        case 'PRODUCTS':
            const pLedgers = transProcessor.getPersonalAccounts('productsLedger', reportDate);
            report.ledgerAccts = pLedgers;
            report.ledgerCodes = Object.keys(pLedgers);
            report.ledgerTitle = "Products Ledgers"
            break;
        case 'TB':
            let mainLedgers = transProcessor.processTransactions(reportDate?.startDate, reportDate?.endDate);
            const processedLedgers = mainLedgers.processedLedgers;
            report.ledgerCodes = Object.keys(processedLedgers);
            report.ledgerAccts = processedLedgers;
            break;

        default:
            let mainLedgersDef = transProcessor.processTransactions(reportDate?.startDate, reportDate?.endDate);
            const processedLedgersDef = mainLedgersDef.processedLedgers;
            report.ledgerCodes = Object.keys(processedLedgersDef);
            report.ledgerAccts = processedLedgersDef;
            break;
    }
    return report
}