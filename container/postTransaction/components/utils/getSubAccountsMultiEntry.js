import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";


function getSubAccountsMultiEntry(accountCode, chartOfAccounts, personalAccts, products) {
    let subAccts = [{id:0, accountCode:'', accountName:'--No Sub Acct--', selectable:true}];
   //console.log(personalAccts)
   //return
   if(parseInt(accountCode)){
        const coa = chartOfAccounts?.find(dt=> dt.accountCode == accountCode);
        //console.log(coa)
        if(coa?.accountCode){
            const {typeName} = coa;
            const customersSorted = [...personalAccts.customers];
            const vendorsSorted = [...personalAccts.vendors];
            const productsSorted = [...products];
            sortArrayByKey(customersSorted, 'accountCode');
            sortArrayByKey(vendorsSorted, 'accountCode');
            sortArrayByKey(productsSorted, 'productCode');

            const coaStr = {
                "accountReceivableControl":customersSorted,
                "accountPayableControl":vendorsSorted,
                "inventoryControl":productsSorted
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