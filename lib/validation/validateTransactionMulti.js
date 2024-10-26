import { validateCOACode } from "./validateCOACode";
import { validateDate } from "./validateDate";



function validateTransactionsMulti(forms, chartOfAccounts, controlAcctsCode, netAmount) {
   const {receivables, payables, inventory} = controlAcctsCode;
   
    if(!forms?.length) return {
      error: true,
      errorType: 'NO_DATA',
      rowIndex: "",
    };
    
    let {
      date,
      description,
      reference,
    } = forms[0];

    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];
      let {
        accountCode,
        subCode,
        amount,
        debitCredit
      } = form;


      // Validate date, description 
      if (!description) {
        return {
          error: true,
          errorType: 'EMPTY_VALUE_',
          rowIndex: i,
          key:'description',
          title:'Description',
        };
      }
      if(date){
        const valDate = validateDate(date);
        if (valDate.error) {
          return {
            error: true,
            errorType: 'FORMAT_',
            rowIndex: i,
            key:'date',
          };
        }
      }else{
        return {
          error: true,
          errorType: 'FORMAT_',
          rowIndex: i,
          key:'date',
        };
      }
      
      //Validate amount
      if (!amount || amount <= 0 || isNaN(parseFloat(amount))) {
        return {
          error: true,
          errorType: 'DATA_TYPE__',
          rowIndex: i,
          key:amount,
          title:'Amount'
        };
       }else{
        form.amount = parseFloat(amount);
       }
       
      //Check if value for debitCredit
      if(!parseInt(debitCredit)){
        return {
          error: true,
          errorType: 'EMPTY_VALUE_',
          rowIndex: i,
          key:"debitCredit",
          title:'Select Dr/Cr',
          info:''
        };  
      }

       //Check if accountCode
       if(!accountCode || accountCode == ""){
        return {
          error: true,
          errorType: 'EMPTY_VALUE_',
          rowIndex: i,
          key:"accountCode",
          title:'Select account',
          info:''
        };  
      }else{
          const acct = chartOfAccounts.find((dt)=> dt.accountCode == accountCode);
          //console.log(acct, accountCode, chartOfAccounts)
          if([parseInt(receivables), parseInt(payables), parseInt(inventory)].includes(parseInt(acct.typeCode)) && !subCode){
            return {
              error: true,
              errorType: 'EMPTY_VALUE_',
              rowIndex: i,
              key:"debitSub",
              title:'Select Sub',
              info:''
            };  
          }
          if(parseInt(inventory) == parseInt(acct.typeCode) && !form?.quantity){
            return {
              error: true,
              errorType: 'EMPTY_QUANT_',
              rowIndex: i,
              key:"quantity",
              title:'Quantity',
              info:''
            };  
          }  
      } 

       //Validate accountCode
       if(!validateCOACode(accountCode)){
        return {
          error: true,
          errorType: 'VALUE_INVALID_',
          rowIndex: i,
          key:'accountCode',
          title:'Account Code'
        };
      }
      


      if(form?.quantity && (form?.quantity <= 0 || form?.quantity == '0')){
        return {
          error: true,
          errorType: 'FORMAT_',
          rowIndex: i,
          key:"quantity",
          title:'Quantity',
          info:''
        };
      }

      if(netAmount != 0 || netAmount != '0'){
        return {
          error: true,
          errorType: 'NOT_BALANCE',
          rowIndex: i,
          key:"debitSub",
          title:'Dr Sub',
          info:''
        };
      }
    }

    return { error: false , forms};
  }
  
export {validateTransactionsMulti}