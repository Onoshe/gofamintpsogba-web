import React from 'react';
import { getLedgerCodesForAcctClass } from '../../utils/getLedgerCodesForAcctClass';
import { formatToCurrency } from '@/lib/currency';
import Draggable from 'react-draggable';
import { MdClose, MdDragHandle } from 'react-icons/md';
import { IoIosMove } from 'react-icons/io';


const CashAndBankBalances = ({coaStructure, chartOfAccounts, processedLedgers, handleCloseBankBal}) => {
  const {bank, cash} =  getLedgerCodesForAcctClass(chartOfAccounts, coaStructure, ['bank', 'cash'])
  

  return (
    
        <Draggable>
          <div className='text-gray-900 shadow-lg bg-blue-50 cursor-move z-50 max-w-fit'>
            <div className='bg-blue-400 py-2 px-3 text-white font-[600] flex flex-row justify-between'>
              <p className=''>Cash and bank balances</p>
              <IoIosMove size={22}/>
              <MdClose size={22} className='cursor-pointer hover:text-red-500 active:text-red-300'
               onClick={handleCloseBankBal}/>
              
            </div>
            
            <div className='flex justify-center flex-col pb-4'>
              <div className='px-3'>
                <p className='pt-5 text-blue-600 underline '>Current Bank balance</p>
                  <div className='max-h-[160px] bg-white overflow-auto p-2'>
                    {bank?.map((dt, i)=>{
                        const bank = processedLedgers[dt.accountCode];
                        return(
                          <p key={`${i}key`}>{bank?.name} <span className='ml-5'>${formatToCurrency(bank?.closingBal)}</span></p>
                        )
                    })}
                  </div>
              </div>
              <div className='px-3'>
                <p className='pt-5 text-blue-600 underline'>Current Cash balance</p>
                  <div className='max-h-[160px] bg-white overflow-auto p-2'>
                    {cash?.map((dt, i)=>{
                        const cash = processedLedgers[dt.accountCode];

                        return(
                          <p key={`${i}key`}>{cash?.name} <span className='ml-5'>${formatToCurrency(cash?.closingBal)}</span></p>
                        )
                    })}
                  </div>
              </div>
            </div>
          </div>
        </Draggable>
  )
}

export default CashAndBankBalances