'use client'
import React, {useState, useEffect, useReducer} from 'react';
import useStoreCompany from '@/context/storeCompany.js';
import { getCompanyAccounts } from '@/lib/fetchDataFromSanity/fetchCompanyAccounts';
import { sortArrayByKey } from '../modules/sortData';
import { getRequest } from '@/lib/apiRequest/getRequest';




const ZEffectFetchData = () => {
    const {companyDataFromDb, user,  dispatchChartOfAccountForUse,companyCOAFromDb,
      companyDataFromDbReady, dispatchMultipleFetchFromDb,   fetchDataCount} = useStoreCompany((state) => state);

 
  const fetchDataFromSqlDb = async ()=>{
    //Replace sanity data with those from mySql
    const url = "https://countixpress-server.gofamintpsogba.org/server.php?tableName=KOSOFECOOP_ALL";
   await getRequest(url).then((res)=>{ 
        //console.log(res)
       if(res.ok){
        const {vendors, customers, activities} = res;
        dispatchMultipleFetchFromDb({companyCustomersFromDb:customers, companyVendorsFromDb:vendors})
      }
    })
 };

  /******************  Fetch and dispatch basic data *******************/
  const fetchData = async (coyDomCap, refetchType)=>{
    await getCompanyAccounts(coyDomCap)
    .then((res)=>{
       const {companyData, companyTransactions, companyCustomers, companyVendors} = res;
       if(!companyDataFromDbReady || refetchType === 'REFETCH'){
        const companyCOAFromDb = companyData[0].chartOfAccounts;
        sortArrayByKey(companyCOAFromDb,'accountCode', 'ASC');
        const multipleData = {companyDataFromDb:companyData[0],  companyCOAFromDb, companyTransactionsFromDb:companyTransactions, 
          companyCustomersFromDb:companyCustomers, companyVendorsFromDb:companyVendors};
        dispatchMultipleFetchFromDb(multipleData)
       }
       
    });
    fetchDataFromSqlDb();
   }
   useEffect(()=>{
    if(user?.userName && !companyDataFromDb?.companySlug){
      const coyDomCap = user.userName.split('@')[0];
      fetchData(coyDomCap)
    }
    if(user?.userName && fetchDataCount){
      const coyDomCap = user.userName.split('@')[0];
      fetchData(coyDomCap, 'REFETCH')
    }
  },[user, fetchDataCount]);

   useEffect(()=>{
    if(companyDataFromDb?.chartOfAccounts){
      const  chartOfAccount = companyDataFromDb?.chartOfAccounts;
        sortArrayByKey(chartOfAccount, 'accountCode', 'ASC'); 
      dispatchChartOfAccountForUse(companyDataFromDb?.chartOfAccounts)
    }
    //console.log(1900)
  },[companyDataFromDb]);


   

 return (
    <>
    </>
  )
}

export default ZEffectFetchData