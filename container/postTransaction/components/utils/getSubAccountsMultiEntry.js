import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";


function getSubAccountsMultiEntry(accountCode, chartOfAccounts, personalAccts, products) {
    let subAccts = [{id:0, accountCode:'', accountName:'--No Sub Acct--', selectable:true}];
   //console.log(personalAccts)
   //return
   if(parseInt(accountCode)){
        const coa = chartOfAccounts?.find(dt=> parseInt(dt.accountCode) === parseInt(accountCode));
        //console.log(coa)
        if(coa?.accountCode){
            const {typeName} = coa;
            const coaStr = {
                "accountReceivableControl":personalAccts.customers,
                "accountPayableControl":personalAccts.vendors,
                "inventoryControl":products
            };
            subAccts = coaStr[typeName];
        }
  }

  if(subAccts?.accountCode){
    sortArrayByKey(subAccts, 'accountCode');
  }

  return subAccts;
}

export {getSubAccountsMultiEntry}