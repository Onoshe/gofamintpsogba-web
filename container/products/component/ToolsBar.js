'use client'
import React from 'react';
import { ExcelIcon } from '@/components/icons/iconsSvg';
import { handleExport2Excel } from '@/lib/exel/handleExport2Excel';
import { tableHeaderFormater } from '@/lib/exel/tableHeaderFormater';


 
const ToolsBar = ({excelData}) => {

    const data = objectToArray(excelData, ['edit', 'editedAt', 'updatedBy', 'updatedAt', 'createdBy', 'createdAt', 'delete', 'deleted', 'inactive', 'id'], {keys:true, sn:false});


  //console.log(excelData)
  const handleExportToExcel =()=>{
    const title = "Products List"
    handleExport2Excel({docName:'All Customers', docHeader:[['Ozitech Technologies Limited'], [title], ['']],col1MaxW:false, data:data.dataWithHeader, styleRows:[], styleCells:[]});
  }
  return (
    <div className='flex flex-row gap-2 items-center  bg-gray-200 p-1'>
       
        <div className={`flex flex-row gap-2 cursor-pointer tooltip-right hover:bg-white rounded-sm py-[2px] px-2 active:bg-gray-100 
            ${excelData?.length> 1? '' :'hidden'}`}
            data-tip={'Export'}
            onClick={handleExportToExcel}>
            <ExcelIcon className={'fill-green-700  h-5 w-5 '}
            />
            Export
        </div>
    </div>
  )
}


export default ToolsBar;

function objectToArray(array, keys, exclude) {
  const returnVal = {keys:keys || [],  data:[], dataWithHeader:[]};
  
  const arr = exclude?.sn? array : [];
  if(!exclude?.sn){
    for (let i = 0; i < array.length; i++) {
      const el = array[i];
      const sn = i +1;
      arr.push({sn, ...el})
    }
  }
  if(arr?.length){
      if(keys?.length){
          if(exclude?.keys){
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


