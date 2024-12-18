'use client'
import React from 'react';
import { ExcelIcon } from '@/components/icons/iconsSvg';
import { handleExport2Excel } from '@/lib/exel/handleExport2Excel';
import { tableHeaderFormater } from '@/lib/exel/tableHeaderFormater';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { BiPrinter, BiRefresh } from 'react-icons/bi';
import { formatLabel, getHeadersTitle } from '@/container/reports/utils/ledgers/getHeaders';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import { handleExport2Pdf } from '@/container/reports/utils/others/handleExport2Pdf';


  
const ToolsBar = ({excelData, runDispatchClientDataCall, notify, user, companyLogoFile, coaStructure}) => {
    const excelDataWithClass = excelData?.map((dt, i)=> {
      const coa = coaStructure.find((el)=> el.code == dt.typeCode);
      return {...dt, sn:i+1, accountClass:formatLabel(coa.subClass)}
    });
    const data = objectToArray(excelDataWithClass);

 // console.log(data) 
  const title = "Chart of Account"
  const excelDt = {
    docName:'Chart of Account', 
    docHeader:[['Ozitech Technologies Limited'], [title], ['']],col1MaxW:false, data:data.dataWithHeader, styleRows:[], styleCells:[]
   };
  const handleExportToExcel =()=>{
    handleExport2Excel(excelDt);
    postActivity(user, activities.DOWNLOAD, "Chart of Account Excel report")
  }

  const handlePdfExport =(act)=>{
    const {pdfData, reportHeader, rows} = data?.pdfForm;
    const pdfForm =  {reportRows:rows, pdfHeader:excelDt.docHeader, reportHeader, pdfData, headerRowsColsArr:'', companyLogoFile, docMethod:act};
    handleExport2Pdf(pdfForm);
    postActivity(user, activities.DOWNLOAD, "Chart of Account Pdf report")
  }
  const handleRefreshData = async ()=>{
    runDispatchClientDataCall();
    setTimeout(()=> notify('success', 'Data refreshed successfully'), 500);
  }

  return (
    <div className='flex flex-row justify-between  bg-gray-200 p-1'>
        <div className='flex flex-row gap-2 items-center'>
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
          <div className='hover:tooltip-open tooltip tooltip-top ml-2' data-tip={'Print document'}>
              <BiPrinter className='text-[22px] text-blue-500 cursor-pointer hover:text-blue-700 active:text-blue-500'
              onClick={()=>handlePdfExport("PRINT")}
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

const keysMain =["sn", "id", "accountCode", "accountClass", "accountName", "accountType", "description", "productCat"]; 
function objectToArray(arr, keys=keysMain, exclude) {
  const returnVal = {keys:keys || [],  data:[], dataWithHeader:[], pdfForm:{}};
  
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
          const allKeysData = arr.map(obj => returnVal.keys.map(key => obj[key]));
          returnVal.data = allKeysData;
      }
      //returnVal.keys = ["sn", ...returnVal.keys];
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
