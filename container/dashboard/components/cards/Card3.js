import { formatToCurrency } from '@/lib/currency';
import React from 'react';



export const Card3 = ({title, title1, amount1, title2, amount2, title3, amount3}) => {
   

  return (
        <div className='p-3 pt-10 w-[330px] text-[12px] cardShodow'>
            <p className='text-sm text-blue-500 font-[500]'>{title}</p>
            <br/>
            <br/>
            <div className='flex flex-row justify-between py-1 text-[#1cac88]'>
                <p>{title1}</p>
                <p className='font-bold'>{`$`+formatToCurrency(amount1)}</p>
            </div>
            <div className='w-full mb-3 border-b bottom-1 border-gray-200'/>
            <div className='flex flex-row justify-between py-1 text-[#f26c6c]'>
                <p>{title2}</p>
                <p  className='font-bold'>{`$`+formatToCurrency(amount2)}</p>
            </div>
            <div className='w-full mb-5 border-b bottom-1 border-gray-200'/>

            <div className={`font-bold flex flex-row justify-between py-1 ${amount2 > amount1? 'text-[#f26c6c]' : 'text-[#1cac88]'}`}>
                <p>{amount2 > amount1? "NET LOSS" : "NET PROFIT"}</p>
                
                {amount2 > amount1?
                    <p  className=''>({`$`+formatToCurrency(Math.abs(amount2 - amount1))})</p>:
                    <p  className=''>{`$`+formatToCurrency(Math.abs(amount2 - amount1))}</p>
                }
            </div>
            <div className='w-full  border-b bottom-1 border-gray-200'/>
            </div>
  )
}

/*<div className={`mt-3`}>
        <p className={`text-[14px] pl-2 text-[#1cac88]`}>
          Income total: <span className="ml-2">{`$`+formatToCurrency(total1)}</span>
        </p>
        <p className={`text-[14px] pl-2 text-[#f26c6c]`}>
          Net {'Profit'}:  <span className="ml-2">{`$`+formatToCurrency(total2)}</span>
        </p>
        <p className={`text-[14px] mt-2 pl-2 ${total1 < total2? 'text-[#f54949]' : 'text-[#2bd165]'}`}>
          Expenses total:  <span className="ml-2">{`$`+formatToCurrency(total1 - total2)}</span>
        </p>
      </div>*/