import { validateCOACode } from "./validateCOACode";
import { validateDate } from "./validateDate";

//controlAcctsCode:{retainedEarnings:321, receivables:142, payables:232, inventory:152},
const keys = ["date", "description", "debitAccount", "creditAccount", "debitSub", "creditSub", "reference",  "amount"]; //"dueDate",
const requiredFields = ["date", "description", "debitAccount", "creditAccount", "amount"];

function validateTransactions(forms, chartOfAccounts, personalAccounts, controlAcctsCode, formType) {
   const {customersList, vendorsList} = personalAccounts;
   const {receivables, payables, inventoryControl} = controlAcctsCode;
   const vedsPref = 'V';
   const cusPref = "C";

    const updatedForms = forms;

    if(!updatedForms?.length) return {
      error: true,
      errorType: 'NO_DATA',
      rowIndex: "",
    };

    if(formType === "UPLOAD"){
     //Check form keys if valid- Invalid key
     const formKeys = Object.keys(updatedForms[0]);
     for (let i = 0; i < formKeys.length; i++) {
     const key = formKeys[i];
       if(!keys.includes(key)) 
         return {
           error: true,
           errorType: 'INVALID_KEY',
           indexRow:'',
           key,
         };
      }
        //Check form keys if have complete keys
        for (let k = 0; k < keys.length; k++) {
        const key = keys[k];
          if(!formKeys.includes(key)) 
            return {
              error: true,
              errorType: 'REQUIRED_KEY',
              indexRow:'',
              key,
            };
        }
    }
    
    for (let i = 0; i < updatedForms.length; i++) {
      const form = updatedForms[i];
      let {
        date,
        description,
        debitAccount,
        creditAccount,
        debitSub,
        creditSub,
        reference,
        amount,
      } = form;

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

      //Assign typeCode and typeName to debitAccount & creditAccount
      let coaStrDebit = {};
      let coaStrCredit = {};
      if(debitAccount){
        const acct = chartOfAccounts.find((dt)=> dt.accountCode == debitAccount);
        coaStrDebit = {typeCode: acct?.typeCode, typeName:acct?.typeName};
      }
      if(creditAccount){
        const acct = chartOfAccounts.find((dt)=> dt.accountCode == creditAccount);
        coaStrCredit = {typeCode: acct?.typeCode, typeName:acct?.typeName};
      }

      //Check if Non-Control account has a sub Account. 
      if(debitAccount && debitSub){
          const acct = chartOfAccounts.find((dt)=> dt.accountCode == debitAccount);
          if(![parseInt(receivables), parseInt(payables)].includes(parseInt(acct?.typeCode))){
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
        const acct = chartOfAccounts.find((dt)=> dt.accountCode == creditAccount);
        //console.log([receivables, payables, acct, creditSub])
        if(![parseInt(receivables), parseInt(payables)].includes(parseInt(acct?.typeCode))){
          return {
            error: true,
            errorType: 'NO_VALUE',
            rowIndex: i,
            key:'creditSub',
            title:'Credit Sub'
          };
        }   
      }
      
      // Check if description is empty
      if (!description) {
        return {
          error: true,
          errorType: 'EMPTY_VALUE',
          rowIndex: i,
          key:description,
          title:'Description'
        };
      }

      // Check if date is valid
      if(date){
        const valDate = validateDate(date);
        if (valDate.error) {
          return {
            error: true,
            errorType: 'FORMAT',
            rowIndex: i,
            key:'date',
          };
        }else{
          form.date = valDate.date
        }
      }else{
        return {
          error: true,
          errorType: 'FORMAT',
          rowIndex: i,
          key:'date',
        };
      }

       // Check if negative amount entered
      // const regPattern = '^\d+(\.\d{2})?$'; // Escaping backslashes in the string
       //const reg = new RegExp(regPattern);
       if (!amount || amount <= 0 || isNaN(parseFloat(amount))) {
        return {
          error: true,
          errorType: 'DATA_TYPE_',
          rowIndex: i,
          key:amount,
          title:'Amount'
        };
       }else{
        form.amount = parseFloat(amount);
       }
      
      //DebitAccount and CreditAccount MUST not be empty. And If debitAccount or creditAccount is a control account, subAcct must not be empty
      if (debitAccount && creditAccount){
        if(debitAccount && [parseInt(receivables), parseInt(payables)].includes(parseInt(coaStrDebit.typeCode)) && !debitSub){
    
        }
        
      }else{
        return {
          error: true,
          rowIndex: i,
          errorType: 'EMPTY_VALUE',
          title:'Debit or Credit Account',
          key:"debitAccount or creditAccount"
        };
      }
      
      // Check if debit and credit accounts exist in Chart of Accounts
      if (
        !chartOfAccounts.some((account) => account.accountCode === debitAccount) ||
        !chartOfAccounts.some((account) => account.accountCode === creditAccount)
      ) {
        return {
          error: true,
          errorType: 'VALUE_INVALID_',
          rowIndex: i,
          title:'Debit or Credit account code',
          key:"debitAccount or creditAccount"
        };
      }
      
      //debitAccount or creditAccount should not ne an InventoryControl account. This can happen on posting upload
      const coaAcctDr = chartOfAccounts.find(acct => acct.accountCode == debitAccount);
      const coaAcctCr = chartOfAccounts.find(acct => acct.accountCode == creditAccount);
      //console.log(coaAcct, debitSub)
      if((coaAcctDr?.accountCode && coaAcctDr?.typeCode == inventoryControl) ||
          (coaAcctCr?.accountCode && coaAcctCr?.typeCode == inventoryControl)){
          return {
            error: true,
            errorType: 'INVENT_ERROR',
            rowIndex: i,
            title:'Inventory control account error',
            key:"accountCode"
          };
        }
      
             
      
      // Check if debitSub exists in CustomersList OR creditSub exists in VendorsList
      if(debitSub && debitAccount) {
        form.debitSub = debitSub.toString().toUpperCase();
        //If debitSub, checking if debitAccount is Customer or Vendor
        const coaAcct = chartOfAccounts.find(acct => acct.accountCode == debitAccount);
        //console.log(coaAcct, debitSub)
        if(coaAcct?.accountCode){
          //Found account is a ReceivableControl account and checking if debitSub is an existing Customer  
          if(coaAcct?.typeCode == receivables){
            const foundCus = customersList?.find(acct => acct.accountCode == form.debitSub);
            if(!foundCus?.accountCode){
              return {
                error: true,
                errorType: 'VALUE_INVALID_',
                rowIndex: i,
                title:'Debit sub account code',
                key:"debitSub"
              };
            }
          }
          //Found account is a Payable account and checking if debitSub is a Vendor code  
          if(coaAcct?.typeCode == payables){
            const foundVed = vendorsList?.find(acct => acct.accountCode == form.debitSub);
            if(!foundVed?.accountCode){
              return {
                error: true,
                errorType: 'VALUE_INVALID_',
                rowIndex: i,
                title:'Debit sub account code',
                key:"debitSub"
              };
            }
          }
          
        }
      }else if(creditSub && creditAccount) {
        form.creditSub = creditSub.toString().toUpperCase();
        //If debitSub, checking if debitAccount is Customer or Vendor
        const coaAcct = chartOfAccounts.find(acct => acct.accountCode == creditAccount);
        //console.log(coaAcct, debitSub)
        if(coaAcct?.accountCode){
          //Found account is a ReceivableControl account and checking if debitSub is an existing Customer  
          if(coaAcct?.typeCode == receivables){
            const foundCus = customersList?.find(acct => acct.accountCode == form.creditSub);
            if(!foundCus?.accountCode){
              return {
                error: true,
                errorType: 'VALUE_INVALID_',
                rowIndex: i,
                title:'Credit sub account code',
                key:"creditSub"
              };
            }
          }
          //Found account is a Payable account and checking if debitSub is a Vendor code  
          if(coaAcct?.typeCode == payables){
            const foundVed = vendorsList?.find(acct => acct.accountCode == form.creditSub);
            if(!foundVed?.accountCode){
              return {
                error: true,
                errorType: 'VALUE_INVALID_',
                rowIndex: i,
                title:'Credit sub account code',
                key:'creditSub'
              };
            }
          }
          
        }
      }

    }
    
    

    return { error: false , updatedForms};
  }
  
export {validateTransactions}

/*----------------------RULES-------------------------------
 

************************************************************/