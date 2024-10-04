import { coaStructure } from "@/public/data/coaStructure";


const expKeys = ['id','accountType', 'typeName', 'accountCode', 'accountName',  'addToDashboard', 'typeCode',  'description'];
const requiredFields = ['accountCode', 'accountName', 'typeCode', 'description'];
const keys = [...requiredFields, 'addToDashboard'];


function validateCOAUploads(forms, chartOfAccounts, coaStructure) {
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
      if(!requiredFields.includes(key)) 
        return {
          error: true,
          errorType: 'INVALID_KEY',
          indexRow:'',
          key,
        };
    }
    //Check if all keys are in the form
    for (let i = 0; i < requiredFields.length; i++) {
      const key = requiredFields[i];
        if(!formKeys.includes(key)) 
          return {
            error: true,
            errorType: 'KEY_VOID',
            indexRow:'',
            key,
          };
      }

    for (let i = 0; i < forms.length; i++) {
      const form = forms[i]; 
      let {
        accountName,
        accountCode,
        typeCode,
        description
        //addToDashboard
      } = form;

    //Check for empty value on required fields
    if(!accountName || !accountCode || !typeCode || !description){
      return {
        error: true,
        errorType: 'REQUIRED_VALUE',
        rowIndex: i,
        key:'accountCode, accountName, typeCode'
      };
    }
    //Check for duplicate accountCode
    if(accountCode || accountCode != undefined || accountCode != ""){
      if(acctCodes.includes(accountCode)){
        return {
          error: true,
          errorType: 'DUPLICATES',
          rowIndex: i,
          key:'accountCode'
        };
      }else{
        acctCodes.push(accountCode);
      }
    }
    
    // Check if accountCode already exist in chartOfAccounts  
      if (chartOfAccounts?.some((acct) => acct?.accountCode == accountCode)) {
        return {
          error: true,
          errorType: 'VALUE_EXIST',
          rowIndex: i,
          key:'accountCode'
        };
      }


      //Validate typeCode coaStructure  
      if (!coaStructure?.some((acct) => acct?.code == typeCode)) {
        return {
          error: true,
          errorType: 'VALUE_INVALID',
          rowIndex: i,
          key:'typeCode'
        };
      }

    
      // Account Code cannot start with zero  
      const accountCodeStr = accountCode.toString();
      if (accountCodeStr[0] == "0") {
        return {
          error: true,
          errorType: 'INVALID_ACCTCODE',
          rowIndex: i,
          key:'accountCode'
        };
      } 

      /*/Validate addToDashboard: Either 1 or 0  
      if (![0, 1, '0', '1'].includes(addToDashboard)) {
        return {
          error: true,
          errorType: 'VALUE_INVALID',
          rowIndex: i,
          key:'addToDashboard'
        };
      }*/
    }

    

    return { error: false, data:forms};
  }
  
export {validateCOAUploads}

/*----------------------RULES-------------------------------
 

************************************************************/