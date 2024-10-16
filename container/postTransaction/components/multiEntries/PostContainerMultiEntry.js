'use client'
import React, {useEffect, useState} from 'react';
import TransactionRow from './TransactionRow';
import { validateTransactionsMulti } from '@/lib/validation/validateTransactionMulti';
import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import TransactionsEntriesView from './TransactionsEntriesView';
import { ToastContainer } from 'react-toastify';
import { toastNotify } from '../utils/toastNotify';
import { TabsComponent } from '@/components/forms/TabsComponent';
import 'react-toastify/dist/ReactToastify.css';
import { handleSubmitMultiEntry } from '../utils/handleSubmitMultiEntry';
import { useRouter } from 'next/navigation';
import { controlAcctChecker } from '../utils/controlAccountChecker';


const PostContainerMultiEntry = ({chartOfAccounts, chartOfAccountSelection, personalAcctsList, personalAccts, 
  productsList, controlAcctsCode, runDispatchClientDataCall, user, vendors, customers, transSheet, 
  setTransSheet, recordTransaction, handleDeleteTran, dispatchTranSheetMultiEntryReset}) => {
  //const [transSheet, setTransSheet] = useState([{debitCredit:1, date:"", reference:''}, {debitCredit:2}]);
  //const [netAmount, setNetAmount] = useState('Total');
  const [showTransView, setShowTransView] = useState(true);
  const [activeTab, setActiveTab] = useState(true);
  const [postError, setPostError] = useState({msg:'', error:false, color:'text-gray-600'});
  const router = useRouter();
  const [selectedDueDate, setSelectedDueDate] = React.useState({value:30, label:'Select'});
  const [uploading, setUploading] = React.useState(false);
  
 //console.log(transSheet);



const handleAddRemoveRow =(dt, i)=>{
    //console.log(dt, i);
    if(i===0){
        setTransSheet([...transSheet, {debitCredit:1}])
    }else{
        const newRows = transSheet.filter((dt, idx)=> {return i !== idx});
        setTransSheet(newRows)
    }
  }
  const netAmount = transSheet.reduce((cum, row)=>{
    const amount = row?.debitCredit == 1? row?.amount : row?.debitCredit == 2? row?.amount * -1 : 0;
    return cum += isNaN(parseFloat(row.amount))? 0 : parseFloat(amount);
  },0);

  const handleSubmit =async ()=>{
    //console.log(transSheet)
    setUploading(true);
    const validateRes = validateTransactionsMulti(transSheet, chartOfAccounts, controlAcctsCode, netAmount)
    //console.log(validateRes)
    if(validateRes?.error){
     const errorMsg = getErrorMessage(validateRes?.errorType, validateRes?.key, validateRes?.rowIndex, validateRes?.title);
     setPostError({msg:errorMsg, error:validateRes?.error});
     toastNotify('error', errorMsg);
     setUploading(false)
    }else{
     await handleSubmitMultiEntry({transSheetForm:transSheet, chartOfAccounts, user, vendors, customers,  setTransSheet, runDispatchClientDataCall, recordTransaction, 
      notify:toastNotify, dispatchTranSheetMultiEntryReset, router})
      .then(()=>{
        setUploading(false);
      })
     //setTransSheet, runDispatchClientDataCall, recordTransaction, dispatchTranSheetTwoEntryReset,
     //router, 
     setPostError({msg:'Posting successfull', error:false});
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
    setTransSheet(updatedRows);
    setPostError({msg:'', error:false})
 }

  const controlAcctTest = controlAcctChecker(transSheet, chartOfAccounts, controlAcctsCode);
  //console.log(controlAcctTest)
  const updateTransSheetDueDate = (val, idx, type)=>{
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

 React.useEffect(()=>{
    const row1 = transSheet[0];
    const row2 = transSheet[1];
    if(!row1?.description || !row1?.accountCode || !row1?.amount || !row2?.accountCode){
    setShowTransView(false)
    }
  },[transSheet]);


  React.useEffect(() => {
    //Set dueDate from transSheet on mounted, especially during edit 
    transSheet?.forEach(tran => {
      if(tran?.dueDate){ setSelectedDueDate({value:tran.dueDate, label:`${tran.dueDate} Days`}) }});
  }, []);

  return (
    <>
    <div className='flex flex-row items-center flex-wrap -mt-3 xl:ml-10 invisible'>
      <TabsComponent
        activeTab={activeTab} setActiveTab={setActiveTab} tab1Name="RECEIPTS" tab2Name="PAYMENT" tab1Title="Receipts" tab2Title="Payment"
      />
      {activeTab==="PAYMENT"? <p className='text-red-900 font-bold'>Record payment</p> : <p className='text-teal-800 font-bold'>Record receipt</p>}
    </div>
    
    <div className={`pr-9 pl-10 pb-3 flex flex-row text-red-800 ${recordTransaction?.editTran? '' : 'hidden'}`}>
      <p>Edit:  <span className='pl-2'>Transaction {recordTransaction?.editDetails?.transactionNo}; Reference: {recordTransaction?.editDetails?.reference}</span></p>
    </div>
    <div className='pb-4 flex items-center justify-center pr-6'>
        <div className='shadow-lg px-3 overflow-y-auto m-6 mt-0 xl:w-fit'>
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
              selectedDueDate={selectedDueDate}
              setSelectedDueDate={setSelectedDueDate}
              controlAcctTest={controlAcctTest}
            />
         
         <div className='hidden'>
          <p className={`text-left px-5 ${postError.error? 'text-red-600' : 'text-green-500'}`}>
            {postError.msg}
          </p>
        </div>
        <div className='flex flex-row gap-3 items-center py-4'>
            <p className={`text-red-800 font-bold ${controlAcctTest.isControlAcct? 'flex' : 'hidden'}`}>
                Default {controlAcctTest.controlAcct} due date is 30 days.
            </p>
            <div className='px-4 flex-row gap-2 hidden'>
              <input type='checkbox bg-white' className='size-4 cursor-pointer' checked={showTransView} onChange={handleOnChangeShowRecord}/>
              <p className='text-blue-800'>Show Record Entries</p>
            </div>
          </div>
          <div className='p-5 hidden'>
            <button onClick={handleSubmit} className='btn btn-info btn-sm px-7'>Record</button>
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
    <div className='px-5 py-3 fixed bottom-0 bg-gray-200 w-full mt-10'>
        <button onClick={handleSubmit} className='hidden btn btn-info btn-sm px-7'>Record</button>
        <button onClick={handleSubmit} className='btn btn-info btn-sm px-7 inline-block mr-10 '>
            {recordTransaction?.editTran? 'Save' :'Record'}
        </button>
        <div className={`inline-flex flex-row flex-wrap gap-4 ${recordTransaction?.editTran? '' : 'hidden'}`}>
            <button onClick={handleDeleteTran} className='btn btn-error btn-sm px-5 inline-flex'>Delete</button>
        </div>
    </div>
    </>
  )
}

export default PostContainerMultiEntry;