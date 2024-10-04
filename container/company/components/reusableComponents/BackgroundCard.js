import React from 'react'

const BackgroundCard = ({children, style, childContStyle, title}) => {
  return (
    <div className={`border relative border-gray-600 rounded-md text-[13px] bg-white  w-full max-w-5xl ${style}`}>
        <p className='w-full bg-gray-600 text-white font-[500] py-2 text-left px-4 text-lg rounded-tl-md rounded-tr-md'>
          {title}</p>
        <div className={`w-full ${childContStyle}`}>
          {children}
        </div>
    </div>
  )
}

export default BackgroundCard