'use client'
import React, {useReducer, useState} from 'react'
import CreatePersonalAccountByUpload from '@/components/customersVendors/CreatePersonalAccountByUpload'
import { getFileExtension } from '@/components/customersVendors/modules/getFileExtension';
import { getFileDetails } from '@/lib/exel/getFileDetails';
import { readSpreadSheetFile } from '@/lib/exel/readSpreedSheetFile';
import { aoaToObj } from '@/lib/exel/aoaToObj';
import { MdClose, MdDownload } from 'react-icons/md';
import Table from '@/components/tables/Table';
import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import { validateAndFormatProducts } from '@/lib/validation/validateProductsUpload';
//import { productsList } from '@/public/data/productsList';
import { getUploadSampleFile } from '../utils/getUploadSampleFile';



const CreateProductByUpload = ({stateCreate, dispatchCreate, handleCreateMultiProducts, products}) => {
    const {isDropped, isDragging, selected,  uploadedData, resetFileUploadCount, closeTable, file, infoMsg, table} = stateCreate;
    const [uploadInfo, setUploadInfo] = React.useState({msg:'', error:false, uploaded:false});

    //console.log(uploadInfo)
    const handleUpload =()=>{

    }

    const handleDispatchPost =(type, payload)=>{
        dispatchCreate({type, payload});
      };

      
    const handleGetFileExtension=()=>{
      return getFileExtension(file);
    }

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
    //console.log(table)
    React.useEffect(()=>{
      if(table.show && table.rows){
        setUploadInfo({msg:'Form uploaded successfully', error:false, uploaded:true});
        const res =validateAndFormatProducts(table.rows, products);
        if(res.error){
          const errorMsg = getErrorMessage(res?.errorType, res?.key, res?.rowIndex);
          setUploadInfo({msg:errorMsg, error:true, uploaded:true})
        }else{
          //setUploadedForm(res.data);
        }
      }
    },[table]);

      
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
            onClick={getUploadSampleFile}>
            <MdDownload size={22} className=''/> Sample File
          </div>
       </div>
       <div className='m-4'>
        {!table?.show?
              <CreatePersonalAccountByUpload
                  //classNameCont={`pt-16 ${table.show? 'hidden' :''}`}
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
              
        :<div className={`lg:w-[calc(100vw-300px)]`}>
              <div className=''>
                  <p className={`text-center pt-4 px-10 ${uploadInfo.error? 'text-red-600' : 'text-green-500'}`}>
                    {table.show? uploadInfo.msg : ''}
                  </p>
                </div>
              <div className='flex justify-end'>
              <MdClose size={28} className='cursor-pointer font-bold text-red-600 active:text-red-300 hover:text-red-400'
                  onClick={()=>handleDispatchPost('resetUploadData', false)}/>
              </div>
              <Table
                  classNameTable={`overflow-x-auto max-h-[60vh] overflow-y-auto my-4 md:my-6`}
                  header={table?.header}
                  rowKeys={table?.rowKeys}
                  rows={table?.rows}
                  classNameHeaderTR="bg-blue-50 cursor-pointer" 
                  classNameRowsTR="border border-gray-200 hover:bg-blue-50"
              />
          </div>
          }
            
        </div>
        <div className='fixed bottom-0 bg-blue-50 w-full'>
            <div className='flex flex-row gap-4 p-4 md:p-6'>
                {table?.show && uploadInfo?.uploaded && !uploadInfo?.error &&
                  <input type='submit' className="btn btn-info px-10" value="Create" 
                    onClick={handleCreateMultiProducts}/>}
                <button className="hidden btn bg-gray-300 text-black hover:bg-gray-400" onClick={handleCreateMultiProducts}>Cancel</button>
            </div>
        </div> 
    </div>
  )
}

export default CreateProductByUpload