'use client'
import React, {useReducer, useState} from 'react'
import CreatePersonalAccountByUpload from '@/components/customersVendors/CreatePersonalAccountByUpload'
import { getFileExtension } from '@/components/customersVendors/modules/getFileExtension';
import { getFileDetails } from '@/lib/exel/getFileDetails';
import { readSpreadSheetFile } from '@/lib/exel/readSpreedSheetFile';
import { aoaToObj } from '@/lib/exel/aoaToObj';
import { MdClose, MdDownload } from 'react-icons/md';
import Table from '@/components/tables/Table';
import { validateCOAUploads } from '@/lib/validation/validateCOAUpload';
import { getErrorMessage } from '@/lib/validation/getErrorMessage';
//import { handleSubmitUpload } from '../utils/handleSubmitUpload';
//import { getUploadSampleFile } from '../utils/getUploadSampleFile';
import { getLinkFetchTableWithConds } from '@/lib/apiRequest/urlLinks';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { initStateCreateByUpload, reducerCreateByUpload } from '@/container/products/reducers/reducerCreateByUpload';
import { getRecordProductByUploadSampleFile } from './getUploadSampleFile';
import Link from 'next/link';
import { validateProductPurchaseAndAdj } from '../utils/validation/validateProductPurchaseAndAdj';
import { validateProductSale } from '../utils/validation/validateProductSale';
import { BiError } from 'react-icons/bi';


const purchaseFlds = ({date:"", description:'', reference:'', amount:'', accountCodeDr:'', subCodeDr:'', quantityDr:'',unitsDr:'',accountCodeCr:'', subCodeCr:'', quantityCr:'',unitsCr:''});
const salseFlds = ({date:"", description:'', reference:'', amount:'', accountCodeDr:'', subCodeDr:'', quantityDr:'',unitsDr:'',accountCodeCr:'', subCodeCr:'', quantityCr:'',unitsCr:'',accountCodeProduct:'', subCodeProduct:'', quantityProduct:'',unitsProduct:'', accountCodeCOS:'', quantityBal:''});


const PostProductByUpload = ({chartOfAccounts,activeTab, controlAcctsCode, coaStructure,user, runDispatchClientDataCall, uploadError, setUploadError, handleInfoMsg, setShowBlind,}) => {
    const [stateCreate, dispatchCreate] = useReducer(reducerCreateByUpload, initStateCreateByUpload);
    const {isDropped, isDragging, selected,  uploadedData, resetFileUploadCount, closeTable, file, infoMsg, table} = stateCreate;
    const [isLoading, setIsLoading] = useState(false);

    //console.log(table);

    const handleUpload =()=>{
    }
    const handleDispatchPost =(type, payload)=>{
        dispatchCreate({type, payload});
      };

      
    const handleGetFileExtension=()=>{
      return getFileExtension(file);
    }

    const handleSubmit =()=>{
      setIsLoading(true);
      submitHandler({transSheet:table.rows, controlAcctsCode, activeTab, chartOfAccounts,user, personalAccounts, 
        runDispatchClientDataCall, setUploadError, toastNotify, transSheetReset, recordTransaction, router})
    }

    const handleSubmit99 = ()=>{
      setIsLoading(true);
     // handleSubmitUpload({formInput:table.rows, setInfoMsg:setUploadError, coaStructure, dispatchCreate,user, runDispatchClientDataCall, handleInfoMsg, 
     //   setShowBlind, setIsLoading})
    }
    


    const validateUploadData = async ()=>{
      const fetchTableUrl = getLinkFetchTableWithConds({table:user.companyId+'_products', conds:'deleted', values:'0'});
      //const chartOfAccts = await getRequest(fetchTableUrl);
      let validateRes = {};
      if(activeTab==="TAB1"){
          validateRes = await validateProductPurchaseAndAdj(table.rows, controlAcctsCode, activeTab, chartOfAccounts, user);
      }else if(activeTab === "TAB2"){
          validateRes = await validateProductSale(table.rows, controlAcctsCode, activeTab, chartOfAccounts, user);
      }
      
      //const validateRes = validateCOAUploads(table?.rows, chartOfAccts?.data, coaStructure, controlAcctsCode);
      //console.log(validateRes);

      if(validateRes?.error){
         const errorMsg = getErrorMessage(validateRes?.errorType, validateRes?.key, validateRes?.rowIndex, validateRes?.title);
         setUploadError({msg:errorMsg, error:validateRes?.error});
        }else{
         setUploadError({msg:'Upload successfull', error:false, uploadTable:table.rows});
        }
    }

    //console.log(controlAcctsCode)
    React.useEffect(()=>{
      if(table?.show && table?.rows?.length){
        validateUploadData();
      }
      if(!table.show){
        setUploadError({msg:'', error:false})
      }
    },[table]);

    const  readData = async (file)=>{
        await readSpreadSheetFile(file).then((res)=>{
          //console.log(res)
          const rows = aoaToObj(res);
          const rowKeys = Object.keys(rows[0]);
          const header = rowKeys.map((key)=> { return {title:key}});
          handleDispatchPost('setTable', {show:true, rows, rowKeys, header})
          //console.log(rows);
        })
      } 
      
      React.useEffect(()=>{
          if (file?.name){
            const fileDetails = getFileDetails({file, maxSize:1000000, validExt:['csv', 'xls', 'xlsx']});
            if(fileDetails.valid){
              handleDispatchPost('setInfoMsg', {error:false, msg:'Uploading successful! Please wait while we process...'});
              setTimeout(()=>{readData(file)}, 1000);
            }else{
              handleDispatchPost('setInfoMsg', {error:true, msg:fileDetails.msg})
            }            
          }
      },[file]);  


  return (
    <div className=''>
      <div className='bg-gray-200 px-2 py-1 text-gray-700 flex flex-row gap-2 flex-wrap'>
          <div className='flex flex-row gap-1 hover:bg-white px-2 py-[2px] hover:text-blue-600 active:bg-gray-100 rounded-sm w-fit cursor-pointer'
            onClick={()=>getRecordProductByUploadSampleFile(coaStructure)}
            >
            <MdDownload size={22} className=''/> Sample File
          </div>

          <Link className='flex flex-row gap-1 hover:bg-white px-2 py-[2px] hover:text-blue-600 active:bg-gray-100 rounded-sm w-fit cursor-pointer'
            href={'/excel/FastRecord_Database_Structure.xlsx'}
            >
            <MdDownload size={22} className=''/> FastRecord_Database_Structure
          </Link>
       </div>
       <div className='m-4'>
       <div className=''>
          <div className={`text-center flex justify-center items-center gap-2 px-10 ${uploadError.error? 'text-red-600' : 'text-green-500'}`}>
            {uploadError.error && <BiError className='text-[20px]'/>}{uploadError.msg}
          </div>
        </div>
       {!table?.show?
            <CreatePersonalAccountByUpload
                file={file}
                infoMsg={infoMsg}
                isDragging={isDragging}
                isDropped={isDropped}
                selected={selected}

                setFile={(e)=>handleDispatchPost('setFile', e)}
                handleUpload={handleUpload}
                setInfoMsg={(e)=>handleDispatchPost('setInfoMsg', e)}
                handleCancel={(e)=>handleDispatchPost('handleCancel', e)}
                setIsDragging={(e)=>handleDispatchPost('setIsDragging', e)}
                setIsDropped={(e)=>handleDispatchPost('setIsDropped', e)}
                getFileExtension={handleGetFileExtension}
                fileFormats={['csv, xls, xlsx']}
                maxSize="1000"
                />
            
       :<div className={`lg:w-[calc(100vw-300px)] max-w-[900px] xl:ml-[4vw]`}>
            <div className='flex justify-end'>
            <MdClose size={28} className='cursor-pointer font-bold text-red-600 active:text-red-300 hover:text-red-400'
                onClick={()=>handleDispatchPost('setToggleTable', false)}/>
            </div>
              <Table
                  classNameTable={`overflow-x-auto max-h-[45vh] overflow-y-auto my-4 md:my-6`}
                  header={table?.header}
                  rowKeys={table?.rowKeys}
                  rows={table?.rows}
                  classNameHeaderTR="bg-blue-50 cursor-pointer" 
                  classNameRowsTR="border border-gray-200 hover:bg-blue-50"
              />
            
        </div>
        } 
        
        </div>
        
        <div className='hidden'>
          <div className='mx-7 xl:ml-[4vw] hidden'>
            <button type='submit' className="btn btn-info px-10"
              onClick={handleSubmit}>
                Save
            </button>
          </div>
          
          <div className='fixed bottom-0 bg-blue-50 w-full mt-100'>
              <div className='flex flex-row gap-4 p-4 '>
                    <input type='submit' className={`btn  px-10  ${isLoading? 'btn-disabled' : 'btn-info'}`} value="Create" 
                      onClick={handleSubmit}/>                
              </div>
          </div> 
        </div>
      
    </div>
  )
}
//
export default PostProductByUpload