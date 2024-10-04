import React from 'react'

const SelectionSubAccount = ({title,selValue, selName, classNameCont, classNameTitle, options, classNameContSelSub, 
    classNameBLine,titleDrCr, titleDrCrStyle, ...props}) => {

 return (
    <div className={`${classNameContSelSub} ${classNameCont}`}>
        <p className={`${classNameTitle}`}>{title}</p>
        <p className={`${classNameBLine}`}></p>
        <div className='flex flex-col'>
            <span className={`text-blue-800 pr-2 pl-1 font-bold ${titleDrCrStyle}`}>{titleDrCr}</span>
            <select
                data-theme="winter"
                type='date' 
                className={`border text-[12px] py-3 pt-2 px-2 rounded-md border-gray-400 w-full bg-white `} 
                {...props}>
                {
                    options?.map((dt,i)=>{
                        const displayName =  dt.accountName;
                        return(
                            <option key={`${i}key`} disabled={dt?.selectable? '' :'disable'}  
                                className={`w-full text-black ${dt?.selectable? '' : 'font-bold'} `}
                                value={dt.accountCode}>
                                {displayName}
                            </option>            
                        )
                    })
                }
            </select>
        </div>
    </div>
  )
}

export default SelectionSubAccount
