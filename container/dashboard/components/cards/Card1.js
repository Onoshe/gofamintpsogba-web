'use client'
import React from 'react';



export const Card1 = ({title1, amount1, title2, amount2}) => {
   

  
  return (
        <div className='p-3 w-[330px] text-[12px] cardShodow'>
            <p className='text-sm text-blue-400 font-[500]'>Cash/Bank balances</p>
            <br/>
            <br/>
            <br/>
            <div className='flex flex-row justify-between py-1'>
                <p>{title1}</p>
                <p>{amount1}</p>
            </div>
            <div className='w-full border-b bottom-1 border-gray-200'/>
            <div className='flex flex-row justify-between py-1'>
                <p>{title2}</p>
                <p>{amount2}</p>
            </div>
            </div>
  )
}