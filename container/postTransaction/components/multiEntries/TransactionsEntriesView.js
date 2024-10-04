'use client'
import React from 'react'
import { MdClose } from 'react-icons/md';


const TransactionsEntriesView = ({transSheet, chartOfAccounts, personalAccts, showTransView, closeTransView}) => {


 const accountName = (acctCode)=>{
    const chartOA = chartOfAccounts?.find((dt)=> dt.accountCode == acctCode);
    return chartOA;
 }

 const subAccountName = (acctCode)=>{
    const type = acctCode?.includes('C-')? personalAccts.customers : personalAccts.vendors;
    const personalAcct = type?.find((dt)=> dt.accountCode == acctCode);
    return personalAcct;
 }

 return (
    <div className={`mr-3 text-sm shadow-lg bg-[#f9fff9] shadow-green-100 min-w-[300px] xlc:mt-4 max-w-[800px]  p-3 border border-green-400 ${showTransView? '' : 'hidden'}`}>
        <div className='flex flex-row items-center justify-between'>
            <p className='text-blue-800 font-bold pb-2 underline'>Record Transactions</p>
            <MdClose className='text-[22px] -mt-3 cursor-pointer text-red-400 hover:text-red-700 active:text-red-300'
             onClick={closeTransView}/>
        </div>
        <div className={`flex flex-col ${(transSheet[0]?.accountCode)? '' : 'hidden'}`}>
             <p className='text-gray-400'>1. Date: {transSheet[0].date}</p>
            {
                transSheet?.map((trans, i)=>{
                return(
                    <div key={`${i}key`} className='mb-2 pl-1 text-blue-400 ml-3'>
                        <p>{trans.debitCredit==1? 'Dr' : 'Cr'} {accountName(trans?.accountCode)?.accountName} 
                            <span className={`${trans?.subCode? '' :'hidden'}`}>({subAccountName(trans?.subCode)?.accountName})</span> - <span>{trans?.amount}</span>
                        </p>    
                    </div>
                )
                })
            }
            <p className='text-red-300 ml-3'>({transSheet[0].description})</p>
        </div>
    </div>
  )
}

export default TransactionsEntriesView