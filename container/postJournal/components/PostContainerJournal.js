'use client'
import React, {useEffect, useState} from 'react';
import TransactionRow from '@/container/postTransaction/components/multiEntries/TransactionRow';
import { validateTransactionsMulti } from '@/lib/validation/validateTransactionMulti';
import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import TransactionsEntriesView from '@/container/postProduct/components/multiEntries/TransactionsEntriesView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleSubmit } from '../utils/handleSubmit';
import { controlAcctChecker } from '@/container/postTransaction/components/utils/controlAccountChecker';
import CashAndBankBalances from '@/container/postTransaction/components/balancesComponent/CashAndbankBalances';
import { getPermissions, pmsActs } from "@/lib/permissions/permissions";

const PostContainerJournal = ({chartOfAccounts, coaStructure, chartOfAccountSelection, personalAcctsList, personalAccts, 
  productsList, controlAcctsCode, runDispatchClientDataCall, user, vendors, customers,handleDeleteTran,processedLedgers,
  recordTransaction, dispatchTranSheetMultiEntryReset, router, transSheet, setTransSheet, postError, setPostError, toastNotify}) => {
  //const [transSheet, setTransSheet] = useState([{debitCredit:1, date:"", reference:''}, {debitCredit:2}]);
  const [netAmount, setNetAmount] = useState('Total');
  const [showTransView, setShowTransView] = useState(false);
  const [showBankBalances, setShowBankBalances] = useState(false);
  const [selectedDueDate, setSelectedDueDate] = React.useState({value:30, label:'Select'});
  const [uploading, setUploading] = React.useState(false);

  //console.log(transSheet, recordTransaction)
  const handleAddRemoveRow =(dt, i)=>{
    //console.log(dt, i);
    if(i===0){
        setTransSheet([...transSheet, {debitCredit:1}])
    }else{
        const newRows = transSheet.filter((dt, idx)=> {return i !== idx});
        setTransSheet(newRows)
    }
  }

  const submitHandler = async ()=>{
    setUploading(true);
    //console.log(transSheet)
    const validateRes = validateTransactionsMulti(transSheet, chartOfAccounts, controlAcctsCode, netAmount)
    //console.log(validateRes)
    if(validateRes?.error){
     const errorMsg = getErrorMessage(validateRes?.errorType, validateRes?.key, validateRes?.rowIndex, validateRes?.title);
     //setPostError({msg:errorMsg, error:validateRes?.error});
     setUploading(false);
     toastNotify('error', errorMsg);
    }else{
      const perms = await getPermissions({user, act:pmsActs.POST_JOURNAL, form:transSheet});
      if(!perms.permit){ 
        setUploading(false);
        return toastNotify("error", perms.msg)};

      await handleSubmit({transSheetForm:transSheet, chartOfAccounts, user, vendors, customers,  setTransSheet, runDispatchClientDataCall, notify:toastNotify,
      recordTransaction, dispatchTranSheetMultiEntryReset,  router }).then(()=>{
        setUploading(false);
      })
      //setPostError({msg:'Posting successfull', error:false});
     //toastNotify('success', 'Posting successfull');
    }  
  }
  const handleTransView =(act)=>{
    setShowTransView(act)
  }
  const handleOnChangeShowRecord =()=>{
    const row1 = transSheet[0];
    if(!row1?.description || !row1?.accountCode){
      toastNotify('error', 'Please, fill the transaction row');
      setShowTransView(false)
    }else{
      setShowTransView(!showTransView)
    }
   }

  const handleOnChange = (e, i) => {
    const { name, value } = e.target;
    //return console.log([name, value, i])
    const updatedRows = transSheet.map((row, idx) =>
        idx === i ? { ...row, [name]: value } : row
    );
    const netAmount = updatedRows.reduce((cum, row)=>{
      const amount = row?.debitCredit == 1? row?.amount : row?.debitCredit == 2? row?.amount*-1 : 0;
      return cum += isNaN(parseFloat(row.amount))? 0 : parseFloat(amount);
    },0);
    setTransSheet(updatedRows);
    setNetAmount(netAmount);
    setPostError({msg:'', error:false})
 }

 const handleCloseBankBal =(acv)=>{
  console.log(acv)
 }

 const handleCancelTran =()=>{
  dispatchTranSheetMultiEntryReset();
  setNetAmount('Total')
 }

  const controlAcctTest = controlAcctChecker(transSheet, chartOfAccounts, controlAcctsCode);
  const updateTransSheetDueDate = (val, idx, type)=>{
    //console.log([val, idx, type])
    const updatedRows = transSheet.map((dt, i)=>{
      return {...dt, dueDate:i==idx? val : "", dueDateType:i==idx? type : ""}
    }); 
    setTransSheet(updatedRows);
  };
  React.useEffect(()=>{
    if(controlAcctTest.isControlAcct){
        if(selectedDueDate?.value){
            updateTransSheetDueDate(selectedDueDate.value, controlAcctTest.i, controlAcctTest.type);
        }else{updateTransSheetDueDate("", controlAcctTest.i, "")}
    }else{updateTransSheetDueDate("", controlAcctTest.i, "")}
  },[controlAcctTest.isControlAcct,controlAcctTest.type, selectedDueDate]);


  React.useEffect(() => {
    //Update netAmount if not updated and there are transactions. Default netAmount state is "Total" 
    if(transSheet?.length && netAmount === "Total"){
        const netAmount = transSheet.reduce((cum, row)=>{
          const amount = row?.debitCredit == 1? row?.amount : row?.debitCredit == 2? row?.amount*-1 : 0;
          return cum += isNaN(parseFloat(row.amount))? 0 : parseFloat(amount);
        },0);
        setNetAmount(netAmount);
    }
  },[transSheet]);

 React.useEffect(()=>{
    const row1 = transSheet[0];
    const row2 = transSheet[1];
    if(!row1?.description || !row1?.accountCode || !row1?.amount || !row2?.accountCode){
    setShowTransView(false)
    }
  },[transSheet]);

  return (
    <>
    <div className={`flex-row flex items-center py-1 gap-2 flex-wrap bg-gray-200 mx-3`}>
      <div className={`px-8  flex-row gap-2 hidden sm:flex `}>
          <input type='checkbox' className='size-4 cursor-pointer checkbox checkbox-success' checked={showBankBalances} onChange={()=>setShowBankBalances(!showBankBalances)}/>
          <p className='text-blue-800 text-[12px]'>Show Bank balances</p>
      </div>
      <div className={`px-8 flex-row gap-2 flex ${showTransView? '' : 'invisible'}`}>
          <input type='checkbox' className='size-4 cursor-pointer checkbox checkbox-success'  checked={showTransView} onChange={handleOnChangeShowRecord}/>
          <p className='text-blue-800 text-[12px]'>Show Record Entries</p>
      </div>
    </div>
    <div className={`absolute w-full flex justify-center items-center ${showBankBalances? '' : 'hidden'}`}>
      <CashAndBankBalances 
          processedLedgers={processedLedgers}
          chartOfAccounts={chartOfAccounts}
          coaStructure={coaStructure}
          handleCloseBankBal={()=>setShowBankBalances(false)}
          />
    </div>
    <div className={`px-9 pb-2 flex flex-row text-red-800 ${recordTransaction?.editTran? '' : 'hidden'}`}>
          <p className='font-bold'>Edit:  <span className='pl-2'>Transaction {recordTransaction?.editDetails?.transactionNo}; Reference: {recordTransaction?.editDetails?.reference}</span></p>
    </div>
    <div className='py-4 flex items-center justify-center'>
        <div className='shadow-lg overflow-y-auto m-3 px-2 mt-0 xl:w-fit'>
            <TransactionRow hideTitle={false}
              handleAddRemoveRow={handleAddRemoveRow}
              index={0}
              handleOnChange={handleOnChange}
              transSheet={transSheet}
              chartOfAccounts={chartOfAccounts}
              chartOfAccountSelection={chartOfAccountSelection}
              personalAcctsList={personalAcctsList}
              personalAccts={personalAccts}
              productsList={productsList}
              netAmount={netAmount}
              controlAcctsCode={controlAcctsCode}
              //netAmount={netAmount}
              //controlAcctsCode={controlAcctsCode}
              selectedDueDate={selectedDueDate}
              setSelectedDueDate={setSelectedDueDate}
              controlAcctTest={controlAcctTest}
            />
         
         <div className='hidden'>
          <p className={`text-left px-5 ${postError.error? 'text-red-600' : 'text-green-500'}`}>
            {postError.msg}
          </p>
        </div>
        <div className='py-4 px-4 hidden flex-row gap-2'>
          <input type='checkbox' className='size-4 cursor-pointer' checked={showTransView} onChange={handleOnChangeShowRecord}/>
          <p className='text-blue-800'>Show Record Entries</p>
        </div>
          <div className='p-5 hidden'>
            <button onClick={handleSubmit} className='btn btn-sm btn-info px-7'>Record</button>
          </div>
        </div>
        
    </div>
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
      
    <br/>
    <br/>
    
      <div className={`pt-2 px-3 fixed bottom-0 bg-gray-200 w-full mt-10`}>
          <button onClick={submitHandler} disabled={uploading} className='btn btn-info btn-sm px-7 inline-block mb-4 mr-7'>
            {recordTransaction?.editTran? 'Save' :'Record'}
          </button>
          <div className={`inline-flex flex-row flex-wrap gap-4 ${recordTransaction?.editTran? '' : 'hidden'}`}>
            <button onClick={handleDeleteTran} className='btn btn-error btn-sm px-5 inline-flex'>Delete</button>
          </div>
          <div className={`inline-flex flex-row flex-wrap gap-4 mx-7 ${transSheet[0].amount && transSheet[1].amount? '' : 'hidden'}`}>
            <button onClick={handleCancelTran} className='btn btn-neutral btn-sm px-5 inline-flex'>Cancel</button>
          </div>
          {uploading && <span className='text-red-500 inline-flex'>Recording journal, please wait...</span>}
        </div>
    </>
  )
}

export default PostContainerJournal;