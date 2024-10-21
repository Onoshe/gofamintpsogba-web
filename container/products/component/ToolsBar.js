'use client'
import React from 'react';
import { ExcelIcon } from '@/components/icons/iconsSvg';
import { handleExport2Excel } from '@/lib/exel/handleExport2Excel';
import { tableHeaderFormater } from '@/lib/exel/tableHeaderFormater';
import { BiRefresh } from 'react-icons/bi';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import { handleExport2Pdf } from '@/container/reports/utils/others/handleExport2Pdf';
import { getHeadersTitle } from '@/container/reports/utils/ledgers/getHeaders';


 
const ToolsBar = ({excelData, notify, runDispatchClientDataCall,user, companyLogoFile}) => {

    const data = objectToArray(excelData, ['edit', 'editedAt', 'updatedBy', 'updatedAt', 'createdBy', 'createdAt', 'delete', 'deleted', 'inactive', 'id'], {keys:true, sn:false});


  //console.log(excelData)
  const title = "Products List";
  const excelForm = {
    docName:'All Products', 
    docHeader:[['Ozitech Technologies Limited'], [title], ['']],
    col1MaxW:false, 
    data:data.dataWithHeader, 
    styleRows:[], 
    styleCells:[]
  };
  const handleExportToExcel =()=>{
    handleExport2Excel(excelForm);
  }
  const handlePdfExport =()=>{
    const {pdfData, reportHeader, rows} = data?.pdfForm;
    const pdfForm =  {reportRows:rows, pdfHeader:excelForm.docHeader, reportHeader, pdfData, headerRowsColsArr:'', companyLogoFile};
    handleExport2Pdf(pdfForm);
    postActivity(user, activities.DOWNLOAD, "Products List Pdf report")
  }
  const handleRefreshData = async ()=>{
    runDispatchClientDataCall();
    setTimeout(()=> notify('success', 'Data refreshed successfully'), 500);
  }

  return (
    <div className='flex flex-row justify-between items-center  bg-gray-200 p-1'>
       
        <div className='flex flex-row gap-2 items-center'>
          <div className={`flex flex-row gap-2 cursor-pointer tooltip-right hover:bg-white rounded-sm py-[2px] px-2 active:bg-gray-100 
              ${excelData?.length> 1? '' :'hidden'}`}
              data-tip={'Export'}
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
        <div className='hover:tooltip-open tooltip tooltip-left mr-2' data-tip={'Refresh data'}>
            <BiRefresh className='text-[25px] text-teal-500 cursor-pointer hover:text-teal-400 active:text-teal-700'
            onClick={handleRefreshData}
            />
        </div>
    </div>
  )
}


export default ToolsBar;


const keysMain =["sn", "productCode", "productCat", "productName", "description"]; 
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

  let displayKeys = keysMain;
    const pdfForm = {
        reportHeader: getHeadersTitle(displayKeys),
        rows:arr,
        pdfData:{
            reportRowKeys:displayKeys,
            noFmtCols:[],
            headerFSize:[14],
            tableColsWch:[], //Empty is auto
            tableColsFSize:9,
            tablePlain:[],
            footerArr:[],
            tableHeaderFSize:9,
        },
    };
    returnVal.pdfForm = pdfForm;

  return returnVal
}


