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
import { handleSubmitUpload } from '../utils/handleSubmitUpload';
import { getUploadSampleFile } from '../utils/getUploadSampleFile';



const CreateChartOfAccountByUpload = ({stateCreate, dispatchCreate, chartOfAccounts, coaStructure,user, runDispatchClientDataCall, handleInfoMsg, setShowBlind,}) => {
    const {isDropped, isDragging, selected,  uploadedData, resetFileUploadCount, closeTable, file, infoMsg, table} = stateCreate;
    const [postError, setPostError] = useState({msg:'', error:false});

    const handleUpload =()=>{
    }
    const handleDispatchPost =(type, payload)=>{
        dispatchCreate({type, payload});
      };

      
    const handleGetFileExtension=()=>{
      return getFileExtension(file);
    }

    const handleSubmit =()=>{
      handleSubmitUpload({formInput:table.rows, setInfoMsg:setPostError, coaStructure, dispatchCreate,user, runDispatchClientDataCall, handleInfoMsg, setShowBlind})
    }
    
    React.useEffect(()=>{
      if(table?.show && table?.rows?.length){
       const validateRes = validateCOAUploads(table?.rows, chartOfAccounts, coaStructure);
        if(validateRes?.error){
         const errorMsg = getErrorMessage(validateRes?.errorType, validateRes?.key, validateRes?.rowIndex, validateRes?.title);
         setPostError({msg:errorMsg, error:validateRes?.error});
        }else{
         setPostError({msg:'Upload successfull', error:false});
        }
      }
      if(!table.show){
        setPostError({msg:'', error:false})
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
      <div className='bg-gray-200 px-2 py-1 text-gray-700'>
          <div className='flex flex-row gap-1 hover:bg-white px-2 py-[2px] hover:text-blue-600 active:bg-gray-100 rounded-sm w-fit cursor-pointer'
            onClick={()=>getUploadSampleFile(coaStructure)}>
            <MdDownload size={22} className=''/> Sample File
          </div>
       </div>
       <div className='m-4'>
       <div className=''>
          <p className={`text-center  px-10 ${postError.error? 'text-red-600' : 'text-green-500'}`}>
            {postError.msg}
          </p>
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
        
        { (table.show && !postError.error) && <>
          <div className='mx-7 xl:ml-[4vw] hidden'>
            <button type='submit' className="btn btn-info px-10"
              onClick={handleSubmit}>
                Save
            </button>
          </div>
          
          <div className='fixed bottom-0 bg-blue-50 w-full mt-100'>
              <div className='flex flex-row gap-4 p-4 '>
                    <input type='submit' className="btn btn-info px-10" value="Create" 
                      onClick={handleSubmit}/>                
              </div>
          </div> 
          </>}
      
    </div>
  )
}
//
export default CreateChartOfAccountByUpload