import React from 'react'

const TextInput = ({labelName, classNameCont, classNameInput, required, classNameLabel, ...props}) => {
  return (
    <div className={`flex flex-col smc:flex-row justify-start smc:items-center ${classNameCont}`}>
        <p className={`pl-3 smc:pl-0 ${classNameLabel}`}>{labelName}</p>
        <input required={required}
             className={`input input-bordered input-info w-full max-w-xs bg-white ${classNameInput}`} 
             {...props}/>
    </div>
  )
}


const Radio = ({labelName, classNameCont, classNameRadio, required, classNameLabel, ...props}) => {
    return (
      <div className={`flex flex-col smc:flex-row justify-start smc:items-center ${classNameCont}`}>
          <p className={`${classNameLabel}`}>{labelName}</p>
          <input type="radio" name="radio-7"  required={required}
            className={`radio radio-info" checked bg-white ${classNameRadio}`}  {...props}/>
      </div>
    )
  }

  export const Checkbox = ({labelName, classNameCont, required, classNameCheckbox, classNameLabel, ...props}) => {
    return (
      <div className={`form-control flex flex-row justify-start smc:items-center ${classNameCont}`}>
          <input type="checkbox" defaultChecked required={required}
            className={`checkbox checkbox-info bg-white ${classNameCheckbox}`}  {...props}/>
            <p className={`pl-3 ${classNameLabel}`}>{labelName}</p>
      </div>
    )
  }

  const TextArea = ({labelName, classNameCont, required, classNameTextarea, classNameLabel, ...props}) => {
    return (
      <div className={`flex flex-col smc:flex-row justify-start smc:items-center ${classNameCont}`}>
          <p className={`pl-3 smc:pl-0 ${classNameLabel}`}>{labelName}</p>
          <textarea  required={required}
            className={`textarea textarea-info bg-white  w-full max-w-[400px] ${classNameTextarea}`}  {...props}>
          </textarea>
      </div>
    )
  }

  const Selection = ({children, labelName, classNameCont, required, defaultValue,onChange, classNameSelection, name, classNameLabel}) => {
    return (
      <div className={`flex flex-col smc:flex-row justify-start smc:items-center ${classNameCont}`}>
          <p className={`pl-3 smc:pr-0 ${classNameLabel}`}>{labelName}</p>
            <select required={required} defaultValue={defaultValue} onChange={onChange} name={name}
                className={`select select-info w-full max-w-xs bg-white ${classNameSelection}`}>
                {children}
            </select>
    </div>
    )
  }

export {TextInput, Radio, TextArea, Selection}