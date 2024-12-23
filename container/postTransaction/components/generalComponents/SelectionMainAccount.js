import React from 'react'



const SelectionMainAccount = ({title, selValue, selName, classNameCont, classNameTitle, options, classNameContSel,
        classNameBLine, selType,titleDrCr, titleDrCrStyle,  ...props}) => {
 
 return (
    <div className={`${classNameContSel} ${classNameCont}`}>
        <p className={`${classNameTitle}`}>{title}</p>
        <p className={`${classNameBLine}`}></p>
        <div className='flex flex-col'>
            <span className={`text-blue-800 pr-2  pl-1 ${titleDrCrStyle}`}>{titleDrCr}</span>
            <select
                data-theme="winter"
                type='date' 
                className={`border py-3 pt-2 px-2 text-[12px] rounded-md border-gray-400 w-full bg-white `} 
                {...props}>
                {
                    options?.map((dt,i)=>{
                        const twoEntry = dt.selectable? dt.accountCode+" "+dt.accountName : dt.accountName;
                        const debitCreditSel =  dt.accountName;
                        const displayName = selType === "DRCR"? debitCreditSel : twoEntry; 
                        return(
                            <option key={`${i}key`} disabled={dt?.selectable? '' :'disable'}  
                                className={`w-full  ${dt?.selectable? 'pl-4 text-[blue]' : 'font-bold text-black'} `}
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

const SelectionMainAccountShell = ({ options, selType, ...props}) => {
 
    return (
           <select
               data-theme="winter"
               type='date' 
               className={`border py-3 pt-2 px-2 text-[12px] rounded-md border-gray-400 w-full bg-white `} 
               {...props}>
               {
                   options?.map((dt,i)=>{
                       const twoEntry = dt.selectable? dt.accountCode+" "+dt.accountName : dt.accountName;
                       const debitCreditSel =  dt.accountName;
                       const displayName = selType === "DRCR"? debitCreditSel : twoEntry; 
                       return(
                           <option key={`${i}key`} disabled={dt?.selectable? '' :'disable'}  
                               className={`w-full  ${dt?.selectable? 'pl-4 text-[blue]' : 'font-bold text-black'} `}
                               value={dt.accountCode}>
                               {displayName}
                           </option>            
                       )
                   })
               }
           </select>
     )
   }

   
export default SelectionMainAccount
