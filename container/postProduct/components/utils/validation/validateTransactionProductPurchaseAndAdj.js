import { validateDate } from "@/lib/validation/validateDate";



export function validateTransactionsProductPurchaseAndAdj(form, controlAcctsCode, activeTab, chartOfAccounts) {
   const {receivables, payables, inventoryControl, inventoryAdj} = controlAcctsCode;
   const controlAcctsArr = [parseInt(receivables), parseInt(payables), parseInt(inventoryControl)];
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
      entry1Sel,
      entry2Sel,
      adjustProductChecked
    } = form;
    const i = 1;
    //console.log(form, activeTab)

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

      //Product Purchase
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
        const acct = chartOfAccounts.find((dt)=> dt.accountCode == accountCodeCr);
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

      //Product Adjustment
      if(activeTab === "TAB3") {

        //Validate subCode if accountCode is a control account
        const acctDr = chartOfAccounts.find((dt)=> dt.accountCode == accountCodeDr);
        if(controlAcctsArr.includes(parseInt(acctDr.typeCode)) && !subCodeDr){
          return {
            error: true,
            errorType: 'EMPTY_VALUE_',
            rowIndex: i,
            key:"creditSub",
            title:'Select Sub',
            info:''
          };  
        }
        

        const acctCr = chartOfAccounts.find((dt)=> dt.accountCode == accountCodeCr);
        if(controlAcctsArr.includes(parseInt(acctCr.typeCode)) && !subCodeCr){
          return {
            error: true,
            errorType: 'EMPTY_VALUE_',
            rowIndex: i,
            key:"creditSub",
            title:'Select Sub',
            info:''
          };  
        }
        
        //entry1Sel & entry2Sel check. 1 means debit and 2 is credit. Entry1Sel is inventory selection row
        if(!entry1Sel || entry1Sel == null || entry1Sel == 0){
          return {
            error: true,
            errorType: 'ENTRY1_SEL',
            rowIndex: i,
            key:"accountCode",
            title:'Select account',
            info:''
          };  
        }
        if(!entry2Sel || entry2Sel == null || entry2Sel == 0){
          return {
            error: true,
            errorType: 'ENTRY2_SEL',
            rowIndex: i,
            key:"accountCode",
            title:'Select account',
            info:''
          };  
        }
        if(entry1Sel == entry2Sel){
          return {
            error: true,
            errorType: 'ENTRY2_SEL_SAME',
            rowIndex: i,
            key:"accountCode",
            title:'Select account',
            info:''
          };  
        }
        if(!adjustProductChecked){
          return {
            error: true,
            errorType: 'PROD_ADJ_TYPE',
            rowIndex: i,
            key:"accountCode",
            title:'Select account',
            info:''
          };  
        }


        //......................... TAB 3 .................................
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
       
      //quantity must not be 0 or negative
      if(activeTab !== "TAB3"){
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
      }

    return { error: false , form};
  }
  