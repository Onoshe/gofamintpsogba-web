'use client'
import React, {useEffect, useState} from 'react';
import useStoreTransactions from '@/context/storeTransactions';
import {fetchAndDispatchClientAccount, getClientAccount, getClientData, getDataUrl, runDispatchClientData } from './getClientData';
import useStoreHeader from '@/context/storeHeader';
import { getLinkFetchTable, getLinkFetchTableWithConds } from '@/lib/apiRequest/urlLinks';
import { getRequest } from '@/lib/apiRequest/getRequest';
//import { useSWRFetcher } from '@/lib/hooks/useSWRFetcher';



const EffectFetchData = ({ session}) => {
    const {coaStructure, transactions, clientsDataCall, transReady, clientAccount, dispatchClientAccount, dispatchTransReady, dispatchCOAStructure,  dispatchProducts, dispatchChartOfAccounts, 
          dispatchCustomers, dispatchVendors, dispatchTransactions, dispatchTransactionsDetails} = useStoreTransactions((state) => state);
    const {settings, dispatchSettings, fetchSettingsCall, dispatchFetchSettingsCall, dispatchUser, dispatchUsers, refreshSettingsCount, dispatchSubscriptions, 
      dispatchActivityLog, generalSettings, client_Admin, clientData, dispatchGeneralSettings, dispatchClientAdmin, dispatchClientData} = useStoreHeader((state) => state);
  
  const genDomain = "demo";
    
  const domain = session?.user?.companyId;
  const userId = session?.user?.userId;

    const firstDataFetch = async()=>{
      //console.log('Fetching data')
      await getClientData(domain, userId)
      .then((res)=> {
        //console.log(res)
        runDispatchClientData({fetchedData:res, domain, dispatchCOAStructure, dispatchProducts, dispatchChartOfAccounts, dispatchCustomers, dispatchVendors, dispatchTransReady, dispatchTransactions, dispatchTransactionsDetails, userId});
      })
      .then(()=>{ dispatchTransReady(true)});
    }


  

  const fetchSettings = async ()=>{
      //Dispatch Client Settings
      const url = getLinkFetchTable({table:domain+"_settings", domain});
      const settings = await getRequest(url).then((res)=> res);
      dispatchSettings(settings);

      //Dispatch client activities
      const urlLinkAct = getLinkFetchTable({table:domain+"_activitylog", domain});
      const activityLog = await getRequest(urlLinkAct);
      if(activityLog?.data?.length){
        dispatchActivityLog(activityLog.data)
      }

      //Dispatch client users account
      const urlLinkUsers =getLinkFetchTableWithConds({table:domain+"_usersaccount", conds:"deleted", values:"0"});
      const usersAcct = await getRequest(urlLinkUsers);
      if(usersAcct?.data?.length && session){
        const usersFmt = usersAcct.data.map((dt)=> {
          const {resetPassword, resetPasswordCode, resetPasswordExpires, defaultSecret, secret, ...others} = dt;
          return {...others, userName:dt.userId} 
        });
        const user = usersFmt.find((dt)=> dt.userName === session?.user?.userId);
        dispatchUsers(usersFmt);
        if(user?.userId){dispatchUser(user);}
        //console.log(user, usersFmt)
      }

   }  

  const fetchBasicData = async ()=>{
    //Dispatch subscriptions
    const urlLink = `_subscriptions&c=companyDomain&v=${domain}`;
    const urlSub = getLinkFetchTable({table:urlLink, domain:genDomain});
    const subHistory = await getRequest(urlSub);
    if(subHistory?.data?.length){
      dispatchSubscriptions(subHistory.data)
    }else[dispatchSubscriptions([])]

    //Dispatch settings
    const st = `_settings`;
    const urlSt = getLinkFetchTable({table:st, domain:genDomain});
    const stData = await getRequest(urlSt);
    if(stData?.data?.length){
      dispatchGeneralSettings(stData.data)
    }
    //Fetch clients- companyDomain: ADMIN (which hold QuickRecords info) & Others
    const admin = `_clients&c=companyDomain&v=ADMIN`;
    const urlAdmin = getLinkFetchTable({table:admin, domain:genDomain});
    const adminData = await getRequest(urlAdmin);
    if(adminData?.data?.length){
      dispatchClientAdmin(adminData.data[0])
    }

    //Fetch clients- companyDomain: ADMIN (which hold QuickRecords info) & Others
    const cl = `_clients&c=companyDomain&v=${domain}`;
    const urlCl = getLinkFetchTable({table:cl, domain:genDomain});
    const clData = await getRequest(urlCl);
    if(clData?.data?.length){
      dispatchClientData(clData.data[0])
    }
  }


  /*
  useEffect(()=>{
    //Fetch data on mount. UseEffect error will occur for a new client without data
    //It should check if basic data is not fetched.coaStructure data is a basic data
    if(domain && !coaStructure?.length){firstDataFetch()}
    if(domain && !settings?.length){
      fetchSettings();
    }
    if(domain && fetchSettingsCall){fetchSettings();}
  },[domain, coaStructure, session, fetchSettingsCall]);

   useEffect(()=>{
    //Subsequent fetch data call on the function: runDispatchClientData
    if(domain && clientsDataCall ){
      runDispatchClientData({fetchedData:{}, domain, dispatchCOAStructure, dispatchProducts, dispatchChartOfAccounts, dispatchCustomers, dispatchVendors, dispatchTransReady, dispatchTransactions, dispatchTransactionsDetails});
      //console.log(clientsDataCall)
    }
    if(domain && !generalSettings?.length){
      fetchBasicData();
    }
   },[clientsDataCall, domain]);


   useEffect(()=>{
    //Subsequent fetch on function call dispatchRefreshSettingsCount
    if(domain && refreshSettingsCount ){
      fetchSettings();
    }
   },[refreshSettingsCount, domain]);

   useEffect(()=>{
    if(domain && !clientAccount.companyName){
      fetchAndDispatchClientAccount(domain, dispatchClientAccount)
    }
   },[domain, clientAccount]);*/


   useEffect(()=>{
    //Fetch on mount
    if(domain){
      fetchAndDispatchClientAccount(domain, dispatchClientAccount);
      fetchBasicData();
      fetchSettings();
      firstDataFetch();
    }
   },[]);

   useEffect(()=>{
    //Subsequent fetch data call on the function: runDispatchClientData
    if(domain && clientsDataCall ){
      //const userId = "";
      //runDispatchClientData({fetchedData:{}, domain, dispatchCOAStructure, dispatchProducts, dispatchChartOfAccounts, dispatchCustomers, dispatchVendors, dispatchTransReady, dispatchTransactions, dispatchTransactionsDetails, userId});
      firstDataFetch();
    }
   },[clientsDataCall]);

   useEffect(()=>{
    //Subsequent fetch on function call dispatchRefreshSettingsCount
    if(domain && refreshSettingsCount ){
      fetchSettings();
    }
   },[refreshSettingsCount]);

   useEffect(()=>{
    if(domain && fetchSettingsCall){
      fetchSettings();
    }
  },[fetchSettingsCall]);

  return (
    <div>

    </div>
  )
}

export default EffectFetchData