'use client'
import React from 'react';
import { ExcelIcon } from '@/components/icons/iconsSvg';
import { handleExport2Excel } from '@/lib/exel/handleExport2Excel';
import { tableHeaderFormater } from '@/lib/exel/tableHeaderFormater';
import { BsFileEarmarkPdf } from 'react-icons/bs';


  


const ToolsBar = ({excelData}) => {

    const data = objectToArray(excelData, ['edit', 'editedAt', 'updatedBy', 'updatedAt', 'createdBy', 'createdAt', 'delete', 'deleted', 'inactive'], 'exclude');

   console.log(excelData)
 //const title = ["List of all typeCodes"];
  // const space = [""];
  
  const handleExportToExcel =()=>{
    const title = "Chart of Account"
    handleExport2Excel({docName:'Chart of Account', docHeader:[['Ozitech Technologies Limited'], [title], ['']],col1MaxW:false, data:data.dataWithHeader, styleRows:[], styleCells:[]});
  }

  const handlePdfExport =()=>{
    //const {pdfData, reportHeader, rows} = data?.pdfForm;
    //const pdfForm =  {reportRows:rows, pdfHeader:docHeader, reportHeader, pdfData, headerRowsColsArr:'', companyLogoFile};
    //console.log(data);
    //handleExport2Pdf(pdfForm);
    //postActivity(user, activities.DOWNLOAD, "All "+personalAcctType+" Pdf report")
  }


  return (
    <div className='flex flex-row gap-2 items-center  bg-gray-200 p-1'>
       
        <div className='flex flex-row gap-2 cursor-pointer tooltip-right hover:bg-green-100 rounded-sm py-[2px] px-2 active:bg-gray-200' data-tip={'Export'}
            onClick={handleExportToExcel}>
            <ExcelIcon className={'fill-green-700  h-5 w-5 '}
            />
            Export
        </div>
        <div className='hover:tooltip-open tooltip tooltip-top ml-2' data-tip={'Export to Pdf'}>
            <BsFileEarmarkPdf className='text-[18px] text-red-500 cursor-pointer hover:text-red-400 active:text-red-700'
            onClick={handlePdfExport}
            />
        </div>
    </div>
  )
}

export default ToolsBar;


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