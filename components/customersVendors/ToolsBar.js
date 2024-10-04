'use client'
import React from 'react';
import { ExcelIcon } from '../icons/iconsSvg';
import { handleExport2Excel } from '@/lib/exel/handleExport2Excel';
import { tableHeaderFormater } from '@/lib/exel/tableHeaderFormater';


  function objectToArray(arr, keys, exclude) {
    const returnVal = {keys:keys || [],  data:[], dataWithHeader:[]};
    
    if(arr?.length){
        if(keys?.length){
            if(exclude){
                const specKeysData  = arr.map(obj => {
                    return Object.entries(obj)
                        .filter(([key, value]) => !keys.includes(key))
                        .map(([key, value]) => value)
                });
                returnVal.keys = Object.keys(arr[0]).filter((key) => !keys.includes(key)),
                returnVal.data = specKeysData;
            }else{
                const specKeysData  = arr.map(obj => keys.map(key => obj[key]));
                returnVal.keys = keys,
                returnVal.data = specKeysData;
            }
            
        }else{
            const allKeysData = arr.map(obj => Object.keys(arr[0]).map(key => obj[key]));
            returnVal.data = allKeysData;
        }
        const fmtHeader = tableHeaderFormater(returnVal?.keys);        
        returnVal.dataWithHeader = [fmtHeader, ...returnVal.data];
    }
    return returnVal
  }


const ToolsBar = ({personalAccounts, showAllRows, setShowAllRows, personalAcctType}) => {

    const data = objectToArray(personalAccounts, ['edit', 'editedAt', 'updatedBy', 'updatedAt', 'createdBy', 'createdAt', 'deleted', 'inactive'], 'exclude');

 //console.log(data)
  const handleExportToExcel =()=>{
    handleExport2Excel({docName:'All Customers', docHeader:[['Ozitech Technologies Limited'], [`All ${personalAcctType} data`], ['']],col1MaxW:false, data:data.dataWithHeader, styleRows:[], styleCells:[]});
  }
  return (
    <div className='flex flex-row gap-2 items-center mt-4 mb-2 md:mt-6'>
        <div className='px-2'>
            <input type='checkbox' className='size-4 mr-2 cursor-pointer checkbox checkbox-info' checked={showAllRows} onChange={()=>setShowAllRows(!showAllRows)}/>
            <span>Show all rows</span>
        </div>
        <div className='flex flex-row gap-2 cursor-pointer tooltip-right hover:bg-green-100 rounded-sm py-[2px] px-2 active:bg-gray-200' data-tip={'Export'}
            onClick={handleExportToExcel}>
            <ExcelIcon className={'fill-green-700  h-5 w-5 '}
            />
            Export
        </div>
    </div>
  )
}

export default ToolsBar