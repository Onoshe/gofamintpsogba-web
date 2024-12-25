import { capitalizeFirstCharOnly } from "@/lib/capitalize/capitalizeString";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdOutlineBalance,  MdAccountBalance, MdSwitchAccount, MdAccountBox, MdInventory, MdOutlineAccountBalanceWallet } from "react-icons/md";



const ACCOUNTANT = {name: 'ACCOUNTANT', title:'Accountant', shortTitle:'Acct', tabName:'Accountant', icon: <MdAccountBox />};
const CUSTOMERS = {name: 'CUSTOMERS', title:'Customers', shortTitle:'Customers', tabName:'Customers', icon: <BsFillCartPlusFill/>};
const VENDORS = {name: 'VENDORS', title:'Vendors', shortTitle:'Vendors', tabName:'Vendors', icon: <MdOutlineAccountBalanceWallet/>};
const PRODUCTS = {name: 'PRODUCTS', title:'Products', shortTitle:'Products', tabName:'Products', icon: <MdInventory/>};

const schemas = {
  ACCOUNTANT: {...ACCOUNTANT},
  CUSTOMERS: {...CUSTOMERS},
  VENDORS:{...VENDORS},
  PRODUCTS:{...PRODUCTS}
};


const getHeaders =()=>{
    return {...schemas}
}

const accountant = [
  {name:'trial-balance', title:'Trial Balance', mainReport:'TB', reportGroup:'Accountant'},
  {name:'general-ledger', title:'General Ledger', mainReport:'GL', reportGroup:'Accountant'},
  {name:'general-ledger-accounts', title:'General Ledger Accounts', mainReport:'GL', reportGroup:'Accountant'},
  //{name:'journals-report', title:'Journals Report', mainReport:'JOURNALS', reportGroup:'Accountant'},
  //{name:'transactions-listing', title:'Transactions-listing', mainReport:'TRANSLISTING', reportGroup:'Accountant'},
  {name:'fs-income-statement', title:'Income Statement', mainReport:'INCOMESTATEMENT', reportGroup:'Accountant'},
  {name:'fs-balance-sheet', title:'Balance Sheet', mainReport:'BALANCESHEET', reportGroup:'Accountant'},
  {name:'fs-cashflow-statement', title:'Cash Flow Statement', mainReport:'CASHFLOW', reportGroup:'Accountant'},
  {name:'receipts-and-payments', title:'Receipts & Payments', mainReport:'RECEIPTSANDPAYMENTS', reportGroup:'Accountant'},
  {name:'journals', title:'Journal Entries', mainReport:'JOURNALENTRIES', reportGroup:'Accountant'},
  //{name:'recorded-transactions', title:'Recorded Transactions', mainReport:'RECORDEDTRANSACTIONS', reportGroup:'Accountant'},
  //{name:'fs-balance-sheet-details', title:'Balance Sheet', mainReport:'BALANCESHEETDETAILS'},
  
  //{name:'customers-ledger-accounts', title:'Customers Ledger Accounts', mainReport:'CUSTOMERS'},
  //{name:'vendors-ledger-accounts', title:'Vendors Ledger Accounts', mainReport:'VENDORS'},
 // {name:'products-ledger-accounts', title:'Products Ledger Accounts', mainReport:'PRODUCTS'},
];
const customers =[
  {name:'account-list-customers', title:'Customers List', mainReport:'CUSTOMERSACCOUNTS', reportGroup:'Customers'},
  {name:'personal-ledgers-customers', title:'Customers Ledgers', mainReport:'CUSTOMERSLEDGERS', reportGroup:'Customers'},
  {name:'customers-ledger-accounts', title:'Customers Ledger Accounts', mainReport:'CUSTOMERS', reportGroup:'Customers'},
  {name:'personal-ledgers-customers-balances', title:'Customers Balances', mainReport:'CUSTOMERSBALANCES', reportGroup:'Customers'},
  {name:'customers-aging', title:'Customers Aging', mainReport:'CUSTOMERSAGING', reportGroup:'Customers'},
  {name:'customers-loan', title:'Customers Loan', mainReport:'CUSTOMERSLOAN', reportGroup:'Customers'}
];
const vendors =[
  {name:'account-list-vendors', title:'Vendors List', mainReport:'VENDORSACCOUNTS', reportGroup:'Vendors'},
  {name:'personal-ledgers-vendors', title:'Vendors Ledgers', mainReport:'VENDORSLEDGERS', reportGroup:'Vendors'},
  {name:'vendors-ledger-accounts', title:'Vendors Ledger Accounts', mainReport:'VENDORS', reportGroup:'Vendors'},
  {name:'personal-ledgers-vendors-balances', title:'Vendors Balances', mainReport:'VENDORSBALANCES', reportGroup:'Vendors'},
  {name:'vendors-aging', title:'Vendors Aging', mainReport:'VENDORSAGING', reportGroup:'Vendors'}
];
const products =[
  {name:'account-list-products', title:'Products List', mainReport:'PRODUCTSACCOUNTS', reportGroup:'Products'},
  {name:'personal-ledgers-products', title:'Products Ledgers', mainReport:'PRODUCTSLEDGERS', reportGroup:'Products'},
  {name:'products-ledger-accounts', title:'Products Ledger Accounts', mainReport:'PRODUCTS', reportGroup:'Products'},
  {name:'personal-ledgers-products-balances', title:'Products Balances', mainReport:'PRODUCTSBALANCES', reportGroup:'Products'},
  {name:'products-valuation', title:'Products Valuation', mainReport:'PRODUCTSVALUATION', reportGroup:'Products'},
];


export const tabsDropdown = {
  accountant,
  customers,
  vendors,
  products
}

export const tabsDropdownsArr = [
  ...accountant,
  ...customers,
  ...vendors,
  ...products
]

export const getCurrentReportName =(reportName)=>{
  let currentReportName = "";
  if(['gl', 'vendors', 'customers', 'products'].includes(reportName?.split('-')[0])){
    currentReportName = reportName.split('-')[0] === "gl"? "Accountant" : capitalizeFirstCharOnly(reportName.split('-')[0]);
  }else if (['fs'].includes(reportName?.split('-')[0])){
    currentReportName = "Accountant";
  }else{
    currentReportName =  tabsDropdownsArr?.find((dt)=> dt.name === reportName)?.reportGroup;
  }

  return currentReportName
}

export default getHeaders;