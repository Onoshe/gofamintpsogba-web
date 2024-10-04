

export const handleSelectedLedger =({ledgers, ledgerCode, router, setShowLedgers, companyId, currentReport})=>{
    const processedLedgers = ledgers.processedLedgers;
    const rows = processedLedgers[ledgerCode].trans;  
    setShowLedgers(false);
    const route = `/${companyId}/reports/${currentReport.mainReport.toLocaleLowerCase()}-${rows[0].accountCode}`;
    //return console.log(route);
    router.push(route);
}


export const getPdfHeader =({moreDocHeader, clientAccount, title, date})=>{
  let header =  moreDocHeader?.length? [[clientAccount?.companyName], [title], [date],  ...moreDocHeader] : 
    [[clientAccount?.companyName], [title], [date], ['']];

    return header
}