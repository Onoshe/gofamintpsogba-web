'use client'
import React, {act, useState} from 'react';
import TransactionRow from './TransactionRow';
import HorizontalLine from '@/components/misc/HorizontalLine';
import { RadioButtonsPair } from '@/components/forms/RadioButtonsPair';
import PostContainerTwoEntryByUpload from './PostContainerTwoEntryByUpload';
import { getSubAccounts } from '../utils/getSubAccounts';
import { validateTransactions } from '@/lib/validation/validateTransaction';
import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import TransactionsEntriesView from './TransactionsEntriesView';
import { TabsComponent } from '@/components/forms/TabsComponent';
import { handleSubmitTwoEntry } from '../utils/handleSubmitTwoEntry';
import { useRouter } from 'next/navigation';
import CashAndBankBalances from '../balancesComponent/CashAndbankBalances';
import { LedgersManager } from '@/container/reports/utils/ledgers/ledgersManger';
import { getLedgerCodesForAcctClass } from '../../utils/getLedgerCodesForAcctClass';
import { getPermissions, pmsActs } from '@/lib/permissions/permissions';
import { MdInfoOutline } from 'react-icons/md';
import Draggable from 'react-draggable';


const PostContainerTwoEntry = ({checkedBtn, setCheckedBtn, chartOfAccounts, coaStructure, chartOfAccountSelection, personalAccts, products,
  personalAcctsList, controlAcctsCode, user, vendors, customers, clientsDataCall,  runDispatchClientDataCall, transSheet, 
  setTransSheet, recordTransaction, handleCancelTran, dispatchTranSheetTwoEntryReset, controlAcctChecker, 
  transactions, transactionsDetails, reportDate, notify, bookLoan, setBookLoan, bookLoanCheckbox}) => {
  //const [transSheet, setTransSheet] = useState([{date:'', description:'', debitAccount:'', creditAccount:'', debitSub:'', creditSub:'', reference:'', amount:''}]);
  const router = useRouter();
  const [showTransView, setShowTransView] = useState(false);
  const [activeTab, setActiveTab] = useState('PAYMENT');
  const [postError, setPostError] = useState({msg:'', error:false, color:'text-gray-600'});
  const [postBtn, setPostBtn] = useState({show:false});
  const [transSheets, setTransSheets] = useState([]); //TransSheet for uploaded data
  const [resetUploadTableCall, setResetUploadTableCall] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  const [showBankBalances, setShowBankBalances] = React.useState(false);
  let transProcessor = new LedgersManager({trans:transactions, transactions:transactionsDetails, chartOfAccounts, customers, vendors, products, controlAcctsCode, coaStructure, dateForm:reportDate});
  let ledgers = transProcessor.processTransactions(reportDate?.startDate, reportDate?.endDate);
  const processedLedgers = ledgers.processedLedgers;
  const [checkedSelect, setCheckedSelect] = React.useState(false);
  //const [bookLoan, setBookLoan] = React.useState(false);

  const handleSubmit = async ()=>{
    setUploading(true);
     const perms = await getPermissions({user, act:pmsActs.POST_TRAN, form:checkedBtn === "BYENTRY"? transSheet: transSheets});
      if(!perms.permit){
        setUploading(false);
        return notify("error", perms.msg)
      };

    if(checkedBtn === "BYENTRY"){
        const transSheetForm = transSheet?.map((form)=>{ //Purpose?- It's sets sub account to null when accountCode is not a control account
          const drAcct = chartOfAccounts?.find((dt)=> dt.accountCode == form.debitAccount);
          const crAcct = chartOfAccounts?.find((dt)=> dt.accountCode == form.creditAccount);
          const cntrlAcct = [parseInt(controlAcctsCode.receivables), parseInt(controlAcctsCode.payables)];
          if(!cntrlAcct.includes(parseInt(drAcct?.typeCode))){
            form.debitSub = ""; 
          };
          if(!cntrlAcct.includes(parseInt(crAcct?.typeCode))){
            form.creditSub = ""; 
          };
          return form
        });
      const validateRes = validateTransactions(transSheetForm, chartOfAccounts, personalAcctsList, controlAcctsCode, 'formType', bookLoan)
      //return console.log(validateRes, bookLoan)
      if(validateRes?.error){
        const errorMsg = getErrorMessage(validateRes?.errorType, validateRes?.key, validateRes?.rowIndex, validateRes?.title);
        setPostError({msg:errorMsg, error:validateRes?.error, color:'text-red-600'});
        notify('error', errorMsg);
        setUploading(false);
      }else{
        //console.log(transSheet); setUploading(false); return;
       await handleSubmitTwoEntry({transSheetForm, chartOfAccounts, user, vendors, customers,  setTransSheet, runDispatchClientDataCall, recordTransaction, dispatchTranSheetTwoEntryReset, 
          router, notify, resetUploadTableCall, setResetUploadTableCall, bookLoan})
          .then(()=>{
            setUploading(false);
            setPostError({msg:'Posting successfull', error:false, color:'text-green-600'});
          });
      }
    }else{ //BY UPLOAD
      if(postError?.error){
        setUploading(false);
        return notify('error', postError?.msg);
      }else{
        if(transSheets?.length){
          //setUploading(true);
          await handleSubmitTwoEntry({transSheetForm:transSheets, chartOfAccounts, user, vendors, customers,  setTransSheet, runDispatchClientDataCall, recordTransaction, dispatchTranSheetTwoEntryReset, 
             router, notify, resetUploadTableCall, setResetUploadTableCall, jVoucher:checkedSelect? 'JOURNAL' : ''})
             .then(()=>{
               setUploading(false);
               setPostError({msg:'Posting successfull', error:false, color:'text-green-600'});
             });
           //setPostBtn({show:true});
         }else{setUploading(false); notify('error', "Data for posting not available");}
      }
    }
  }

  const handleAddRemoveRow =(dt, i)=>{
    if(i===0){
        setTransSheet([...transSheet, {}])
    }else{
        const newRows = transSheet.filter((dt, idx)=> {return i !== idx});
        setTransSheet(newRows)
    }
  }
  const handleOnChange = (e, i) => {
    const { name, value } = e.target;
    const updatedRows = transSheet.map((row, idx) =>
        idx === i ? { ...row, [name]: value } : row
    );
    setPostError({msg:'', error:false})
    setTransSheet(updatedRows);
}
const handleTransView =(act)=>{
  setShowTransView(act)
}


 React.useEffect(()=>{
  setPostError({msg:'', error:false});
 },[checkedBtn]);

 let showRecordEntries = false;
 if(transSheet[0]?.description && transSheet[0]?.debitAccount && transSheet[0]?.creditAccount && transSheet[0]?.amount){
  showRecordEntries = true;
 }
 const handleOnChangeShowRecord =()=>{
  const row1 = transSheet[0];
  if(!row1?.description || !row1?.debitAccount || !row1?.creditAccount){
    notify('error', 'Please, fill the transaction row');
    setShowTransView(false)
  }else{
    setShowTransView(!showTransView)
  }
 }
 const handleOnChangeShowBankBal =(act)=>{
  setShowBankBalances(!showBankBalances)
 }
 
 React.useEffect(()=>{
   const row1 = transSheet[0];
   if(!row1?.description || !row1?.debitAccount || !row1?.creditAccount){
    setShowTransView(false)
   }
 },[transSheet]);

 //console.log(transSheet, bookLoan)
 React.useEffect(()=>{
    if(!bookLoan){
      const updatedRows = transSheet.map((row, idx) => {
        return { ...row, dueDate:''};
      });
      setTransSheet(updatedRows);
    }
 },[bookLoan]);
 

  return (
    <div className={`py-4 w-full ${showBankBalances? 'relative' :'' }`}>
        <RadioButtonsPair
            classNameCont={'m-3 ml-5'}
            btn1Name="BYENTRY"
            btn1Title="Create by Entry"
            btn2Name="BYUPLOAD"
            btn2Title="Create by Upload"
            checkedBtn={checkedBtn}
            setCheckedBtn={e=>setCheckedBtn(e)}
        />
        <HorizontalLine widths={98} bColor={'silver'}/>
        
        <div className=''>
          <p className={`text-center pt-4 px-10 ${postError.error? 'text-red-600' : 'text-green-500'} hidden`}>
            {postError.msg}
          </p>
        </div>
        <div className={`w-full absolute flex justify-center items-center ${showBankBalances? '' : 'hidden'}`}>
            <CashAndBankBalances 
                processedLedgers={processedLedgers}
                chartOfAccounts={chartOfAccounts}
                coaStructure={coaStructure}
                handleCloseBankBal={handleOnChangeShowBankBal}
                />
         </div>
        {checkedBtn === "BYENTRY" && <>
           <div className={`flex-row flex gap-2 flex-wrap pt-3`}>
            <div className={` px-8 pb-0  flex-row gap-2 flex`}>
                <input type='checkbox' className='size-4 cursor-pointer checkbox checkbox-success' checked={showBankBalances} onChange={handleOnChangeShowBankBal}/>
                <p className='text-blue-800'>Show Bank balances</p>
            </div>
            <div className={`${bookLoanCheckbox?.show? 'flex' : 'hidden'} pb-0 items-center  flex-row gap-2 bg-gray-100 py-1 px-2`}>
                <input type='checkbox' className='size-4 cursor-pointer checkbox checkbox-success' checked={bookLoan} onChange={()=>setBookLoan(!bookLoan)}/>
                <p className='text-blue-800'>Book a Loan</p>
                <div className='flex flex-row  text-blue-600 relative'>
                  <MdInfoOutline className='peer text-blue-500 cursor-pointer active:text-blue-500 hover:text-blue-700 text-[18px]'
                      />
                    <div className={`absolute hidden peer-hover:block w-[220px] text-white bg-slate-700/90 left-5 px-2 py-1 text-sm border border-blue-400 rounded-md z-50`}>
                         <p className='font-bold'>Loan from the Company</p>
                         If transaction is a staff loan or other loan from the company, check this box to book it. 
                        <p>The loan due days field will show which will enable you to enter the due date for the loan.</p>
                    </div>
                </div>
            </div>
            <div className={`px-8 pb-0  flex-row gap-2 flex ${showRecordEntries? '' : 'invisible'}`}>
                <input type='checkbox' className='size-4 cursor-pointer checkbox checkbox-success' checked={showTransView} onChange={handleOnChangeShowRecord}/>
                <p className='text-blue-800'>Show Record Entries</p>
            </div>
          </div>
          <div className='flex flex-row items-center flex-wrap -mt-5 invisible'>
            <TabsComponent
              activeTab={activeTab} setActiveTab={setActiveTab} tab1Name="RECEIPTS" tab2Name="PAYMENT" tab1Title="Receipts" tab2Title="Payment"
            />
            {activeTab==="PAYMENT"? <p className='text-red-900 font-bold'>Record payment</p> : <p className='text-teal-800 font-bold'>Record receipt</p>}
          </div>
          </>}
        <div className={`px-9 pb-2 flex flex-row text-red-800 ${recordTransaction?.editTran? '' : 'hidden'}`}>
          <p>Edit:  <span className='pl-2'>Transaction {recordTransaction?.editDetails?.transactionNo}; Reference: {recordTransaction?.editDetails?.reference}</span></p>
        </div>
        {checkedBtn === "BYENTRY"?
          <div className='flex flex-col xlc:flex-row overflow-x-auto'>
            <div className='shadow-lg m-6 mb-0 mr-2 mt-0 w-fit pb-6 pr-10 bg-sky-50'>
              
            {transSheet?.map((dt, i)=>{
                const personalAcctsSelDr =  getSubAccounts(dt.debitAccount, chartOfAccounts, personalAccts);
                const personalAcctsSelCr =  getSubAccounts(dt.creditAccount, chartOfAccounts, personalAccts);
                //console.log(personalAcctsSelDr, personalAcctsSelCr)
                return(
                   <div key={`${i}row`} className='relative'>
                    <p className='absolute left-2 font-bold top-0 text-blue-700'>{i+1}.</p>
                    <TransactionRow hideTitle={i > 0}
                        classNameRowCont={`${i%2==0? '' : 'bg-[#fff]'} ${i===0 && 'pt-5'} pb-6`}
                        handleAddRemoveRow={()=>handleAddRemoveRow(dt, i)}
                        index={i}
                        handleOnChange={(e)=>handleOnChange(e, i)}
                        transSheet={transSheet}
                        chartOfAccounts={chartOfAccounts}
                        chartOfAccountSelection={chartOfAccountSelection}
                        personalAccts={personalAccts}
                        controlAcctsCode={controlAcctsCode}
                        personalAcctsSelDr={personalAcctsSelDr || [{id:'', accountCode:'', accountName:'--No Sub Acct--', selectable:true}]} 
                        personalAcctsSelCr={personalAcctsSelCr || [{id:'', accountCode:'', accountName:'--No Sub Acct--', selectable:true}]}
                        recordTransaction={recordTransaction}
                        controlAcctChecker={controlAcctChecker}
                        setTransSheet={setTransSheet}
                        bookLoan={bookLoan}
                    />
                  </div>
                )
                })
            }
            </div>
             <div className='pl-5 pr-20 xlc:px-2  xlc:block items-center justify-center mb-10 lg:mb-0'>
                
                  <TransactionsEntriesView 
                    transSheet={transSheet}
                    chartOfAccounts={chartOfAccounts}
                    personalAccts={personalAccts}
                    personalAcctsList={personalAcctsList}
                    showTransView={showTransView}
                    closeTransView={()=>handleTransView(false)}
                    />
                
                
             </div>
          </div>
         : <PostContainerTwoEntryByUpload
            postError={postError}
            setPostError={setPostError}
            chartOfAccounts={chartOfAccounts}
            personalAcctsList={personalAcctsList}
            controlAcctsCode={controlAcctsCode}
            postBtn={postBtn}
            setPostBtn={setPostBtn}
            setTransSheets={setTransSheets}
            resetUploadTableCall={resetUploadTableCall}
            setUploading={setUploading}
            checkedSelect={checkedSelect}
            setCheckedSelect={setCheckedSelect}
         />
        }
         
        <div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className={`pt-2 px-3 fixed bottom-0 bg-gray-200 w-full mt-10 `}>
          <button onClick={handleSubmit} disabled={uploading} className='btn btn-sm btn-info px-7 inline-block mr-10 mb-4'>
            {recordTransaction?.editTran? 'Save' :'Record'}
          </button>
          <div className={`inline-flex flex-row flex-wrap gap-4 ${recordTransaction?.editTran? '' : 'hidden'}`}>
            <button onClick={handleCancelTran} className='btn btn-sm btn-neutral px-5 inline-flex'>Cancel</button>
          </div>
          {uploading && <span className='text-red-500'>{checkedBtn === "BYENTRY"? "Recording transaction, please wait..." : "Uploading transactions, please wait..."}</span>}
        </div>
    </div>
  )
}
//${checkedBtn === "BYENTRY" || postBtn?.show? '' : 'hidden'}
export default PostContainerTwoEntry;