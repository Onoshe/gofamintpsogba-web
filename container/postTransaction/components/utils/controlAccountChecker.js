

export function controlAcctChecker(transSheet, chartOfAccounts, controlAcctsCode){
    //The entry must conresponds with the accountCode to be true. Debit entry for receivableControl and Credit for payableControl
    //Note that this checker will give false if transaction row is debit (debitCredit is 1) and accountCode is payableControl 
    let revControl = {isControlAcct: false, controlAcct:'Receivable', type:'REC', i:0};
    let payControl = {isControlAcct: false, controlAcct:'Payable', type:'PAY', i:0};

    for (let i = 0; i < transSheet.length; i++) {
      const tranSht = transSheet[i];
      chartOfAccounts.find((dt)=> {
        if(parseInt(dt.accountCode) == parseInt(tranSht.accountCode)){ 
           if(controlAcctsCode.receivables == dt.typeCode && tranSht.debitCredit == 1){
             revControl = {isControlAcct:true, controlAcct:'Receivable', type:'REC', i}
           }else if(controlAcctsCode.payables ==dt.typeCode && tranSht.debitCredit == 2){
             payControl = {isControlAcct:true, controlAcct:'Payable', type:'PAY', i}
           }
        }
      });
    }
    return revControl.isControlAcct? revControl : payControl
  }


  //For Post product
  export function payableControlAcctChecker(transSheet, chartOfAccounts, controlAcctsCode, activeTab){
    let controlRes = {show: false, type:'Payable', conType:"PAY"};
    let controlResRec = {show: false, type:'Receivable', conType:""};
    let controlResPay = {show: false, type:'Payable', conType:""};

      const {accountCodeCr, accountCodeDr} = transSheet;
      chartOfAccounts.find((dt)=> {
        if(activeTab === "TAB1"){
          if(parseInt(dt.accountCode) == parseInt(accountCodeCr)){ 
            if(controlAcctsCode.payables ==dt.typeCode){
              controlRes = {show:true, type:'Payable', conType:"PAY"}
            }
          }
        }else if(activeTab === "TAB2"){
          //TAB2- Sales.  Only true if accountCodeDr is controlAccount
          if(parseInt(dt.accountCode) == parseInt(accountCodeDr)){ 
            if(controlAcctsCode.receivables ==dt.typeCode){
              controlRes = {show:true, type:'Receivable', conType:"REC"}
            }
          }else{
            //controlResRec = {show:false, type:'Receivable', conType:""}
          }
        }else{
          if(parseInt(dt.accountCode) == parseInt(accountCodeDr)){ 
            if(controlAcctsCode.receivables ==dt.typeCode){
              controlResRec = {show:true, type:'Receivable', conType:"REC"}
            }
          }
          if(parseInt(dt.accountCode) == parseInt(accountCodeCr)){ 
            if(controlAcctsCode.payables ==dt.typeCode){
              controlResPay = {show:true, type:'Payable', conType:"PAY"}
            }
          }
          //Show Receivable due date if both are true
          controlRes = controlResRec.show? controlResRec : controlResPay
        }
      });
  
    return controlRes
  }



  //Checker during posting
   function controlAcctCheckerForPosting(transSheet, chartOfAccounts, controlAcctsCode, postingType){
    let controlRes = {isTrue: false, controlAcct:''};
   

    if(postingType === "TWOENTRY"){
        chartOfAccounts.find((dt)=> {
          //Search for the chartOfAccount. If found, check if 
          if(parseInt(dt.accountCode) == parseInt(transSheet.debitAccount)){ 
              // typeCode is a receivable controlAccount.
            if(controlAcctsCode.receivables == dt.typeCode){
              controlRes = {isTrue: true, controlAcct:'Receivable'}
            }
          }else if(parseInt(dt.accountCode) == parseInt(transSheet.creditAccount)){ 
            // typeCode is a payable controlAccount.
          if(controlAcctsCode.payables == dt.typeCode){
            controlRes = {isTrue: true, controlAcct:'Payable'}
          }
        }
        });
    }else if(postingType === "MULTIENTRY"){
       
    }

    return controlRes
  }