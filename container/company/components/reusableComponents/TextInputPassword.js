'use client'
import React from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';



const TextInputPassword = ({contStyle, title, name, value, onChange, placeholder}) => {
  const [open, toggleOpen] = React.useState(false);

  return (
    <div className={`border relative border-gray-600 p-3 py-5 rounded-md text-[13px] text-gray-700 bg-[#eee]
        w-full mb-3 ${contStyle}`}>
            <p className='ml-1'>{title}</p>
            <div className='flex flex-row gap-2 flex-wrap'>
              <>
                <input 
                    className='bg-white flex-1 py-[7px] inline-block border border-gray-300 rounded-md px-3 outline-none active:outline-none hover:shadow-md'
                    name={name}
                    value={value}
                    type={open? 'text' : 'password'}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                />
                <div className='flex justify-center items-center'>
                  {open?
                    <IoMdEye className='text-[26px] cursor-pointer text-blue-400 active:text-blue-500'
                    onClick={()=>toggleOpen(false)}/>
                   : <IoMdEyeOff className='text-[26px] cursor-pointer text-blue-400 active:text-blue-500'
                     onClick={()=>toggleOpen(true)}/>}
                </div>
              </>

            </div>
        
    </div>
  )
}

export default TextInputPassword