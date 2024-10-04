

function getPersonalLedgersAccts(ledgerName, prosLedgers){
    //const  prosLedgers = processTransactions();
    const ledgers = {... prosLedgers[ledgerName]};
    const personalLedgers = [];
    let code = ledgerName === "productsLedger"? "productCode" : "accountCode";
    for (code in ledgers) {
      let ledger = ledgers[code];
      const space = {transactionDate:'', description:'',};
      const ledgerName = {transactionDate:code, description:ledger.name, classNameTD:'font-bold whitespace-nowrap'};
      ledger.trans.unshift(ledgerName);
      ledger.trans.unshift(space);
      personalLedgers.push(ledger.trans)
    }
    const result = personalLedgers.flat();
    return result;
  }