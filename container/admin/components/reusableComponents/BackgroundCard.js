import React from 'react'

const BackgroundCard = ({children, style, fullWidth, childContStyle, title}) => {
  return (
    <div className={`border relative border-gray-600 rounded-md text-[13px] text-gray-700 bg-[#eee]
        w-full ${fullWidth? '' : 'max-w-5xl'} ${style}`}>
        <p className='w-full bg-[#BBBBBB] text-white py-2 text-center text-lg rounded-tl-md rounded-tr-md'>
          {title}</p>
        <div className={`p-3 pt-2 w-full ${childContStyle}`}>
          {children}
        </div>
    </div>
  )
}

export default BackgroundCard