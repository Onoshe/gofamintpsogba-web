import { validateDate } from "../../../../../lib/validation/validateDate";



export function validateTransactionsMultiProductSale(form, controlAcctsCode, activeTab, chartOfAccounts) {
   const {receivables, payables, inventoryControl, inventoryAdj} = controlAcctsCode;

    let {
      date,
      description,
      reference,
      accountCodeDr,
      accountCodeCr,
      subCodeDr,
      subCodeCr,
      quantityDr,
      quantityCr,
      amount,
      accountCodeProduct,
      subCodeProduct,
      quantityProduct,
      accountCodeCOS,
    } = form;
    const i = 1;

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
      //TAB1 validation starts
      if(activeTab === "TAB1") {
        if(!subCodeDr) {  
          return {
              error: true,
              errorType: 'EMPTY_VALUE_',
              rowIndex: i,
              key:'product account',
              title:'Product account',
            };
        }
        if(!quantityDr) {  
          return {
              error: true,
              errorType: 'EMPTY_VALUE_',
              rowIndex: i,
              key:'quantity',
              title:'Quantity',
            };
        }
        //Validate subCode
        const acct = chartOfAccounts.find((dt)=> parseInt(dt.accountCode) == parseInt(accountCodeCr));
        if([parseInt(receivables), parseInt(payables), parseInt(inventoryControl)].includes(parseInt(acct.typeCode)) && !subCodeCr){
          return {
            error: true,
            errorType: 'EMPTY_VALUE_',
            rowIndex: i,
            key:"creditSub",
            title:'Select Sub',
            info:''
          };  
        }
        if(parseInt(inventoryControl) == parseInt(acct.typeCode) && !parseInt(form?.quantityCr || 0)){
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

        //Validate subCode
        const acct = chartOfAccounts.find((dt)=> parseInt(dt.accountCode) == parseInt(accountCodeDr));
        if([parseInt(receivables), parseInt(payables), parseInt(inventoryControl)].includes(parseInt(acct.typeCode)) && !subCodeDr){
          return {
            error: true,
            errorType: 'EMPTY_VALUE_',
            rowIndex: i,
            key:"creditSub",
            title:'Select Sub',
            info:''
          };  
        }
      if(parseInt(inventoryControl) == parseInt(acct.typeCode) && !parseInt(form?.quantityDr || 0)){
        return {
          error: true,
          errorType: 'EMPTY_QUANT_',
          rowIndex: i,
          key:"quantity",
          title:'Quantity',
          info:''
        };  
      }
    


      //Date
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
      
      //Validate Product
      if(!accountCodeProduct) {  
        return {
            error: true,
            errorType: 'EMPTY_VALUE_',
            rowIndex: i,
            key:'accountCode',
            title:'Select account',
          };
      }
      if(!subCodeProduct) {  
        return {
            error: true,
            errorType: 'EMPTY_VALUE_',
            rowIndex: i,
            key:'subCode',
            title:'Product sold',
          };
      }
      if(!quantityProduct) {  
        return {
            error: true,
            errorType: 'EMPTY_VALUE_',
            rowIndex: i,
            key:'quantity',
            title:'Product quantity',
          };
      }

      //Validate COS
      if(!accountCodeCOS) {  
        return {
            error: true,
            errorType: 'EMPTY_VALUE_',
            rowIndex: i,
            key:'accountCodeCOS',
            title:'Cost of Sale account',
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
       
       //Check if accountCode
       if(!accountCodeDr || accountCodeDr == "" || !accountCodeCr || accountCodeCr == ""){
        return {
          error: true,
          errorType: 'EMPTY_VALUE_',
          rowIndex: i,
          key:"accountCode",
          title:'Select account',
          info:''
        };  
      }

      //quantity must not be 0 or negative
      if(form?.quantityDr && (form?.quantityDr <= 0 || form?.quantityDr == '0')){
        return {
          error: true,
          errorType: 'FORMAT_',
          rowIndex: i,
          key:"quantity",
          title:'Quantity',
          info:''
        };
      }
      if(form?.quantityCr && (form?.quantityCr <= 0 || form?.quantityCr == '0')){
        return {
          error: true,
          errorType: 'FORMAT_',
          rowIndex: i,
          key:"quantity",
          title:'Quantity',
          info:''
        };
      }
    

    return { error: false , form};
  }
  