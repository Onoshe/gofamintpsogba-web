

export const getLedgerCodesForAcctClass =(chartOfAccounts, coaStructure, classNames)=>{
    const result = {};
    const acctClassList = [];
    for (let i = 0; i < classNames.length; i++) {
        const className = classNames[i];
        const acctClass = coaStructure?.find((dt)=> dt.name === className);
        if(acctClass){acctClassList.push(acctClass)}
    }
    if(acctClassList.length){
        for (let i = 0; i < acctClassList.length; i++) {
            const acctClass = acctClassList[i];
            const {code, name} = acctClass;
            const ledgerClass = chartOfAccounts.filter((dt)=> dt.typeCode == code);
            result[name] = ledgerClass;
        }
    }
    return result
}