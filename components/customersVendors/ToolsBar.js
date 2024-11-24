'use client'
import React from 'react';
import { ExcelIcon } from '../icons/iconsSvg';
import { handleExport2Excel } from '@/lib/exel/handleExport2Excel';
import { tableHeaderFormater } from '@/lib/exel/tableHeaderFormater';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { handleExport2Pdf } from '@/container/reports/utils/others/handleExport2Pdf';
import { getHeadersTitle } from '@/container/reports/utils/ledgers/getHeaders';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import { BiRefresh } from 'react-icons/bi';


  


const ToolsBar = ({personalAccounts, showAllRows, setShowAllRows, personalAcctType, clientAccount, 
    companyLogoFile, user, runDispatchClientDataCall, notify}) => {

    const data = objectToArray(personalAccounts, ['edit', 'editedAt', 'updatedBy', 'updatedAt', 'createdBy', 'createdAt', 'deleted', 'inactive'], 'exclude');
    const docHeader = [[clientAccount?.companyName], [`All ${personalAcctType} Data`], ["Report as at "+new Date().toDateString()], ['']];

  //console.log(data)
  const handleExportToExcel =()=>{
    handleExport2Excel({docName:"All_"+personalAcctType+"_Excel_report", docHeader, col1MaxW:false, data:data.dataWithHeader, styleRows:[], styleCells:[]});
    postActivity(user, activities.DOWNLOAD, "All "+personalAcctType+" Excel report")
  }

  const handlePdfExport =()=>{
    const {pdfData, reportHeader, rows} = data?.pdfForm;
    const pdfForm =  {reportRows:rows, pdfHeader:docHeader, reportHeader, pdfData, headerRowsColsArr:'', companyLogoFile};
    //console.log(data);
    handleExport2Pdf(pdfForm);
    postActivity(user, activities.DOWNLOAD, "All_"+personalAcctType+"_Pdf_report")
  }

  const handleRefreshData = async ()=>{
    runDispatchClientDataCall();
    setTimeout(()=> notify('success', 'Data refreshed successfully'), 500);
  }

  return (
    <div className='flex flex-row justify-between items-center my-2'>
        <div className='flex flex-row gap-2 items-center'>
            <div className='px-2 flex items-center'>
                <input type='checkbox' className='size-4 mr-2 cursor-pointer checkbox checkbox-info' checked={showAllRows} onChange={()=>setShowAllRows(!showAllRows)}/>
                <span className='text-[12px]'>Show all rows</span>
            </div>
            <div className='flex flex-row gap-2 cursor-pointer hover:bg-green-100 rounded-sm py-[2px] px-2 active:bg-gray-200 hover:tooltip-open tooltip tooltip-top' data-tip={'Export to Excel'}
                onClick={handleExportToExcel}>
                <ExcelIcon className={'fill-green-700  h-4 w-4 '}
                />
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


const keysMain =["sn","id", "type", " title", " accountCode", "firstname", "lastname", "othernames",  "email", " phoneNo", "accountGroup",  "formNo",  "nextContactPersonName", "companyName",  "businessType", "registeredDate"].map((ky)=> ky.trim()); 
function objectToArray(arr, keys, exclude) {
    //if(arr?.length) return {};
    const returnVal = {keys:keys || [],  data:[], dataWithHeader:[], pdfForm:{}};
    
    if(arr?.length){
        const arrWithSN = arr.map((dt, i)=> {return {sn:(i+1)+'', ...dt}});
        if(keys?.length){
            if(exclude){
                const specKeysData  = arrWithSN.map(obj => {
                    return Object.entries(obj)
                        .filter(([key, value]) => !keys.includes(key))
                        .map(([key, value]) => value)
                });
                returnVal.keys = Object.keys(arrWithSN[0]).filter((key) => !keys.includes(key)),
                returnVal.data = specKeysData;
            }else{
                const specKeysData  = arrWithSN.map(obj => keys.map(key => obj[key]));
                returnVal.keys = keys,
                returnVal.data = specKeysData;
            }
            
        }else{
            const allKeysData = arrWithSN.map(obj => Object.keys(arrWithSN[0]).map(key => obj[key]));
            returnVal.data = allKeysData;
        }
        const fmtHeader = tableHeaderFormater(returnVal?.keys);        
        returnVal.dataWithHeader = [fmtHeader, ...returnVal.data];
    }
    let displayKeys = keysMain;
   
    const pdfForm = {
        reportHeader: getHeadersTitle(displayKeys),
        rows:arr.map((dt, i)=> {
            const regDate = dt.registeredDate? new Date(dt.registeredDate).toISOString().split("T")[0] : "";
            return {...dt, sn:i+1, registeredDate:regDate}
         }),
        pdfData:{
            reportRowKeys:displayKeys,
            noFmtCols:[],
            headerFSize:[10],
            tableColsWch:[], //Empty is auto
            tableColsFSize:8,
            tablePlain:[],
            footerArr:[],
            tableHeaderFSize:7,
        },
    };
    returnVal.pdfForm = pdfForm;
    //console.log(returnVal, pdfForm)
    return returnVal
  }