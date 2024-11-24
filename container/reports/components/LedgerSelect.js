
import React from 'react'
import { MdClose } from 'react-icons/md'


function LedgerSelect({showLedgers, handleSelectedLedger, isReportPage,  handleCloseShowLedgers, processedLedgers, 
    genLedgerCodes, ledgerTitle}) {

    const genLedgerCodesArr = genLedgerCodes.filter(code=> code !== "TOTAL");
    
    const showPage = isReportPage? 'flex' : showLedgers? 'flex z-50' :'hidden';

   // console.log(genLedgerCodesArr, processedLedgers);
  return (
    <div className={`fixed w-full bg-blue-100/70 pt-3 h-full justify-center  ${showPage}`} >
        <div className={`bg-sky-100 text-[12px] smc:text-sm  relative shadow-lg p-4 h-fit border border-blue-600 text-gray-600 rounded-md lg:-ml-[250px]`}>
            {<MdClose className='invisible absolute right-5 text-[24px] text-red-600 cursor-pointer hover:text-red-700 active:text-red-400'
                onClick={handleCloseShowLedgers}
            />}
            <p className='font-bold text-center pb-2'>{ledgerTitle}</p>
            <div className='h-[63vh] overflow-y-auto bg-white p-3 min-w-[250px]'>
                {genLedgerCodesArr?.map((code, i)=>{
                return(
                    <p key={`${i}key`} className='cursor-pointer w-fit hover:text-[blue] pb-2'
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