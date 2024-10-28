import { validateCOACode } from "./validateCOACode";


export const validateMainAndSubAcct = ({debitAccount, debitSub, creditAccount, creditSub, i, chartOfAccounts, 
    controlAcctsCode, customers=[], vendors=[], products = []})=>{

    const controlAcctsArr = [parseInt(controlAcctsCode.receivables), parseInt(controlAcctsCode.payables), parseInt(controlAcctsCode.inventoryControl)];

    //DebitAccount and CreditAccount MUST not be empty. 
    if (!debitAccount || !creditAccount){
        return {
            error: true,
            rowIndex: i,
            errorType: 'EMPTY_VALUE',
            title:'Debit or Credit Account',
            key:"debitAccount or creditAccount"
        };
    }
    
    const acctDr = chartOfAccounts.find((dt)=> dt.accountCode == debitAccount);
    const acctCr = chartOfAccounts.find((dt)=> dt.accountCode == creditAccount);

    const acctDrType = parseInt(acctDr?.typeCode) == parseInt(controlAcctsCode.receivables)? "REC" :
                       parseInt(acctDr?.typeCode) == parseInt(controlAcctsCode.payables)? "PAY" :
                       parseInt(acctDr?.typeCode) == parseInt(controlAcctsCode.inventoryControl)? "INV" : null;
    const acctCrType = parseInt(acctCr?.typeCode) == parseInt(controlAcctsCode.receivables)? "REC" :
                       parseInt(acctCr?.typeCode) == parseInt(controlAcctsCode.payables)? "PAY" :
                       parseInt(acctCr?.typeCode) == parseInt(controlAcctsCode.inventoryControl)? "INV" : null;

    //Check If debitAccount or creditAccount is a control account, subAcct must not be empty
    if(debitAccount && controlAcctsArr.includes(parseInt(acctDr?.typeCode))){
        if(!debitSub){
            return {
                error: true,
                rowIndex: i,
                errorType: 'EMPTY_VALUE',
                title:'Debit Sub Account',
                key:"debitSub"
            };
        }
    }
    if(creditAccount && controlAcctsArr.includes(parseInt(acctCr?.typeCode))){
        if(!creditSub){
            return {
                error: true,
                rowIndex: i,
                errorType: 'EMPTY_VALUE',
                title:'Credit Sub Account',
                key:"creditSub"
            };
        }
    }

        
    // Check if debit and credit accounts exist in Chart of Accounts
    if (!chartOfAccounts.some((account) => account.accountCode == debitAccount) || !chartOfAccounts.some((account) => account.accountCode == creditAccount)) {
        return {
            error: true,
            errorType: 'VALUE_INVALID_',
            rowIndex: i,
            title:'Debit or Credit account code',
            key:"debitAccount or creditAccount"
        };
    }

    //Validate debitAccount || creditAccount
    if(!validateCOACode(debitAccount)){
        return {
          error: true,
          errorType: 'VALUE_INVALID_',
          rowIndex: i,
          key:'debitAccount',
          title:'Account Code'
        };
      }
      if(!validateCOACode(creditAccount)){
        return {
          error: true,
          errorType: 'VALUE_INVALID_',
          rowIndex: i,
          key:'creditAccount',
          title:'Account Code'
        };
      }  

    //Check if Non-Control account has a sub Account. 
    if(debitAccount && debitSub){
        if(!controlAcctsArr.includes(parseInt(acctDr?.typeCode))){
          return {
            error: true,
            errorType: 'NO_VALUE',
            rowIndex: i,
            key:'debitSub',
            title:'Debit Sub'
          };
        }   
    }
    if(creditAccount && creditSub){
      if(!controlAcctsArr.includes(parseInt(acctCr?.typeCode))){
        return {
          error: true,
          errorType: 'NO_VALUE',
          rowIndex: i,
          key:'creditSub',
          title:'Credit Sub'
        };
      }   
    }

    //Check if subAccount exist in personal Accounts
    if(acctDrType === "REC" && !customers.some((account) => account.accountCode == debitSub)){
        return {
            error: true,
            errorType: 'VALUE_INVALID_',
            rowIndex: i,
            title:'Debit sub account for Cus',
            key:"debitSub"
        };
    }
    if(acctDrType === "PAY" && !vendors.some((account) => account.accountCode == debitSub)){
        return {
            error: true,
            errorType: 'VALUE_INVALID_',
            rowIndex: i,
            title:'Debit sub account for Ved',
            key:"debitSub"
        };
    }
    if(acctDrType === "INV" && !products.some((account) => account.productCode == debitSub)){
        return {
            error: true,
            errorType: 'VALUE_INVALID_',
            rowIndex: i,
            title:'Debit sub account for Inv',
            key:"debitSub"
        };
    }
    if(acctCrType === "REC" && !customers.some((account) => account.accountCode == creditSub)){
        return {
            error: true,
            errorType: 'VALUE_INVALID_',
            rowIndex: i,
            title:'Credit sub account for Cus',
            key:"debitSub"
        };
    }
    if(acctCrType === "PAY" && !vendors.some((account) => account.accountCode == creditSub)){
        return {
            error: true,
            errorType: 'VALUE_INVALID_',
            rowIndex: i,
            title:'Credit sub account for Ved',
            key:"debitSub"
        };
    }
    if(acctCrType === "INV" && !products.some((account) => account.productCode == creditSub)){
        console.log(acctCrType, products, creditSub, acctDr, acctCr)
        return {
            error: true,
            errorType: 'VALUE_INVALID_',
            rowIndex: i,
            title:'Credit sub account for Inv',
            key:"debitSub"
        };
    }


    //If all okay, then return:
    return {
        error: false,
        rowIndex: "",
        errorType: '',
        title:'',
        key:""
    };

}