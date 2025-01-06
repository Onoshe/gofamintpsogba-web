import { getRequest } from "@/lib/apiRequest/getRequest";
import { getDefaultCOA, getDefaultPersonalAcct, getDefaultProductList } from "./processDbData";
import { getLinkClientData, getLinkFetchTableWithConds, getLinkUserData } from "@/lib/apiRequest/urlLinks";
import { productsLedgerProcessor } from "./productsLedgersProcessor";



export function getDataUrl(dom){
   const domain = dom?.toLowerCase();
   const url =  getLinkClientData({domain});
   //console.log(url, domain)
   return url;
}

export const  getClientData = async (domain, userId)=>{
       const dataUrl =  getDataUrl(domain);
       //console.log(dataUrl, domain)
       const res = await getRequest(dataUrl);
       //console.log(res, dataUrl)
       if(res?.data?.tables?.length){
         //Set secret as ""
         const usersAcct = res.data[domain+'_usersaccount']?.map((dt)=> {return {...dt, secret:""}})
         res.data[domain+'_usersaccount'] = usersAcct;
         
         //Filter out transactions not posted by User for demo account. Ie, fetch User created transactions + DEMO + DEFAULT@ (for default Retained Earnings)
         if(domain === "demo"){
            const tablesList = [domain+'_chartofaccount', domain+'_customers', domain+'_vendors',domain+'_transactions',domain+'_transactionsdetails', domain+'_products',];
            tablesList?.forEach(tb => {
               if(res?.data[tb]){
                  const tbTrans = res.data[tb];
                  const defaultAndUserTrans = tbTrans.filter((dt)=> dt.createdBy === "DEMO" || dt.createdBy === "DEFAULT@" || dt.createdBy === userId);
                  res.data[tb] = defaultAndUserTrans;
               }  
            });
         }
         return {tables:res?.data?.tables, data:res?.data}
     }else{return {}}
}

export const  fetchAndDispatchClientAccount = async (domain, dispatchClientAccount)=>{
   console.log(domain);
   const urlLink = getLinkFetchTableWithConds({table:'_clients', conds:'companyDomain', values:domain.toUpperCase()});
   //const {clientLink} = getLinkUserData({domain});
   const client = await getRequest(urlLink).then((res)=> res);
   //console.log(client);
   if(client?.data?.length && dispatchClientAccount){
      dispatchClientAccount(client.data[0])
 }else{return {}}
}



//const data ={fetchedData, domain, dispatchCOAStructure, dispatchProducts, dispatchChartOfAccounts, dispatchCustomers, dispatchVendors, dispatchTransReady, dispatchTransactions, dispatchTransactionsDetails}
export const runDispatchClientData = async ({fetchedData, domain, dispatchCOAStructure, dispatchProducts, dispatchChartOfAccounts, dispatchCustomers, dispatchVendors, 
   dispatchTransReady, dispatchTransactions, dispatchTransactionsDetails, userId})=>{
   

   const res = fetchedData?.tables?.length? fetchedData : await getClientData(domain, userId).then((res)=> res);
   //console.log(res, domain)
   if(!res?.tables?.length) return console.log("Error! Unable to fetch data");
   const coaStruc = res.data[domain+"_coastructure"];
   const defaultCOA = getDefaultCOA(res.data[domain+"_chartofaccount"]);
   const defaultProductList = getDefaultProductList(res.data[domain+"_products"]);
   const personalAccountCustomers = getDefaultPersonalAcct('C-', res.data[domain+"_customers"]);
   const personalAccountVendors = getDefaultPersonalAcct('V-', res.data[domain+"_vendors"]);
   const transactions =  res.data[domain+"_transactions"];
   const transactionsDetails = res.data[domain+"_transactionsdetails"];
  

   //dispatchProducts([{id:"", productName:"", productCode:"", category:"", description:''}, ...defaultProductList]);
   if(dispatchCOAStructure){
         //{retainedEarnings:321, receivables:142, payables:232, inventoryControl:152, inventoryAdj:153, costOfSale:511},
         const retainedEarnings = coaStruc?.find((dt)=> dt.name.toLowerCase()=== 'retainedEarnings'.toLocaleLowerCase())?.code;
         const receivables = coaStruc?.find((dt)=> dt.name.toLowerCase()=== 'accountReceivableControl'.toLocaleLowerCase())?.code;
         const payables = coaStruc?.find((dt)=> dt.name.toLowerCase()=== 'accountPayableControl'.toLocaleLowerCase())?.code;
         const inventoryControl = coaStruc?.find((dt)=> dt.name.toLowerCase()=== 'inventoryControl'.toLocaleLowerCase())?.code;
         const inventoryAdj = coaStruc?.find((dt)=> dt.name.toLowerCase()=== 'inventoryAdjustment'.toLocaleLowerCase())?.code;
         const costOfSale = coaStruc?.find((dt)=> dt.name.toLowerCase()=== 'costOfGoodsSold'.toLocaleLowerCase())?.code;
         const bank = coaStruc?.find((dt)=> dt.name.toLowerCase()=== 'bank'.toLocaleLowerCase())?.code;
         const cash = coaStruc?.find((dt)=> dt.name.toLowerCase()=== 'cash'.toLocaleLowerCase())?.code;
         const paymentClearing = coaStruc?.find((dt)=> dt.name.toLowerCase()=== 'paymentClearing'.toLocaleLowerCase())?.code;
          
         dispatchCOAStructure({
            coaStructure:[...coaStruc],
            controlAcctsCode:{retainedEarnings, receivables, payables, inventoryControl, inventoryAdj, costOfSale, bank, cash, paymentClearing}
         });
      }
    
    //productsLedgerProcessor(coaStruc, defaultCOA, transactions, transactionsDetails,  productsList);
   if(dispatchProducts){dispatchProducts(defaultProductList);} 
   if(dispatchChartOfAccounts){dispatchChartOfAccounts([...defaultCOA])}
   if(dispatchCustomers){dispatchCustomers([...personalAccountCustomers])} 
   if(dispatchVendors){(dispatchVendors([...personalAccountVendors]))}
   if(dispatchTransactions){(dispatchTransactions([...transactions]))}
   if(dispatchTransactionsDetails){
      const updatedTransDetails =  productsLedgerProcessor({
         coaStructure:[...coaStruc], chartOfAccounts:[...defaultCOA], transactions:[...transactions], 
         transactionsDetails,  products:[...defaultProductList]});

         (dispatchTransactionsDetails(updatedTransDetails))
    }
   //if(dispatchActivityLog){(dispatchActivityLog([...activityLog]))}
   if(dispatchTransReady){dispatchTransReady(true);}
   
   console.log("DF&DS"); //Data Fetched & Dispatched Successfully
   //console.log()
};
