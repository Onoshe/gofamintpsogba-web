import { vendorsCode, customersCode } from "./onChangeInput";


function formValidationSingle(forms, chartOfAccounts, customersList, vendorsList, type) {
    
  // Check if total debits agree with total credits amounts 
  const balanceAccount =()=>{
    const summation = forms.reduce((res, el)=>{     
        const getValue = (val)=>{
          return parseFloat(val)? parseFloat(val) : 0;
        }      
        return {...res,
            amountTotal: el.debitCredit === "Credit" || el.debitCredit === "credit"? res.amountTotal - getValue(el.amount) : res.amountTotal + getValue(el.amount),
        }
     },{amountTotal:0,});
     return summation
  }

const acctbalance = balanceAccount();
if (acctbalance.amountTotal !== 0) {
    return {
      error: true,
      errorType: 'ACCOUNT_NOT_BALANCE',
      rowIndex: 0,
    };
  }

      
    /*/ Check if debit and credit accounts have vendor or customer codes, then debitSubAccount and creditSubAccount must not be the same
    if (
      (account.startsWith(customersCode) && account.startsWith(customersCode)) ||
      (account.startsWith(vendorsCode) && account.startsWith(vendorsCode))
    ) {
        if (debitSubAccount === creditSubAccount) {
        return {
            error: true,
            errorType: 'SAME_SUBACCOUNT',
            rowIndex: i,
        };
        }
    }*/

  
  for (let i = 0; i < forms.length; i++) {
      const form = forms[i];
      const {
        description,
        amount,
        account,
        subAccount,
        debitCredit
      } = form;
      
      // Check if negative amount entered
      if (amount < 0) {
        return {
          error: true,
          errorType: 'NEGATIVE_AMOUNT',
          rowIndex: i,
        };
      }

      // Check if description is empty for first row ONLY. Every other rows take date and description from the first row
      if (!description && i === 0) {
        return {
          error: true,
          errorType: 'DESCRIPTION_EMPTY',
          rowIndex: i,
        };
      }
  
      // Check if required fields are empty
      if (
        !amount ||
        !account ||
        (account.startsWith(customersCode) && !subAccount) 
      ) {
        return {
          error: true,
          errorType: 'REQUIRED_FIELD_EMPTY',
          rowIndex: i,
        };
      }
      
      // Check if debit and credit accounts exist in Chart of Accounts
      if (
        !chartOfAccounts.some((acct) => acct.key === account) ||
        !chartOfAccounts.some((acct) => acct.key === account)
      ) {
        return {
          error: true,
          errorType: 'ACCOUNT_NOT_FOUND',
          rowIndex: i,
        };
      }
      
      // Check if debitSubAccount exists in CustomersList
      if (account.startsWith(customersCode) && !customersList.some((customer) => customer.key === subAccount)) {
        return {
          error: true,
          errorType: 'INVALID_DEBIT_SUBACCOUNT',
          rowIndex: i,
        };
      }
  
      // Check if Non-Customer or Non-Vendor Account (Main Account) has subAccount 
      const acctWithClientCode = account?.startsWith(customersCode) || account?.startsWith(vendorsCode);
    
      if(acctWithClientCode){
        //
      }else{
        if(subAccount)
        return {
           error: true,
           errorType: 'NON_CLIENT_WITH_SUBACCOUNT',
           rowIndex: i,
       };
      }

      // Check if creditSubAccount exists in VendorsList
      if (account.startsWith(vendorsCode) && !vendorsList.some((vendor) => vendor.key === subAccount)) {
        return {
          error: true,
          errorType: 'INVALID_CREDIT_SUBACCOUNT',
          rowIndex: i,
        };
      }

    // Check for dublicate accountCodes.
    const excl = "JOURNAL";
    const accountFound = forms.filter((acct)=> acct.account == account);
    if (accountFound?.length > 1) {
        if(!type === excl){
            return {
              error: true,
              errorType: 'DUPLICATE_ACCOUNTS',
              rowIndex: i+1,
            };
        }else{
          //A journal can be pass to reclassify entry with the same mainAccount but different subAccounts
          const accountFoundSub = forms.filter((acct)=> acct?.subAccount == subAccount);
          if(subAccount && (accountFoundSub?.length >1)){
            return {
              error: true,
              errorType: 'DUPLICATE_ACCOUNTS',
              rowIndex: i+1,
            };
          }
        }
     }
    }
  
    return { error: false };
  }
  
export {formValidationSingle}

/*------RULES--------
 



Write a javascript formValidation function that will return validation result based on the following rules:
-description MUST not be empty
    -debitAccount, creditAccount, debitAmount, creditAmount MUST not be empty
    -if debitAccount has either vendorsCode or customersCode, debitSubAccount MUST not be empty
    -if creditAccount has either vendorsCode or customersCode, creditSubAccount MUST not be empty;
    -debitAccount or creditAccount MUST exist in Chart of Account array
    -except where creditAccount and debitAccount both have vendorsCode or customersCode,  debitAccount and creditAccount value MUST not be the same,
    -where creditAccount and debitAccount both have vendorsCode or customersCode, debitSubAccount and creditSubAccount must not be the same
    -debitSubAccount value MUST exist in customersList array key
    -creditSubAccount value MUST exist in vendorsList array key

Scenario:
The returned result should be an object with the following keys: error, rowIndex, errorType.
The error will be true is there's error, errorType will be error type in uppercase and the rowIndex should be the index of the object where the error occured.
The function will receive the following arguments:
1. array of forms. Each form, for example is {description:"Deposit by Me Jones", date:"2023-10-11", debitAccount:"23001-Cash", creditAccount:"31001-Current liability", debitSubAccount:"V-00001-Jones", creditSubAccount"", debitAmount:2500, creditAmount:2500};
  debitAccount and creditAccount values are chart of account which has 5 digits and account name combined.
  VendorsCode are chart of account that the first two digits are 31.
  CustomersCode are chart of account that the first two digits are 23.  
2. Chart of Account array. Each value in the array is of type {key:"", value:""}
3. CustomersList array. Each value in the array is of type {key:"", value:""}
4. VendorsList array. Each value in the array is of type {key:"", value:""}

*/