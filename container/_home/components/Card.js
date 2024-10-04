import React from 'react';


const Card = ({children, title, details, detailsTop, detailsTopClassName}) => {

  return (
    <div className='bg-[#1788E4] p-7 py-10 lg:px-16 rounded-md w-full max-w-[550px]'>
        <p className='text-white text-2xl font-bold pb-3 whitespace-nowrap'>
            {title}</p>
        <p className={`pb-3 ${detailsTopClassName}`}>{detailsTop}</p>
        <p className='text-white pb-3'>{details}</p>
        {children}
    </div>
  )
}

export default Card