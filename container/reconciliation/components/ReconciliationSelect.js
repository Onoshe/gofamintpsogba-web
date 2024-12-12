'use client'
import SelectionMainAccount from '@/container/postTransaction/components/generalComponents/SelectionMainAccount';
import React from 'react'
import  ReconciliationTable  from './ReconciliationTable';
import { sortArrayByDate } from '@/lib/sort/sortArrayByDate';
import { addDaysToDate, getDaysDifference } from '@/lib/date/getDaysBetweenDates';
import { getReconDataForDisplay } from '../getReconDataForDisplay';
import { formatToCurrency } from '@/lib/currency';
import { getReconReportData } from '../getReconReportData';
import { handleExcelExport } from '@/container/reports/utils/others/handleExcelExport';
import { BsList } from 'react-icons/bs';
import SavedReports from './SavedReports';



const ReconciliationSelect = ({form, setForm, controlAcctsCode, chartOfAccounts, notify,  chartOfAccountSelection, processedLedgers,
    reconAccount, setReconAccount, reconLedger, setReconLedger, reconDataForDislay,handleShowReconOthersCont,
     selAcctCode, setSelAcctCode, ledger, formOthers, reportData,  keys, keyTitles,reconOthers,
     setFormOthers, setReconOthers,resetCalculation,displayReport,setDisplayReport, data,
     savedReportView, setSavedReportView, user, mutate,
}) => {
     
    //const ledger = getDummyLedger(form);
    //console.log(reconOthers)
     let chartOfAcctsForRecon = chartOfAccountSelection?.filter((dt)=> dt.typeCode == controlAcctsCode.bank);
         chartOfAcctsForRecon = [{selectable:true, accountCode:'', accountName:'--- Select Bank ----'}, ...chartOfAcctsForRecon];
    
     const {transCount, transCountDrChk, transCountCrChk,
        closingStmtBal,closingCBBal, chequeOut, chequeInTran,reconTotal, errorAdj, stmtClPlusRecon,} = reconDataForDislay;
    const [toggleChecked, setToggleChecked] = React.useState(false);
    const [reportCont, setReportCont] = React.useState({show:false});
    
    
     const handleOnChange =(e)=>{
        const {name, value} = e.target;
       
        if(name === "dateFrom" || name === "dateTo"){
            const dateFromVal = new Date(form?.dateFrom).getTime();
            const dateToVal = new Date(form?.dateTo).getTime();
            if(dateFromVal > dateToVal){
                notify("error", "Period To cannot be earlier than period From!");
                setForm({...form, [name]:""});
             }else{
                setForm({...form, [name]:value})
             }  
        }else{
            setForm({...form, [name]:value})
        }
     }

     const handleResetReconTable = ()=>{
        setSelAcctCode("");
        setReconLedger([]);
        setReconAccount({coa:{}, ledger:[], openingBalRow:{}});
     }
     const handleResetRecon = ()=>{
        handleResetReconTable();
        setForm({dateFrom:'', dateTo:'', stmtClosingBalance:''});
     }
     

     const handleOnChangeSelectAcct =(e)=>{
        setSelAcctCode(e.target.value)
     }
     const handleCheckedTran = (tran, i) => {
        setReconLedger(prevReconLedger => {
            const reconLedgerUpdated = [...prevReconLedger];
            // Toggle the 'checked' value for the specific item
            reconLedgerUpdated[i] = { ...tran, checked: !tran.checked };
            return reconLedgerUpdated;
        });
        resetCalculation();
    };
    const handleSavedReports = ()=>{
        setReportCont({...reportCont, show:!reportCont.show});
    }
    //console.log(selAcctCode)
    React.useEffect(() => {
        if (selAcctCode) {
          const coa = chartOfAccounts?.find(dt => dt.accountCode === selAcctCode);
          if (coa && coa !== reconAccount.coa) {
            setReconAccount(prevState => ({ ...prevState, coa }));

            //Reset when selAcctCode or date change
            setReconOthers({...reconOthers, diff:parseFloat(errorAdj), add:0, less:0});
            setFormOthers({new:{description:'', amount:''}, forms:[]});
          }
          if(!form.dateFrom || !form.dateTo){
            //Reset when there's no form.dateFrom or form.dateTo
            setReconLedger([]);
            setReconOthers({...reconOthers, diff:parseFloat(errorAdj), add:0, less:0});
            setFormOthers({new:{description:'', amount:''}, forms:[]});
          }
          if(form.dateFrom && form.dateTo && ledger.length) {
            let openingBalRow = ledger?.find(dt => dt.description.toLowerCase().includes("opening balance"));
            setReconAccount({...reconAccount, openingBalRow:openingBalRow || {}});
            //Remove opening balance
            let ledgerFmt = ledger?.filter(dt => !dt.description.toLowerCase().includes("opening balance")); 
            ledgerFmt = ledgerFmt?.map(dt =>  ({ ...dt, checked: false }));
             setReconLedger(ledgerFmt);

             //Reset when selAcctCode or date change
            setReconOthers({...reconOthers, diff:parseFloat(errorAdj), add:0, less:0});
            setFormOthers({new:{description:'', amount:''}, forms:[]});
          }
        }else{
            //Reset when no Bank Ledger is selected
            handleResetRecon();
        }
      }, [selAcctCode, form.dateFrom, form.dateTo]);
    
    React.useEffect(()=>{
        //Date update
        if(form.dateFrom && form.dateTo){
            const daysDiff =  getDaysDifference(form.dateTo, form.dateFrom);
            if(daysDiff > 0){
                if(daysDiff > 91){
                  notify("error", "Reconciliation period cannot be more than 91 days!");
                  const dateToPlus91 = addDaysToDate(form.dateFrom, 91)
                  setForm({...form, dateTo:dateToPlus91});
                  handleResetRecon();   
                }
            }else{ setForm({...form, dateTo:form.dateFrom});} 
        }
    },[form.dateFrom, form.dateTo]);

    const handleToggleCheck =()=>{
        const toggleCheckedNew = !toggleChecked;
        setToggleChecked(toggleCheckedNew);
        const reconLedgerUpdated = reconLedger?.map((dt)=>{
           return {...dt, checked:toggleCheckedNew}
        })
        setReconLedger(reconLedgerUpdated);
    }
    
   const errorAdjReport =  formOthers.forms.length? `${reconOthers?.diff? formatToCurrency(reconOthers.diff) : '0.00'}`:`${errorAdj? formatToCurrency(errorAdj) : '0.00'}`;
   const isErrorAdjReport = parseInt(errorAdjReport.toString().replace("-", ""));

   //console.log(reconAccount, reconLedger)
  return (
    <div className='w-full flex md:justify-center items-center overflow-auto '>   
        <div className='w-full bg-gray-100 shadow-lg'>
            <div className='relative flex flex-col-reverse md:flex-row items-end  md:justify-between bg-blue-200 p-3'>
                    <div className="absolute top-2 left-3 flex flex-row gap-2 justify-between">
                        <div className='hover:tooltip-open tooltip tooltip-right' data-tip={'Save Reports'}>
                            <BsList size={24} className='text-[navy] hover:bg-teal-100 bg-blue-100 shadow-md rounded-lg tooltip-open tooltip-top tooltip cursor-pointer hover:text-blue-500 active:text-blue-300 rotate-180' 
                            onClick={handleSavedReports}
                            />
                        </div>
                        <p className='text-blue-800 font-[600]'>Account Reconciliation</p>
                    </div>
                    <SelectionMainAccount
                        title="Select Account" 
                        classNameCont={`${'flex-shrink-0'}`} 
                        classNameTitle={`hidden`} 
                        options={chartOfAcctsForRecon}
                        classNameContSel={`w-full max-w-[250px]`}
                        classNameBLine={''}
                        name="selAcct"
                        onChange={handleOnChangeSelectAcct}
                        value={selAcctCode || '--- Select Bank ----'}
                    />
                <div className='relative flex flex-col items-end my-3'>
                    <div className='flex flex-row flex-wrap items-center gap-2 mt-4 text-gray-700'>
                        <div className='flex flex-row items-center gap-1'>
                            <p>From</p>
                            <input type='date'  className='bg-blue-400 w-[130px]  rounded-sm px-1 border border-white cursor-pointer text-white'
                                name='dateFrom' value={form.dateFrom} onChange={handleOnChange}/>
                        </div>
                        <div className='flex flex-row items-center gap-1'>
                            <p>To</p>
                            <input type='date' className='bg-blue-400  w-[130px] rounded-sm px-1 border border-white cursor-pointer text-white'
                                name='dateTo' value={form.dateTo} onChange={handleOnChange}/>
                        </div>
                    </div>
                </div>
            </div>
            <SavedReports reportCont={reportCont} setReportCont={setReportCont}
                data={data} savedReportView={savedReportView} setSavedReportView={setSavedReportView}
                displayReport={displayReport} setDisplayReport={setDisplayReport}
                user={user} mutate={mutate} notify={notify}
            />
            <div className='flex flex-col gap-1 md:flex-row justify-between bg-white md:m-2 text-blue-800 py-3'>
                <div className='px-3 flex flex-col gap-1 text-[13px]'>
                    <div className='flex flex-row'>
                        <p className='w-[150px] sm:text-right mr-1 text-amber-950'>Account to Reconcile:</p>
                       {!reconAccount.coa?.accountCode?<p>Select Account</p>:<p>{reconAccount.coa?.accountCode+": "+reconAccount.coa?.accountName}</p>}
                    </div>
                    <div className='flex flex-row'>
                        <p className='w-[150px] sm:text-right mr-1 text-amber-950'>Ending Book balance:</p>
                        <p>{closingCBBal? formatToCurrency(closingCBBal): '0.00'}</p>
                    </div>
                </div>
                <div className='px-3 flex flex-col gap-1 text-[13px]'>
                    
                    <div className='flex flex-row'>
                        <p className='w-[150px] sm:text-right mr-1 text-amber-950'>Statement Date:</p>
                        <p>{form.dateTo && new Date(form.dateTo).toDateString()}</p>
                    </div>
                    <div  className='flex flex-row flex-wrap'>
                        <p className='w-[150px] sm:text-right mr-1 text-amber-950'>Ending Statement bal:</p>
                        <input className='w-[150px] lg:w-[180px] bg-white py-[2px] px-2 border border-gray-400 rounded-sm' name="stmtClosingBalance" value={form.stmtClosingBalance} onChange={handleOnChange}/>
                    </div>
                </div>
            </div>
            <div className={`${reconLedger.length? '' : 'hidden'}`}>
                <div className='px-2 max-h-[45vh0] overflow-auto'>
                    <ReconciliationTable
                        reconData={reconAccount.coa}
                        keys={keys}
                        keyTitles={keyTitles}
                        ledgerArr={reconLedger}
                        handleCheckedTran={handleCheckedTran}
                        toggleChecked={toggleChecked}
                        handleToggleCheck={handleToggleCheck}
                    />
                </div>
                <div className='flex md:flex-row flex-col-reverse justify-between bg-blue-100 border border-gray-500 m-2 text-blue-800'>
                    <div className='p-3 flex flex-col gap-2 text-sm'>
                        <div className=' flex flex-col'>
                                  <div className='px-3 py-2 text-gray-700 text-[12px] bg-white flex flex-col'>  
                                    <div className='flex flex-col flex-wrap'>
                                        <p className='text-right '>Transactions count: {transCount}</p>
                                        <p className='text-right'>Reconciled: {transCountDrChk + transCountCrChk}</p>
                                        <p className='text-right'>Unreconciled: {transCount - (transCountDrChk + transCountCrChk)}</p>
                                        <p className='text-right text-blue-800 hidden'>Ending Cashbook balance: {closingCBBal? formatToCurrency(closingCBBal): '0.00'}</p>
                                    </div>
                                    <div className='hidden'>
                                        <p className='text-right text-red-700 font-bold'>Unreconciled: {errorAdj? formatToCurrency(errorAdj) : '0.00'}</p>
                                    </div>
                                </div>
                                
                        </div>
                        <div className='flex flex-row flex-wrap items-end'>
                            <button className='bg-blue-500 px-4 rounded-sm hover:bg-blue-700 active:translate-y-[1px] active:bg-blue-600 text-white btn-sm w-fit '
                             onClick={()=>setDisplayReport({...displayReport, show:true})}>Report</button>
                            <button className={`ml-2 text-right text-[12px]  border  w-fit py-1 px-2 cursor-pointer ${isErrorAdjReport? 'text-red-700 active:bg-red-200  hover:bg-red-100 border-red-400' : 'border-teal-300 bg-teal-50'}`}
                                onClick={handleShowReconOthersCont} disabled={Math.abs(errorAdj)> 1? '' : ''}>Error/Adj: {errorAdjReport}
                             </button>
                        </div>
                    </div>
                    <div className='p-3 flex flex-col gap-2 text-[12px]'>
                        
                        <div className='flex flex-row justify-end'>
                            <p className='text-right mr-1'>Statement Ending Balance:</p>
                            <p className='w-[100px] text-right bg-white py-[2px] border  rounded-sm px-2'>{closingStmtBal? formatToCurrency(closingStmtBal): '0.00'}</p>
                        </div>
                        <div  className='flex flex-row justify-end '>
                            <p className='mr-1'>- Outstanding cheques:</p>
                            <p className='w-[100px] text-right  px-2'>{chequeOut? formatToCurrency(chequeOut) : '0.00'}</p>
                        </div>
                        <div  className='flex flex-row justify-end -my-2'>
                            <p className='mr-1'>+ Deposits in Transit:</p>
                            <p className='w-[100px] text-right  px-2'>{chequeInTran? formatToCurrency(chequeInTran) : '0.00'}</p>
                        </div>
                        <div  className='flex flex-row justify-end'>
                            <p className='mr-1'>+ - Error/Adjustment:</p>
                            <p className='w-[100px] text-right  px-2'>{errorAdj? formatToCurrency(errorAdj) : '0.00'}</p>
                        </div>
                        <div  className='flex flex-row justify-end'>
                            <p className='mr-1'>Reconciled Total:</p>
                            <p className='w-[100px] text-right bg-white py-[2px] border rounded-sm px-2'>{reconTotal? formatToCurrency(reconTotal) : '0.00'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`w-full flex justify-end ${reconLedger?.length? '' : 'hidden'}`}>
                <button className='btn btn-sm px-7 btn-error hover:tooltip-open tooltip tooltip-left' data-tip={'Reset reconciliation'}
                 onClick={handleResetRecon}>Reset</button>
            </div>
        </div>
    </div>
  )
}

export default ReconciliationSelect;

const getDummyLedger =(form)=> {
        dummyLedger.filter((dt)=>{
        const tranDate = new Date(dt.transactionDate).getTime();
        const stDt = new Date(form.dateFrom).getTime();
        const endDt = new Date(form.dateTo).getTime();
        const valid = tranDate >= stDt && tranDate < endDt;
        return valid
     });
}

var dummyLedger = [
    {
        "transactionDate": "2024-01-01",
        "description": "Opening balance",
        "reference": "000001",
        "debit": "",
        "credit": "",
        "amount": 5000,
        "balance": 5000
    },
    {
        "transactionDate": "2024-01-03",
        "description": "Customer payment",
        "reference": "000002",
        "debit": 2000,
        "credit": "",
        "amount": 2000
    },
    {
        "transactionDate": "2024-01-05",
        "description": "Supplier payment",
        "reference": "000003",
        "debit": "",
        "credit": 1500,
        "amount": -1500
    },
    {
        "transactionDate": "2024-01-10",
        "description": "Utility bill",
        "reference": "000004",
        "debit": "",
        "credit": 500,
        "amount": -500
    },
    {
        "transactionDate": "2024-01-20",
        "description": "Cash deposit at bank",
        "reference": "000005",
        "debit": 3000,
        "credit": "",
        "amount": 3000
    },
    {
        "transactionDate": "2024-01-30",
        "description": "Payroll",
        "reference": "000006",
        "debit": "",
        "credit": 2500,
        "amount": -2500
    },
    {
        "transactionDate": "2024-01-30",
        "description": "Bank fees",
        "reference": "000007",
        "debit": "",
        "credit": 50,
        "amount": -50
    },
    {
        "transactionDate": "2024-02-01",
        "description": "Opening balance",
        "reference": "000001",
        "debit": "",
        "credit": "",
        "amount": 5450,
        "balance": 5450
    },
    {
        "transactionDate": "2024-02-05",
        "description": "Customer payment",
        "reference": "000008",
        "debit": 1500,
        "credit": "",
        "amount": 1500
    },
    {
        "transactionDate": "2024-02-10",
        "description": "Supplier payment",
        "reference": "000009",
        "debit": "",
        "credit": 2000,
        "amount": -2000
    },
    {
        "transactionDate": "2024-02-15",
        "description": "Loan received",
        "reference": "000010",
        "debit": 5000,
        "credit": "",
        "amount": 5000
    },
    {
        "transactionDate": "2024-02-28",
        "description": "Insurance premium",
        "reference": "000011",
        "debit": "",
        "credit": 500,
        "amount": -500
    },
    {
        "transactionDate": "2024-02-28",
        "description": "Bank fees",
        "reference": "000012",
        "debit": "",
        "credit": 100,
        "amount": -100
    },
    {
        "transactionDate": "2024-03-01",
        "description": "Opening balance",
        "reference": "000001",
        "debit": "",
        "credit": "",
        "amount": 9350,
        "balance": 9350
    },
    {
        "transactionDate": "2024-03-05",
        "description": "Customer payment",
        "reference": "000013",
        "debit": 3000,
        "credit": "",
        "amount": 3000
    },
    {
        "transactionDate": "2024-03-10",
        "description": "Supplier payment",
        "reference": "000014",
        "debit": "",
        "credit": 4500,
        "amount": -4500
    },
    {
        "transactionDate": "2024-03-15",
        "description": "Rent",
        "reference": "000015",
        "debit": "",
        "credit": 2000,
        "amount": -2000
    },
    {
        "transactionDate": "2024-03-25",
        "description": "Dividend income",
        "reference": "000016",
        "debit": 1000,
        "credit": "",
        "amount": 1000
    },
    {
        "transactionDate": "2024-03-30",
        "description": "Office supplies",
        "reference": "000017",
        "debit": "",
        "credit": 700,
        "amount": -700
    }
];