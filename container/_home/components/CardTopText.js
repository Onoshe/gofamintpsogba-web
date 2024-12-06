import React from 'react';

const CardTopText = () => {
  return (
        <div className='relative flex flex-col justify-center items-center gap-7 px-4'
         >  
            <p className='text-2xl md:text-4xl z-10 tracking-wide leading-loose font-bold p-5 text-center'
              >
                QuickRecords Bookkeeping & Accounting
            </p>
            <p className='text-justify z-10 font-[500] md:text-lg text-gray-800'>QuickRecords Bookkeeping & Accounting helps you to record all your transactions such as Sale, Purchase, Payments , Expenses, Products, etc. in an extremely simple manner. With your knowledge of just debit and credit, you will be able to record any transaction.</p>
        </div>
    
  )
}


export const CardTopTextCustom = ({title, text}) => {
  return (
        <div className='relative flex flex-col justify-center items-center gap-7 px-4'
         >  
            <p className='text-2xl md:text-4xl z-10 tracking-wide leading-loose font-bold p-5 text-center'
              >
                {title}
            </p>
            <p className='text-justify z-10 font-[400] text-gray-800'>
              {text}  
            </p>
        </div>
    
  )
}


export const CustomCard = ({title, text}) => {
  return (
        <div className=' flex flex-col justify-center gap-7 items-center px-4'>
            <p className='text-2xl bg-sky-100/50 skeleton md:text-4xl tracking-wide leading-loose font-bold p-5 text-center'>
                {title}
            </p>
            <p className='text-center'>{text}</p>
        </div>
    
  )
}

export default CardTopText;