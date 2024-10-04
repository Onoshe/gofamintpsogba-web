

export function calculateOpeningBalances(ledger) {
    for (let accountCode in ledger) {
      let account = ledger[accountCode];
      account.openingBal = account.trans.reduce((sum, transaction) => {
        // Assuming transactionDate is a Date object or can be compared chronologically
        return sum + (new Date(transaction.transactionDate) < new Date() ? parseFloat(transaction.amount) : 0);
      }, 0);
    }
}


export function segmentBalancesToDrCr(ledger, bal, transTotal, type){
    for (let accountCode in ledger){
      let account = ledger[accountCode];
      if(type === "trans"){
          const trans = account.trans;
          segmentArrayBalancesToDrCr(trans, bal, transTotal);
      }else{
          if(account[bal] < 0){
              account.credit = Math.abs(account[bal] || 0);
              account.closing = "CR";
              transTotal.debit += Math.abs(account[bal]);
          }else{
              account.debit = Math.abs(account[bal] || 0);
              account.closing = "DR";
              transTotal.credit += Math.abs(account[bal]);
          }
          transTotal.net += account[bal];
      }      
    }
}


export function segmentArrayBalancesToDrCr(ledgersArr, bal, transTotal){
    //Cum balances is calculated on each ledgers in GL. This include control ledgers also
    let balance = 0;
    for (let i = 0; i < ledgersArr.length; i++){
      let account = ledgersArr[i];

      if(account[bal] < 0){
        account.credit = Math.abs(account[bal] || 0);
        transTotal.debit += Math.abs(account[bal]);
      }else{
        account.debit = Math.abs(account[bal] || 0);
        transTotal.credit += Math.abs(account[bal]);
      }
      transTotal.net += account[bal];
      balance += parseFloat(account[bal]) || 0;
      account.balance = balance;
    }
}


export function calculateCumBalanceArray(code, name, trans, pushInit){
    //Calculate cum balances for individual ledgers
    const updatedTrans = [];
      const space = {transactionDate:'', description:'',};
      const ledgerName = {transactionDate:code, description:name, classNameTD:'font-bold whitespace-nowrap'};
      if(pushInit){
        updatedTrans.push(space);
        updatedTrans.push(ledgerName);
      }
      
      
    let balance = 0;
    let quantBalance = 0;
    for (let i = 0; i < trans.length; i++) {
      const tran = trans[i];
      let amnt = tran.amount? parseFloat(tran.amount) : 0;
      let qty = parseFloat(tran?.quantity) || 0;
      balance += amnt;
      quantBalance += qty;
      updatedTrans.push({...tran, balance, pUnitCost:amnt/qty, quantBalance});
    }
    return updatedTrans
}