import React from 'react'

const DashboardCard = ({children, style, title, maxWidth}) => {
  return (
    <div className={`border relative border-gray-600 mt-4 mb-7 p-3 py-5 rounded-md text-[13px] text-gray-700 bg-[#eee]
        w-full ${maxWidth || 'max-w-[450px]'} ${style}`}>
        <div className='absolute -top-7 bg-white rounded-sm border border-gray-500 py-2 px-3'>
           {title}
        </div>
        {children}
    </div>
  )
}

export default DashboardCard