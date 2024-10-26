import { validateMainAndSubAcct } from "@/lib/validation/validateMainAndSubAcct";
import { validateDate } from "../../../../../lib/validation/validateDate";
import { getLinkFetchTableWithConds } from "@/lib/apiRequest/urlLinks";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { capitalizeFirstChar } from "@/lib/capitalize/capitalizeString";



export const validateProductSale = async (forms, controlAcctsCode, activeTab, user)=> {
   const {receivables, payables, inventoryControl, inventoryAdj} = controlAcctsCode;
   const controlAcctsArr = [parseInt(receivables), parseInt(payables), parseInt(inventoryControl)];
   
   const coaUrl = getLinkFetchTableWithConds({table:user.companyId+'_chartofaccount', conds:'deleted', values:'0'});
   const coa = await getRequest(coaUrl);
   const chartOfAccounts = coa.data;

   const customersUrl = getLinkFetchTableWithConds({table:user.companyId+'_customers', conds:'deleted', values:'0'});
   const customersFtch = await getRequest(customersUrl);
   const customers = customersFtch.data;

   const vendorsUrl = getLinkFetchTableWithConds({table:user.companyId+'_vendors', conds:'deleted', values:'0'});
   const vendorsFtch = await getRequest(vendorsUrl);
   const vendors = vendorsFtch.data;

   const productsUrl = getLinkFetchTableWithConds({table:user.companyId+'_products', conds:'deleted', values:'0'});
   const productsFtch = await getRequest(productsUrl);
   const products = productsFtch.data;
  
   const mainKeys = ["date", "description", "reference", "accountCodeDr", "accountCodeCr", "subCodeDr", "subCodeCr", "quantityDr", 
        "amount", "accountCodeProduct","subCodeProduct", "quantityProduct", "accountCodeCOS"];
   //For upload
   if(forms.length > 1){
     const row = forms[0];
     const rowKeys = Object.keys(row);
     for (let j = 0; j < mainKeys.length; j++) {
       const key = mainKeys[j];
       if(!rowKeys.includes(key)){
         return {
           error: true,
           errorType: 'USE_MSG',
           rowIndex: j,
           key:key,
           title:capitalizeFirstChar(key)+' column is missing in the table!',
         };
       }
       const rowKey = rowKeys[j];
       if(!mainKeys.includes(rowKey)){
         return {
           error: true,
           errorType: 'USE_MSG',
           rowIndex: j,
           key:key,
           title:capitalizeFirstChar(key)+' column is not recognised!',
         };
       }
     } 
   }

   for (let i = 0; i < forms.length; i++) {
    const form = forms[i];
 
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
      //const i = 1;

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

          //Validate subCode
          const acct = chartOfAccounts.find((dt)=> dt.accountCode == accountCodeDr);
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

       const maxValRes =  validateMainAndSubAcct({debitAccount:accountCodeDr, debitSub:subCodeDr, creditAccount:accountCodeCr, creditSub:subCodeCr, i, 
        chartOfAccounts, controlAcctsCode, customers, vendors, products});
      if(maxValRes.error){
        return maxValRes
      }
    }  
    
    return { error: false , forms};
  }
  