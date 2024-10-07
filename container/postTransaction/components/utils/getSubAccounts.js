import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";


function getSubAccounts(accountCode, chartOfAccounts, personalAccts) {
    let subAccts = [{id:0, accountCode:'', accountName:'--No Sub Acct--', selectable:true}];
   
    if(parseInt(accountCode)){
        const coa = chartOfAccounts?.find(dt=> dt.accountCode == accountCode);
        if(coa?.accountCode){
            const {typeName} = coa;
            const coaStr = {
                "accountReceivableControl":personalAccts.customers,
                "accountPayableControl":personalAccts.vendors
            };
            subAccts = coaStr[typeName];
        }
  }

  if(subAccts?.accountCode){
    sortArrayByKey(subAccts, 'accountCode');
  }

  return subAccts;
}

export {getSubAccounts}