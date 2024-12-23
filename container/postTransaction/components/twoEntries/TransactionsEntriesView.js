'use client'
import React from 'react'
import Draggable from 'react-draggable';
import { IoIosMove } from 'react-icons/io';
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
    <Draggable>
        <div className={`mr-3 cursor-move text-sm shadow-lg bg-[#f9fff9] shadow-green-100 xlc:mt-4 max-w-[500px] xlc:max-w-[300px] 2xl:max-w-[400px] p-3 border border-green-400 ${showTransView? '' : 'hidden'}`}>
            <div className='hidden w-full justify-center items-center'><IoIosMove size={22}/></div>
            <div className='flex flex-row items-center justify-between'>
                <p className='text-blue-800 font-bold pb-2 underline'>Record Transactions</p>
                <MdClose className='text-[22px] -mt-3 cursor-pointer text-red-400 hover:text-red-700 active:text-red-300'
                onClick={closeTransView}/>
            </div>
            {
                transSheet?.map((trans, i)=>{
                return(
                    <div key={`${i}key`} className={`flex flex-row ${(trans?.debitAccount && trans?.creditAccount)? '' : 'hidden'}`}>
                        <p>{i+1}.</p>
                        <div className='mb-2 pl-1 text-blue-400'>
                            <p className='text-gray-400'>Date: {trans.date}</p>
                            <p>Dr {accountName(trans?.debitAccount)?.accountName} 
                                <span className={`${trans?.debitSub? '' :'hidden'}`}>({subAccountName(trans?.debitSub)?.accountName})</span> - <span>{trans?.amount}</span>
                            </p>
                            <p>Cr {accountName(trans?.creditAccount)?.accountName} 
                                <span className={`${trans?.creditSub? '' :'hidden'}`}>({subAccountName(trans?.creditSub)?.accountName})</span> - <span>{trans?.amount}</span>
                            </p>
                            <p className='text-red-300'>({trans.description})</p>
                        </div>
                    </div>
                )
                })
            }
        </div>
    </Draggable>
  )
}

export default TransactionsEntriesView