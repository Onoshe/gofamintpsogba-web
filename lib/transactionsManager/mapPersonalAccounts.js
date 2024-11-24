import { sortArrayByKey } from "../sort/sortArrayByKey";

const mapPersonalAccounts =(customers, vendors)=>{
  const personalAccts = {
    customers:[{id:'', accountCode:'', title:'--Select--', accountName:'--Select--', firstname:'', lastname:'', selectable:true}], 
    vendors:[{id:'', accountCode:'', title:'--Select--', accountName:'--Select--', firstname:'', lastname:'', selectable:true}]
  };
    const customersSorted = [...customers];
    const vendorsSorted = [...vendors];

    sortArrayByKey(customersSorted, 'accountCode');
    sortArrayByKey(vendorsSorted, 'accountCode');

    customersSorted?.forEach(acct => {
      const {id, accountCode, lastname, firstname, accountGroup} = acct;
      personalAccts.customers.push({id, accountCode, accountName:accountCode+" "+lastname+" "+firstname+": "+accountGroup, type:'CUSTOMERS', selectable:true})
    });

    vendorsSorted?.forEach(acct => {
      const {id, accountCode, lastname, firstname, accountGroup} = acct;
      personalAccts.vendors.push({id, accountCode, accountName:accountCode+" "+lastname+" "+firstname+": "+accountGroup, type:'VENDORS', selectable:true})
    });  

    return personalAccts
  }


  export {mapPersonalAccounts}