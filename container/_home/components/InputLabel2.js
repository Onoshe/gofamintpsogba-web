import React from 'react'
import { InputLabelInner } from './InputLabel'

const InputLabel2 = ({handleOnChange,  icon1, icon2,  name, value, type, placeholder,
      viewIcon, rightIconT1, rightIconT2, rightIconB1, rightIconB2,handleViewIcon,
     }) => {
  

    return (
    <label className="input input-bordered flex items-center gap-2">
        <InputLabelInner
            handleOnChange={handleOnChange}
            icon1={icon1}
            icon2={icon2}
            name={name}
            value={value}
            type={type}
            placeholder={placeholder}
        /> 
        
        {viewIcon?
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" 
                className="size-6 cursor-pointer" onClick={handleViewIcon}>
                {rightIconT1}{rightIconT2}
            </svg>
            :<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" 
                className="size-6 cursor-pointer" onClick={handleViewIcon}>
                {rightIconB1}{rightIconB2}
            </svg>
            }
            
    </label>
  )
}

export default InputLabel2