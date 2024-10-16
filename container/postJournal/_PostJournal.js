'use client'
import React, { useState } from 'react';
import PostContainerJournal from './components/PostContainerJournal';
import TabWrapper from '@/components/customersVendors/HeaderTab';
import useStoreTransactions from '@/context/storeTransactions';
import { mapChartOfAccount } from '@/lib/transactionsManager/mapChartOfAccount';
import { mapPersonalAccounts } from '@/lib/transactionsManager/mapPersonalAccounts';
import { mapProducts } from '@/lib/transactionsManager/mapProducts';
import useStoreRecordTransaction from '@/context/storeRecordTransaction';
import { useRouter } from 'next/navigation';
import ConfirmAlert from '@/components/confirmAlert/ConfirmAlert';
import { handleDeleteTransaction } from '../postTransaction/components/utils/handleDeleteTransaction';
import { ToastContainer } from 'react-toastify';
import { toastNotify } from '@/container/postTransaction/components/utils/toastNotify';
import 'react-toastify/dist/ReactToastify.css';
import { LedgersManager } from '../reports/utils/ledgers/ledgersManger';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';


const IndexPostJournal = ({ssUser}) => {
  const { session, user,  status} = useAuthCustom(ssUser);
  const router = useRouter();
  const {coaStructure,customers, vendors, transactions, transactionsDetails, chartOfAccounts, controlAcctsCode, products, runDispatchClientDataCall, reportDate,} = useStoreTransactions((state) => state);
  const {recordTransaction, dispatchTranSheetMultiEntryReset, tranSheetJournals, dispatchTranSheetJournals} = useStoreRecordTransaction((state) => state);  
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [postError, setPostError] = useState({msg:'', error:false, color:'text-gray-600'});
  let transProcessor = new LedgersManager({trans:transactions, transactions:transactionsDetails, chartOfAccounts, customers, vendors, products, controlAcctsCode, coaStructure, dateForm:reportDate});
  let ledgers = transProcessor.processTransactions(reportDate?.startDate, reportDate?.endDate);
  const processedLedgers = ledgers.processedLedgers;

  //const [activeTab, setActiveTab] = React.useState('TWOENTRIES');
    
  const personalAccts =  mapPersonalAccounts(customers, vendors);
  const chartOfAccountSelection = mapChartOfAccount(chartOfAccounts, coaStructure);
  const productsList = mapProducts(products);
  //console.log(tranSheetJournals)

  const handleDeleteTran =()=>{
    setShowConfirm(true)
  }
  const handleConfirm = (act)=>{
    if(act === "CANCEL"){setShowConfirm(false); }
    if(act === "CONTINUE"){
      handleDeleteTransaction({ recordTransaction,  user, setShowConfirm, notify, runDispatchClientDataCall, router})
    }
 }
  
  return (
    <div 
      className={`text-sm`}>
            <div className='px-4 py-2 flex flex-col bg-[aliceblue] border border-b-[#e4f1fd] mb-2 smc:flex-row smc:items-center justify-between'>
              <p className='text-lg font-bold text-blue-700'>Record Journal</p>
             
            </div>

            <div className=''>
            <>
                <PostContainerJournal
                  chartOfAccounts={chartOfAccounts}
                  coaStructure={coaStructure}
                  chartOfAccountSelection={chartOfAccountSelection}
                  personalAccts={personalAccts}
                  personalAcctsList = {{customersList:customers, vendorsList:vendors}}
                  productsList={productsList}
                  controlAcctsCode={controlAcctsCode}
                  user={user}
                  vendors={vendors}
                  customers={customers}
                  runDispatchClientDataCall={runDispatchClientDataCall}
                  recordTransaction={recordTransaction}
                  dispatchTranSheetMultiEntryReset={dispatchTranSheetMultiEntryReset}
                  transSheet={tranSheetJournals}
                  setTransSheet={dispatchTranSheetJournals}
                  router={router}
                  postError={postError}
                  setPostError={setPostError}
                  handleDeleteTran={handleDeleteTran}
                  toastNotify={toastNotify}
                  processedLedgers={processedLedgers}
                />
              </>
              <ToastContainer 
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick={true}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  bodyClassName={postError.color}
                />
    
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

export default IndexPostJournal;

