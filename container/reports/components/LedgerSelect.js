
import React from 'react'
import { MdClose } from 'react-icons/md'


function LedgerSelect({showLedgers, handleSelectedLedger, isReportPage,  handleCloseShowLedgers, processedLedgers, 
    genLedgerCodes, ledgerTitle}) {

  const showPage = isReportPage? 'flex' : showLedgers? 'flex z-50' :'hidden';
  return (
    <div className={`fixed w-full bg-blue-100/70 pt-8 h-full justify-center  ${showPage}`} >
        <div className={`bg-sky-100 text-[12px] smc:text-sm sm:text-base relative shadow-lg p-4 h-fit border border-blue-600 text-gray-600 rounded-md lg:-ml-[250px]`}>
            {<MdClose className='invisible absolute right-5 text-[24px] text-red-600 cursor-pointer hover:text-red-700 active:text-red-400'
                onClick={handleCloseShowLedgers}
            />}
            <p className='font-bold text-center py-2'>{ledgerTitle}</p>
            <div className='h-[400px] overflow-y-auto bg-white p-3 min-w-[250px]'>
                {genLedgerCodes?.map((code, i)=>{
                return(
                    <p key={`${i}key`} className='cursor-pointer w-fit hover:text-blue-800 hover:font-bold'
                    onClick={()=>handleSelectedLedger(code)}>
                        {code} {processedLedgers[code].name}
                    </p>
                )
                })}
            </div>
        </div>       
    </div>
  )
}

export default LedgerSelect;