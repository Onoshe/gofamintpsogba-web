import React from 'react'


const RadioBtn = ({title, name, value, checked, onChange}) => {
  return (
    <div className='flex flex-row items-center gap-2 p-3'>
        <input type="radio" className='size-4 cursor-pointer'
          onChange={onChange}
          name={name}
          checked={checked}
          value={value}
        />
        <label>{title}</label>
    </div>
  )
}

export default RadioBtn