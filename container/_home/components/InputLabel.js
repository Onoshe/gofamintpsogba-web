import React from 'react'

const InputLabel = ({handleOnChange,  icon1, icon2,  name, value, type, placeholder, inputStyle, readOnly, required}) => {
  
    return (
    <label className={`input input-bordered flex items-center gap-2 ${inputStyle}`}>
        <InputLabelInner
            handleOnChange={handleOnChange}
            icon1={icon1}
            icon2={icon2}
            name={name}
            value={value}
            type={type}
            placeholder={placeholder}
            required={required}
            readOnly={readOnly}
        /> 
    </label>
  )
}


const InputLabelInner = ({handleOnChange,  icon1, icon2,  name, value, type, placeholder, readOnly, required}) => {
  
    return (
    <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" 
            className="size-6 cursor-pointer">
            {icon1}{icon2 || ''}
        </svg>
        <input type={type} className={`grow min-w-20`} placeholder={placeholder} value={value} 
            name={name} onChange={handleOnChange}
            required={required? '' : 'required'} readOnly={readOnly}
            />
    </>
  )
}

export {InputLabelInner}
export default InputLabel