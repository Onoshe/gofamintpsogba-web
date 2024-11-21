import { capitalizeFirstCharOnly } from "../capitalize/capitalizeString";
import { isValidDate, validateDate } from "./validateDate";

//'date', 'debitAccount', 'debitSub', 'creditAccount', 'creditSub', 'description', 'reference', 'amount'
const keys = ["type", "title", "accountCode", "firstname", "lastname", "othernames", "dob", "email", "phoneNo", "residentialAddress", "formNo", "position", "nextContactPersonName", "nextContactPersonPhoneNo", "nextContactPersonEmail", "companyName", "companyEmail", "companyPhoneNo", "companyAddress", "businessType", "region", "country", "state", "zip", "registeredDate", "info", "accountGroup", 'occupation', 'imageLink'];
const requiredFields = ['type', 'title', 'firstname', 'lastname', 'accountCode'];

function validateAndFormatPersonalAcct(forms, personalAccount, personalAccountType) {
    if(!forms?.length) return {
      error: true,
      errorType: 'NO_DATA',
      rowIndex: "",
      key:'',
    };

    const acctCodes =[];
    // Check if required fields are empty
    const formKeys = Object.keys(forms[0]);
    //console.log(formKeys)
    for (let i = 0; i < requiredFields.length; i++) {
      const key = requiredFields[i];
      if(!formKeys.includes(key)) 
        return {
          error: true,
          errorType: 'REQUIRED_KEY',
          rowIndex: i,
          key,
        };
    }

     //Check form keys if valid- Invalid key
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
        type,
        title,
        firstname,
        lastname,
        accountCode,
        dob,
        zip

      } = form;

    //Check for empty value on required fields
    let accountCodeDigit = accountCode?.toString()?.split("-")[1];
      if(!accountCodeDigit || accountCodeDigit === "" || accountCodeDigit === undefined || !parseInt(accountCodeDigit)){
        return {
          error: true,
          errorType: 'FORMAT',
          rowIndex: i,
          key:'accountCode'
        };
      }
      if(!type || type === "" || type === undefined){
        return {
          error: true,
          errorType: 'FORMAT',
          rowIndex: i,
          key:'type'
        };
      }
      if(!title || title === "" || title === undefined){
        return {
          error: true,
          errorType: 'FORMAT',
          rowIndex: i,
          key:'title'
        };
      }
      if(!firstname || firstname === "" || firstname === undefined){
        return {
          error: true,
          errorType: 'FORMAT',
          rowIndex: i,
          key:'firstname'
        };
      }
      if(!lastname || lastname === "" || lastname === undefined){
        return {
          error: true,
          errorType: 'FORMAT',
          rowIndex: i,
          key:'lastname'
        };
      }  

    
    //Check for duplicate accountCode
    if(accountCode || accountCode !==undefined || accountCode !==""){
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
    
    //Validate type: Type is Individual 0r Company
      const typeStr = capitalizeFirstCharOnly(type.trim().toLowerCase());
      if (!['Individual', 'Company'].includes(typeStr)) {
        return {
          error: true,
          errorType: 'FORMAT',
          rowIndex: i,
          key:'type'
        };
    }else{
      form.type = typeStr 
    }

      //Validate type: Type is Individual 0r Company
        const titleStr = capitalizeFirstCharOnly(title.trim().toLowerCase());
        if (!['Mr', 'Mrs', 'Miss', 'Dr'].includes(titleStr)) {
          return {
            error: true,
            errorType: 'FORMAT',
            rowIndex: i,
            key:'title'
          };
      }else{
        form.title = titleStr
      }

      //Check if dob and date is valid
      if(dob){
        const valDate = validateDate(dob);
        if (valDate.error) {
          return {
            error: true,
            errorType: 'FORMAT',
            rowIndex: i,
            key:'dob',
          };
        }else{
          form.dob = valDate.date
        }
      }
    
    //Check if personal account code has prefix: C- CUSTOMERS, V- VENDORS
    if(!['C-', 'V-'].includes(accountCode.slice(0,2))){
        return {
          error: true,
          errorType: 'FORMAT',
          rowIndex: i,
          key:'accountCode'
        };
    }
    if(personalAccountType === 'CUSTOMERS'){
      if(accountCode.slice(0,2) !== 'C-'){
        return {
          error: true,
          errorType: 'FORMAT',
          rowIndex: i,
          key:'accountCode'
        };
      }
    }
    if(personalAccountType === 'VENDORS'){
      if(accountCode.slice(0,2) !== 'V-'){
        return {
          error: true,
          errorType: 'FORMAT',
          rowIndex: i,
          key:'accountCode'
        };
      }
    }

    // Check if accountCode already exist in personalAccount  
    if(personalAccount?.length){
      if (personalAccount?.some((acct) => acct?.accountCode === accountCode)) {
        return {
          error: true,
          errorType: 'VALUE_EXIST',
          rowIndex: i,
          key:'accountCode'
        };
      }
    }
    // If zip code, validate and format  
    if (zip && isNaN(zip)) {
        return {
          error: true,
          errorType: 'DATA_TYPE',
          rowIndex: i,
          key:'zip'
        };
    }
    

    }

    return { error: false, data:forms};
  }
  
export {validateAndFormatPersonalAcct}



/*----------------------RULES-------------------------------
 

************************************************************/