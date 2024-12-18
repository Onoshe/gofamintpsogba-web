'use client'
import React, { useState } from 'react';
import PostContainerTwoEntry from './components/twoEntries/PostContainerTwoEntry';
import TabWrapper from '@/components/customersVendors/HeaderTab';
import PostContainerMultiEntry from './components/multiEntries/PostContainerMultiEntry';
import useStoreTransactions from '@/context/storeTransactions';
import { mapChartOfAccount } from '@/lib/transactionsManager/mapChartOfAccount';
import { mapPersonalAccounts } from '@/lib/transactionsManager/mapPersonalAccounts';
import { mapProducts } from '@/lib/transactionsManager/mapProducts';
import useStoreRecordTransaction from '@/context/storeRecordTransaction';
import ConfirmAlert from '@/components/confirmAlert/ConfirmAlert';
import { handleDeleteTransaction } from './components/utils/handleDeleteTransaction';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
import useStoreHeader from '@/context/storeHeader';


const IndexPostTransaction = ({ssUser}) => {
  const { session, user,  status} = useAuthCustom(ssUser);
  const router = useRouter();
  const {coaStructure,customers, vendors, chartOfAccounts, transactions, transactionsDetails, reportDate, controlAcctsCode, products, runDispatchClientDataCall} = useStoreTransactions((state) => state);
  const {recordTransaction, tranSheetTwoEntry, dispatchTranSheetTwoEntry, tranSheetMultiEntry, dispatchTranSheetMultiEntry, 
    dispatchRecordTransaction, dispatchTranSheetTwoEntryReset,   dispatchTranSheetMultiEntryReset} = useStoreRecordTransaction((state) => state);  
  const {activeTab, createByEntry} = recordTransaction;
  const [showConfirm, setShowConfirm] = React.useState(false);
  const {toastNotice, dispatchToastNotice} =  useStoreHeader((state) => state);  

  const personalAccts =  mapPersonalAccounts(customers, vendors);
  const chartOfAccountSelection = mapChartOfAccount(chartOfAccounts, coaStructure);
  const productsList = mapProducts(products);
  const processedLedgers = []; //ledgers.processedLedgers;
  
  const notify =(type, msg)=>{
    dispatchToastNotice({type, msg, count:parseInt(toastNotice.count)+1})
  }

  function controlAcctChecker(transSheet, entryAcct, contAct, idx){
    //entryType = debit || credit; entryAcct = debitAccount || creditAccount; contAcct = receivables || payables || inventrolControl, 
    //Note that this checker will give false if receivablesControlAccount is credited or payableControlAccount is debited
    let isControlAcct = false;
    if(transSheet[idx][entryAcct]){
      const acct = chartOfAccounts.find((dt)=> dt.accountCode == transSheet[idx][entryAcct]);
      isControlAcct = controlAcctsCode[contAct] == acct?.typeCode;
   }
   return isControlAcct
  }
 //console.log(tra);

  const setActiveTab =(act)=>{
    dispatchRecordTransaction({...recordTransaction, activeTab:act})
  }
  const setCreateByEntry =(act)=>{
    dispatchRecordTransaction({...recordTransaction, createByEntry:act})
  }
  
  const handleActiveTab =(e)=>{
    //console.log(e)
    setActiveTab(e)
  }
  const handleCancelTran =()=>{
    //setShowConfirm(true)
    dispatchTranSheetTwoEntryReset();
    const transListingPage = recordTransaction.transListingPage;
    router.push(transListingPage);
  }
  
  const handleConfirm = (act)=>{
    if(act === "CANCEL"){setShowConfirm(false); }
    if(act === "CONTINUE"){
      handleDeleteTransaction({ recordTransaction,  user, setShowConfirm, notify, runDispatchClientDataCall, router})
    }
 }
 //className={`${activeTab==="DEFAULT"? 'w-[99%] lg:w-3/4 xlc:w-[85%] 3xl:w-[95%]' :'lg:w-[800px] xl:w-auto'}`}>

  return (
    <div 
      className={`text-sm`}>
            <TabWrapper
              classNameCont={``}
              tab1Name="TWOENTRY"
              tab2Name="MULTIENTRY"
              subTitle="Transaction"
              tab1Title="Two Entries"
              tab2Title="Multi Entries"
              activeTab={activeTab}
              handleActiveTab={handleActiveTab}
              hideIcon
              >
         </TabWrapper>

            <div className=''>
            <>
              {activeTab==="TWOENTRY"?
                <PostContainerTwoEntry
                  checkedBtn={createByEntry}
                  setCheckedBtn={setCreateByEntry}
                  chartOfAccounts={chartOfAccounts}
                  chartOfAccountSelection={chartOfAccountSelection}
                  personalAccts={personalAccts}
                  personalAcctsList = {{customersList:customers, vendorsList:vendors}}
                  controlAcctsCode={controlAcctsCode}
                  user={user}
                  vendors={vendors}
                  customers={customers}
                  runDispatchClientDataCall={runDispatchClientDataCall}
                  transSheet={tranSheetTwoEntry}
                  setTransSheet={dispatchTranSheetTwoEntry}
                  recordTransaction={recordTransaction}
                  handleCancelTran={handleCancelTran}
                  dispatchTranSheetTwoEntryReset={dispatchTranSheetTwoEntryReset}
                  notify={notify}
                  products={products}
                  coaStructure={coaStructure}
                  controlAcctChecker={controlAcctChecker}
                  transactions={transactions}
                  transactionsDetails={transactionsDetails}
                  reportDate={reportDate}
                />
                :<PostContainerMultiEntry
                  chartOfAccounts={chartOfAccounts}
                  chartOfAccountSelection={chartOfAccountSelection}
                  personalAccts={personalAccts}
                  personalAcctsList = {{customersList:customers, vendorsList:vendors}}
                  productsList={productsList}
                  controlAcctsCode={controlAcctsCode}
                  user={user}
                  vendors={vendors}
                  customers={customers}
                  runDispatchClientDataCall={runDispatchClientDataCall}
                  transSheet={tranSheetMultiEntry}
                  setTransSheet={dispatchTranSheetMultiEntry}
                  recordTransaction={recordTransaction}
                  dispatchTranSheetMultiEntryReset={ dispatchTranSheetMultiEntryReset}
                  toastNotice={toastNotice}
                  dispatchToastNotice={dispatchToastNotice}
                  toastNotify={notify}
                />
                }
                
            </>
              <ConfirmAlert showBlind={showConfirm}
                title={"Do you really want to delete transaction "+recordTransaction?.editDetails?.transactionNo+" ?"}
                msg="Please note that all entries associated with this transaction will also be deleted."
                handleCancel={()=>handleConfirm("CANCEL")}
                handleContinue={()=>handleConfirm("CONTINUE")}
              />
            </div>
      </div>
  )
}

export default IndexPostTransaction;

