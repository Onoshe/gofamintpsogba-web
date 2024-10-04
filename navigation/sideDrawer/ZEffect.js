import { getAllAccountsCodes } from '@/assets/data/chartOfAccount/getAllAccountsCodes';
import getTransactions1 from '@/assets/data/transactions1';
import getTransactions2 from '@/assets/data/transactions2';
import useStoreReports from '@/context/storeReports';
import React, {useState, useEffect} from 'react';
import { transEntriesGenerator } from '../reportsModule/transEntriesGenerator';
import useStoreCompany from '@/context/storeCompany.js';


const trans1 = getTransactions1();
const trans2 = getTransactions2();
const transactions = [...trans1, ...trans2];
const allAccountCodes = getAllAccountsCodes();

    const allChartOfAccts = getAllAccountsCodes();
    const transEntries = transEntriesGenerator(transactions, allChartOfAccts);


const ZEffect = () => {
    const {dispatchTransEntries, dispatchTransactions, dispatchAllAccountCodes} = useStoreReports((state) => state);
    const {companyDataFromDb, user, dispatchCompanyDataFromDb, dispatchMultipleFetchFromDb} = useStoreCompany((state) => state);
    //const allAccountCodes = getAllAccountsCodes();
  function dispatchAccounts(){  
    dispatchTransactions(transactions);
    dispatchTransEntries(transEntries);
    dispatchAllAccountCodes(allAccountCodes)
  }

  

  useEffect(()=>{
    //dispatchAccounts();
  },[]);

 return (
    <>
    </>
  )
}

export default ZEffect