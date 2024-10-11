import { calculateCumBalanceArray } from "./calculateBalances";

export function getTrialBalanceAcct(processedLedgers){
     //console.log(processedLedgers)
    //const {processedLedgers} = this.processTransactions();
    let values = Object.values(processedLedgers);
    values = values.map((el)=> {
      return el.name.toUpperCase() == "TOTAL"? el : {...el, classNameTD:'hover:text-blue-700 cursor-pointer hover:underline'}
    })
    const keys = Object.keys(processedLedgers);
    return {keys, values}
};

const clickableCells = {descriptionClassName:'cursor-pointer hover:text-[blue] active:text-blue-400', transactionNoClassName:'cursor-pointer hover:text-[blue] active:text-blue-400',  clickables:['description', 'transactionNo']};
const clickableCellsPersonalAcct = {descriptionClassName:'cursor-pointer hover:text-[blue] active:text-blue-400', accountCodeSubClassName:'cursor-pointer hover:text-[blue] active:text-blue-400',  clickables:['description', 'accountCodeSub']};
export function getGeneralLedgersAcct(processedLedgers){
    //const {processedLedgers} = this.processTransactions();
    const generalLedger = {...processedLedgers};
    const totalAmount = {debit:0, credit:0};
    const generalLedgers = [];
    for (let accountCode in generalLedger) {
      let ledger = generalLedger[accountCode];
      const space = {transactionDate:'', description:'',};
      const ledgerName = {transactionDate:accountCode, description:ledger.name, classNameTD:'font-bold whitespace-nowrap'};
      //ledger?.trans?.length? ledger
      ledger?.trans?.unshift(ledgerName);
      ledger?.trans?.unshift(space);
      const ledgerTrans = ledger?.trans?.map((dt)=> {return dt.transactionNo? {...dt, ...clickableCells} : dt})
      generalLedgers.push(ledgerTrans)
    }
    const result = generalLedgers.flat();
    return result;
  }

export function getPersonalLedgersAccts(ledgerName, prosLedgers, ledgerCode){
    const ledgers = {... prosLedgers[ledgerName]};
    const personalLedgers = [];
    //console.log(prosLedgers)
    let code = ledgerName === "productsLedger"? "productCode" : "accountCode";
    if(ledgerCode && ledgers[ledgerCode]){ //For a particular ledger
        let ledger = ledgers[ledgerCode];
        ledger.trans = ledger?.trans?.map((dt)=> {return dt.transId && dt.typeCode? {...dt, ...clickableCells} : dt})
        const updatedTrans = calculateCumBalanceArray(code, ledger.name, [...ledger.trans], 'pushInit');
        personalLedgers.push(updatedTrans)
    }else{
      for (code in ledgers) {
        let ledger = ledgers[code];
        ledger.trans = ledger.trans.map((dt)=> {return dt.transId && dt.typeCode? {...dt, ...clickableCells} : dt})
        const updatedTrans = calculateCumBalanceArray(code, ledger.name, [...ledger.trans], 'pushInit');
        personalLedgers.push(updatedTrans)
      }
    }
    const result = personalLedgers.flat();
    return result;
  }


 export function getPersonalAcctsList(ledgerName, prosLedgers){
    //Accounting listing for customersLedger, vendorsLedger, productsLedger
    const clickableCells = {classNameTD:'cursor-pointer hover:text-[blue] active:text-blue-400 hover:underline'};
    const ledgers = {... prosLedgers[ledgerName]};
    let code = ledgerName === "productsLedger"? "productCode" : "accountCode";
    for (code in ledgers) {
      let ledger = ledgers[code];
      const updatedTrans = calculateCumBalanceArray(code, ledger.name, [...ledger.trans], false);
      ledger.trans = updatedTrans;
      ledger.trans = ledger.trans.map((dt)=> {return dt.transId && dt.typeCode? {...dt, ...clickableCells} : dt})
    }
    return ledgers
  }
