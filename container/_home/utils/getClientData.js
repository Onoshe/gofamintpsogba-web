import { getRequest } from "@/lib/apiRequest/getRequest";
import { getDefaultCOA, getDefaultPersonalAcct, getDefaultProductList } from "./processDbData";

/*
const  getClientData = async (domain)=>{
       const res = await getRequest(`http://localhost/app/server.php/api/transactions?d=${domain}`).then((res)=> res);
       //console.log(res)
       if(res?.data?.tables?.length){
        return {tables:res?.data?.tables, data:res?.data}
     }else{return {}}
}

 const runDispatchClientData = async ({domain, dispatchCOAStructure, dispatchProducts, dispatchChartOfAccounts, dispatchCustomers, dispatchVendors, dispatchTransReady})=>{
   const res = await getClientData(domain).then((res)=> res);
   if(!res?.tables?.length) return console.log("Error! Unable to fetch data");
   const coaStruc = res.data[domain+"_coastructure"];
   const defaultCOA = getDefaultCOA(res.data[domain+"_chartofaccount"]);
   const defaultProductList = getDefaultProductList(res.data[domain+"_products"]);
   const personalAccountCustomers = getDefaultPersonalAcct('C-', res.data[domain+"_customers"]);
   const personalAccountVendors = getDefaultPersonalAcct('V-', res.data[domain+"_vendors"]);
   const transactions = "transactions";
   const transactionsDetails = "transactionsdetails";
   const activityLog = "activitylog";


   dispatchCOAStructure([...coaStruc]);  
   //dispatchProducts([{id:"", productName:"", productCode:"", category:"", description:''}, ...defaultProductList]);
   dispatchProducts(defaultProductList);
   dispatchChartOfAccounts([...defaultCOA])
   dispatchCustomers([...personalAccountCustomers]) 
   dispatchVendors([...personalAccountVendors]);
   dispatchTransReady(true);
   console.log("Data fetched and dispatched successfully");
   //console.log()
};
*/