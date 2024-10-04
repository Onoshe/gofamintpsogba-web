'use client'
import React from 'react';
import { generateRandomColor } from '../charts/ChartCard';



export const Card2 = ({title1, title2, subTitle1, subTitle2, subTitle3, subTitle4, amount1, amount2, amount3, amount4}) => {

    let randomColors =  ["blue", "red", "green", "pink", "teal", "gold", "purple", "green"];
   
    
  return (
           
    <div className='p-3 w-[330px] text-[12px] flex flex-row cardShodow'>
        <div className='flex flex-1 flex-col justify-between py-1'>
            <p className='pb-4 pl-1 text-sm text-blue-400 font-[500]'>{title1}</p>
            <div className={`border-l-2 pl-2`} style={{borderColor:randomColors[0]}}>
                <p>{subTitle1}</p>
                <p>{amount1}</p>
            </div>
            <br/>
            <div className={`border-l-2 pl-2`} style={{borderColor:randomColors[1]}}>
                <p>{subTitle2}</p>
                <p>{amount2}</p>
            </div>
        </div>
        
        <div className='border-l pl-1 border-gray-200 flex flex-1 flex-col justify-between py-1'>
            <p className='pb-4 pl-1 text-sm text-blue-400 font-[500]'>{title2}</p>
            <div className={`border-l-2 pl-2`} style={{borderColor:randomColors[2]}}>
                <p>{subTitle3}</p>
                <p>{amount3}</p>
            </div>
            <br/>
            <div className={`border-l-2 pl-2`} style={{borderColor:randomColors[3]}}>
                <p>{subTitle4}</p>
                <p>{amount4}</p>
            </div>
        </div>
    </div>
        
  )
}