'use client'
import React from 'react';
import { tableHeaderFormater } from '@/lib/exel/tableHeaderFormater';
import { MdDownload } from 'react-icons/md';
import { getUploadSampleFile } from './modules/getUploadSampleFile';


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


const ToolsBarUpload = ({personalAccounts, showAllRows, setShowAllRows, personalAcctType}) => {

    const data = objectToArray(personalAccounts, ['edit', 'editedAt', 'updatedBy', 'updatedAt', 'createdBy', 'createdAt', 'deleted', 'inactive'], 'exclude');

 
  return (
    <div className='px-2'>
        <div className='bg-gray-200 px-2 py-1 text-gray-700'>
          <div className='flex flex-row gap-1 hover:bg-white px-2 py-[2px] hover:text-blue-600 active:bg-gray-100 rounded-sm w-fit cursor-pointer'
            onClick={getUploadSampleFile}>
            <MdDownload size={22} className=''/> Sample File
          </div>
        </div>
    </div>
  )
}

export default ToolsBarUpload