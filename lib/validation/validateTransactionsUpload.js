import { chartOfAccounts } from "@/public/data/chartOfAccount";
import { capitalizeFirstCharOnly } from "../capitalize/capitalizeString";
import { isValidDate, validateDate } from "./validateDate";


const keys = ['date', 'debitAccount', 'debitSub', 'creditAccount', 'creditSub', 'description', 'reference', 'amount'];
const requiredFields = ['date', 'description', 'amount'];

function validateAndFormatTransactions(forms, personalAccount, personalAccountType) {
    if(!forms?.length) return {
      error: true,
      errorType: 'NO_DATA',
      rowIndex: "",
      key:'',
    };

    const acctCodes =[];
    // Check if required fields are empty
    for (let i = 0; i < requiredFields.length; i++) {
      const key = requiredFields[i];
      if(!Object.keys(forms[0]).includes(key)) 
        return {
          error: true,
          errorType: 'REQUIRED_KEY',
          rowIndex: i,
          key,
        };
    }

     //Check form keys if valid- Invalid key
    const formKeys = Object.keys(forms[0]);
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

    for (let i = 0; i < forms.length; i++) {
      const form = forms[i]; 
       
      let {
        date,
        debitAccount,
        debitSub,
        creditAccount,
        creditSub,
        description,
        reference,
        amount

      } = form;

    //Check for empty value on required fields
    if(!date || !description || !amount){
      return {
        error: true,
        errorType: 'REQUIRED_VALUE',
        rowIndex: i,
        key:'date, description, amount'

      };
    }
  
      //Check if date and date is valid
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
      }
  

    // Check if debitAccount and creditAccount exist  
      if (debitAccount) {
        if(!chartOfAccounts?.some((acct) => acct?.accountCode === debitAccount)){
          return {
            error: true,
            errorType: 'CODE_NOTEXIST',
            rowIndex: i,
            key:'debitAcount'
          };  
        }    
    }
    if (creditAccount) {
      if(!chartOfAccounts?.some((acct) => acct?.accountCode === creditAccount)){
        return {
          error: true,
          errorType: 'CODE_NOTEXIST',
          rowIndex: i,
          key:'creditAccount'
        };  
      }    
    }


    //If subAccount exist, mainAccount (debitAccount or creditAccount) must exist. Validate subAccount  
    if(debitSub && !debitAccount){
      return {
        error: true,
        errorType: 'REQUIRED_VALUE',
        rowIndex: i,
        key:'debitAccount'
      };          
    }else{
      const coa = chartOfAccounts.find((dt)=> dt.accountCode === debitAccount);
      if(coa?.typeName === "accountPayable"){
        const res = !checkIfCodeExist(vendorsAccount, 'accountCode', debitSub, 'debitAccount', i); 
        if(res.error) return res;
      }
      if(coa?.typeName === "accountReceivable"){
        const res = !checkIfCodeExist(customersAccount, 'accountCode', debitSub, 'debitAccount', i); 
        if(res.error) return res;
      }
      if(coa?.typeName === "inventory"){
        const res = !checkIfCodeExist(inventoryList, 'productCode', debitSub, 'debitAccount', i); 
        if(res.error) return res;
      }
    }

    if(creditSub && !creditAccount){
      return {
        error: true,
        errorType: 'REQUIRED_VALUE',
        rowIndex: i,
        key:'creditAccount'
      };          
    }else{
      const coa = chartOfAccounts.find((dt)=> dt.accountCode === creditAccount);
      if(coa?.typeName === "accountPayable"){
        const res = !checkIfCodeExist(vendorsAccount, 'accountCode', creditSub, 'creditAccount', i); 
        if(res.error) return res;
      }
      if(coa?.typeName === "accountReceivable"){
        const res = !checkIfCodeExist(customersAccount, 'accountCode', creditSub, 'creditAccount', i); 
        if(res.error) return res;
      }
      if(coa?.typeName === "inventory"){
        const res = !checkIfCodeExist(inventoryList, 'productCode', creditSub, 'creditAccount', i); 
        if(res.error) return res;
      }
    }
    
  }
    return { error: false, data:forms};
  }
  
export {validateAndFormatTransactions}


function checkIfCodeExist(parentAccounts, parentCode, childCode, key, i) {
    if(!parentAccounts?.some((acct) => acct[parentCode] === childCode)){
      return {
        error: true,
        errorType: 'CODE_NOTEXIST',
        rowIndex: i,
        key
      };
    }else{
      return {error:false}
    }
}