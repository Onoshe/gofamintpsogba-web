import React from 'react'



const TextInput = ({contStyle, title, name, value, type, onChange, placeholder, required}) => {

  return (
    <div className={`border relative border-gray-600 p-3 py-5 rounded-md text-[13px] text-gray-700 bg-[#eee]
        w-full mb-3 ${contStyle}`}>
            <p className='ml-1'>{title}</p>
            <input 
                className='bg-white w-full py-[7px] border border-gray-300 rounded-md px-3 outline-none active:outline-none hover:shadow-md'
                name={name}
                value={value}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        
    </div>
  )
}

export default TextInput