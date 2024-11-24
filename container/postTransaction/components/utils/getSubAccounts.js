import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";


function getSubAccounts(accountCode, chartOfAccounts, personalAccts) {
    let subAccts = [{id:0, accountCode:'', accountName:'--No Sub Acct--', selectable:true}];

    if(parseInt(accountCode)){
        const coa = chartOfAccounts?.find(dt=> dt.accountCode == accountCode);
        if(coa?.accountCode){
            const {typeName} = coa;
            const customersSorted = [...personalAccts.customers];
            const vendorsSorted = [...personalAccts.vendors];
            sortArrayByKey(customersSorted, 'accountCode');
            sortArrayByKey(vendorsSorted, 'accountCode');
            const coaStr = {
                "accountReceivableControl":customersSorted,
                "accountPayableControl":vendorsSorted
            };
            subAccts = coaStr[typeName];
        }
  }
  //console.log(personalAccts.customers);

  return subAccts;
}

export {getSubAccounts}