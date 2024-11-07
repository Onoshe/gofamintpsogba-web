'use client'
import React, {useEffect, useState} from 'react';
import TransactionRow from './TransactionRow';
import TransactionsEntriesView from './TransactionsEntriesView';
import { ToastContainer } from 'react-toastify';
import { toastNotify } from '../utils/toastNotify';
import { TabsComponent } from '../multiEntries/TabsComponent';
import 'react-toastify/dist/ReactToastify.css';
import { submitHandler } from '../utils/submitHandler';
import { useRouter } from 'next/navigation';
import { BsBank2, BsInfoCircle } from 'react-icons/bs';
import PurchaseGuideContainer from '../postingGuides/PurchaseGuideContainer';
import SalesGuideContainer from '../postingGuides/SalesGuideContainer';
import { payableControlAcctChecker } from '@/container/postTransaction/components/utils/controlAccountChecker';
import CashAndBankBalances from '@/container/postTransaction/components/balancesComponent/CashAndbankBalances';
import ProductAdjustmentSelection from './ProductAdjustmentSelection';
import PostProductByUpload from '../postByUpload/PostProductByUpload';


const PostContainerMultiEntry = ({chartOfAccounts, chartOfAccountSelection, personalAcctsList, personalAccts, transactionsDetails,
  productsList, controlAcctsCode, user, personalAccounts, runDispatchClientDataCall, transSheet, setTransSheet, transSheetReset,
   productBalance,activeTab, setActiveTab, recordTransaction, handleCancelTran, handleDeleteTran, coaStructure, processedLedgers,
   showBankBalances, setShowBankBalances}) => {
  const router = useRouter();
  const [netAmount, setNetAmount] = useState('Total');
  const [showTransView, setShowTransView] = useState(true);
  const [postError, setPostError] = useState({msg:'', error:false, color:'text-gray-600'});
  const [componentReady, setComponentReady] = useState(false);
  const [showCard, toggleShowCard] = React.useState(false);
  const [selectedDueDate, setSelectedDueDate] = React.useState({value:30, label:'Select'});
  const [productBy, setProductBy] = React.useState({manual:true, });
  const [uploadError, setUploadError] = useState({msg:'', error:false, uploadTable:[]});
  const [resetCall, setResetCall] = useState(0);
  const [recordingProduct, setRecordingProduct] = useState(false);

 //console.log(transSheet)
  const handleAdjustProductBy =(e)=>{
    setTransSheet({ ...transSheet, adjustProductChecked:e});
 }
 
  const handleSubmit =()=>{
    if(productBy.manual){
      submitHandler({transSheet:[transSheet], controlAcctsCode, activeTab, chartOfAccounts,user, personalAccounts, 
        runDispatchClientDataCall, setPostError, toastNotify, transSheetReset, recordTransaction, router, postByUpload:false, setRecordingProduct,})
    }else{
      if(!uploadError.error && uploadError.uploadTable.length){
        submitHandler({transSheet:uploadError.uploadTable, controlAcctsCode, activeTab, chartOfAccounts,user, personalAccounts, 
        runDispatchClientDataCall, setPostError, toastNotify, transSheetReset, recordTransaction, router, postByUpload:true, setRecordingProduct,
        resetCall, setResetCall})
      }else{toastNotify("error", "Please, upload data.");}
    }
  }
  const handleTransView =(act)=>{
    setShowTransView(act);
  }
  const handleOnChangeShowRecord =()=>{
    const {description, accountCodeDr, accountCodeCr} = transSheet;
    if(description || accountCodeDr || accountCodeCr){
      toastNotify('error', 'Please, fill the transaction row');
      setShowTransView(false)
    }else{
      setShowTransView(!showTransView)
    }
   }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, value)
    if(name === 'accountCodeDr'){
      setTransSheet({ ...transSheet, [name]: value, subCodeDr:'' });
    }else if(name === 'accountCodeCr'){
      setTransSheet({ ...transSheet, [name]: value, subCodeCr:'' });
    } else {
      setTransSheet({ ...transSheet, [name]: value });
    }
    setPostError({msg:'', error:false})
 }

 //console.log(transSheet, uploadError)
 //Due date accountCodeCr | accountCodeCr || subCodeCr
 
 const showDueDate = payableControlAcctChecker(transSheet, chartOfAccounts, controlAcctsCode, activeTab);
 //console.log(showDueDate)
 const updateTransSheetDueDate = (val, type)=>{
   const updatedRows = {...transSheet, dueDate:val, dueDateType:type}; 
   //console.log(updatedRows)
   setTransSheet(updatedRows);
 };
 React.useEffect(()=>{
   if(showDueDate.show){
       if(selectedDueDate?.value){
           updateTransSheetDueDate(selectedDueDate.value, showDueDate.conType);
       }else{updateTransSheetDueDate("", "")}
   }else{updateTransSheetDueDate("", "")}
 },[selectedDueDate, showDueDate.show, showDueDate.conType, activeTab]);

 React.useEffect(()=>{
    const {description, accountCodeDr, accountCodeCr, amount} = transSheet;
    if(description || accountCodeDr || amount || accountCodeCr){
    setShowTransView(false)
    }
    setComponentReady(true) //Used to prevent server hydration error
  },[transSheet]);

 const handleToggle =()=>{
  const val = productBy.manual;
  setProductBy({...productBy, manual:!val})
 }

 let showRecordBtn = true;
 if(!productBy.manual){
    showRecordBtn = false;
    if(!uploadError.error && uploadError?.uploadTable?.length){
      showRecordBtn = true;
    }
 }
  return (
    <>
    <div className='w-full bg-gray-300 py-3 mt-0 text-blue-900 px-8 font-bold flex flex-row justify-between'>
      <p>Record Product <span className='text-blue-500'> {activeTab==="TAB1"? "Purchase" : activeTab==="TAB2"? "Sale" : "Adjustment"}</span></p>
        <div className='hidden sm:block cursor-pointer tooltip tooltip-left w-fit hover:tooltip-open' data-tip={'Posting guide'}
          onClick={()=>toggleShowCard(true)}>
          <BsInfoCircle size={20}/>
        </div>    
      
    </div>
    <div className={`flex flex-row items-baseline mt-1 xl:ml-10 gap-2 flex-wrap`}>
      <TabsComponent
        activeTab={activeTab} setActiveTab={setActiveTab} transSheetReset={transSheetReset}/>
      <div className='hidden sm:flex flex-row items-center justify-center w-fit ml-3  gap-2 hover:tooltip-open tooltip tooltip-right' data-tip={showBankBalances? 'Check to hide Cashbook balances':'Check to show Cashbook balances'}>
        <input type='checkbox' className='bg-white size-4 checkbox border border-blue-600' checked={showBankBalances} onChange={()=>setShowBankBalances(!showBankBalances)}/>
        <BsBank2 size={20} color='dodgerblue'/>
      </div>
      <div className='flex flex-row justify-self-end ml-10 text-blue-800 items-center gap-2'>
        <input type='checkbox' className='checkbox checkbox-error checkbox-xs'
          checked={productBy.manual} onChange={handleToggle}/>
        <label>Record by {productBy.manual? 'Manual' : 'Upload'}</label>
      </div>
    </div>

   
    {!productBy.manual?
      <PostProductByUpload 
        activeTab={activeTab}
        chartOfAccounts={chartOfAccounts}
        coaStructure={coaStructure}
        user={user}
        runDispatchClientDataCall={runDispatchClientDataCall}
        handleInfoMsg={()=>console.log()}
        setShowBlind={()=>console.log()}
        controlAcctsCode={controlAcctsCode}
        uploadError={uploadError}
        setUploadError={setUploadError}
        resetCall={resetCall}
        setResetCall={setResetCall}
        />
      :<div className={`pb-4 flex flex-col items-center justify-center ${recordTransaction?.editTran? 'pt-2' : 'pt-5'}`}>
        {activeTab==="TAB3" &&
          <ProductAdjustmentSelection
          adjustProductChecked={transSheet?.adjustProductChecked}
          handleAdjustProductBy={handleAdjustProductBy}
        />}
        <div className='overflow-x-auto flex items-center md:justify-center w-full'>
          <div className='shadow-lg px-3  m-6 mt-0 w-[650px]'>
            <div className={`pr-3 pb-3 pt-4 flex flex-row text-red-800 ${recordTransaction?.editTran? '' : 'hidden'}`}>
                <p>Edit:  <span className='pl-2'>Transaction {recordTransaction?.editDetails?.transactionNo}; Reference: {recordTransaction?.editDetails?.reference}</span></p>
            </div>
              <>
                <>
                    <TransactionRow hideTitle={false}
                        //handleAddRemoveRow={handleAddRemoveRow}
                        index={0}
                        handleOnChange={handleOnChange}
                        transSheet={transSheet}
                        chartOfAccounts={chartOfAccounts}
                        chartOfAccountSelection={chartOfAccountSelection}
                        personalAcctsList={personalAcctsList}
                        personalAccts={personalAccts}
                        productsList={productsList}
                        netAmount={netAmount}
                        activeTab={activeTab}
                        componentReady={componentReady}
                        productBalance={productBalance}
                        selectedDueDate={selectedDueDate}
                        setSelectedDueDate={setSelectedDueDate}
                        showDueDate={showDueDate}
                        adjustProductChecked={transSheet.adjustProductChecked}
                      />
                  </>
              </>
            
            <div className='hidden'>
              <p className={`text-left px-5 ${postError.error? 'text-red-600' : 'text-green-500'}`}>
                {postError.msg}
              </p>
            </div>
            <br/><br/>
            {/*<CashAndBankBalances 
                processedLedgers={processedLedgers}
                chartOfAccounts={chartOfAccounts}
                coaStructure={coaStructure}
                />*/}
            <div className='py-4 px-4 hidden flex-row gap-2'>
              <input type='checkbox' className='size-4 cursor-pointer' checked={showTransView} onChange={handleOnChangeShowRecord}/>
              <p className='text-blue-800'>Show Record Entries</p>
            </div>
              <div className='p-5 hidden'>
                <button onClick={handleSubmit} className='btn btn-sm btn-info px-7'>Record</button>
              </div>
          </div>
        </div>
    </div>}
    <div className={`w-full flex justify-center items-center px-5 mb-20`}>
      <TransactionsEntriesView 
            transSheet={transSheet}
            chartOfAccounts={chartOfAccounts}
            personalAccts={personalAccts}
            personalAcctsList={personalAcctsList}
            showTransView={showTransView}
            closeTransView={()=>handleTransView(false)}
      />
      
    </div>
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
      {activeTab === "TAB1"? 
        <PurchaseGuideContainer
          showCard={showCard}
          toggleShowCard={toggleShowCard}
        />
        : <SalesGuideContainer
          showCard={showCard}
          toggleShowCard={toggleShowCard}
        />}
    <br/>
    <br/>
      

        <div className={`${showRecordBtn? '' : 'hidden'} px-5 py-2 fixed bottom-0 bg-gray-200 w-full mt-10`}>
          <button onClick={handleSubmit} disabled={recordingProduct} 
              className='btn btn-sm btn-info px-7 inline-block mr-10'>
              {recordTransaction?.editTran? 'Save' :'Record'}
          </button>
          {recordingProduct && <p className='inline text-red-500'>Recording product...</p>}
          <div className={`inline-flex flex-row flex-wrap gap-4 ${recordTransaction?.editTran? '' : 'hidden'}`}>
              <button onClick={handleCancelTran} className='btn btn-sm btn-neutral px-5 inline-flex'>Cancel</button>
          </div>
      </div>
    </>
  )
}

export default PostContainerMultiEntry;