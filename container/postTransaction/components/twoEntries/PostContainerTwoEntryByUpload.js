'use client'
import { getFileExtension } from '@/components/customersVendors/modules/getFileExtension';
import UploadFileExcel from '@/components/excelFiles/UploadFileExcel';
import DragAndDropFileInput from '@/components/forms/DargAndDropFileInput';
import { readSpreadSheetFile } from '@/lib/exel/readSpreedSheetFile';
import React, {useReducer, useState} from 'react';
import { getFileDetails } from '@/lib/exel/getFileDetails';
import { MdClose, MdDownload } from 'react-icons/md';
import { aoaToObj } from '@/lib/exel/aoaToObj';
import Table from '@/components/tables/Table';
import { initStatePostTwoTrans, reducerPostTwoTrans } from '../../reducers/reducerPostTwoTrans';
import { validateTransactions } from '@/lib/validation/validateTransaction';
import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import { getUploadSampleFile } from '../utils/getUploadSampleFile';


const PostContainerTwoEntryByUpload = ({postError,setUploading, setPostError, chartOfAccounts, personalAcctsList, controlAcctsCode, postBtn, setPostBtn, setTransSheets, resetUploadTableCall}) => {
    const [statePostTwoTrans, dispatchPost] = useReducer(reducerPostTwoTrans, initStatePostTwoTrans);
    const {isDropped, isDragging, selected, uploadedData, resetFileUploadCount, file, infoMsg, table} = statePostTwoTrans;
    const transSheets = table?.rows;
    

    const handleDispatchPost =(type, payload)=>{
      dispatchPost({type, payload});
    };

      const handleGetFileExtension=()=>{
        return getFileExtension(file);
      }
      const handleUpload =(e)=>{
        console.log(e)
      }

      const  readData = async (file)=>{
        await readSpreadSheetFile(file).then((res)=>{
          //console.log(res)
          const rows = aoaToObj(res);
          const rowKeys = Object.keys(rows[0]);
          const header = rowKeys.map((key)=> { return {title:key}});
          handleDispatchPost('setTable', {show:true, rows, rowKeys, header})
          //console.log([rows,header, rowKeys]);
        })
      } 
      const handleCloseTable =()=>{
        setTransSheets([]);
        handleDispatchPost('handleCancel', "");
        handleDispatchPost('setTable', {...table, show:false});
        setPostBtn({show:false});
        setUploading(false);
      }

      //console.log(postError)
      React.useEffect(()=>{
        if(table?.show && table?.rows?.length){
          //const transSheetFmt =
         const validateRes = validateTransactions(transSheets, chartOfAccounts, personalAcctsList, controlAcctsCode, 'UPLOAD')
          if(validateRes?.error){
           const errorMsg = getErrorMessage(validateRes?.errorType, validateRes?.key, validateRes?.rowIndex, validateRes?.title);
           setPostError({msg:errorMsg, error:validateRes?.error});
           setTransSheets([]);
          }else{
           setPostError({msg:'Upload successful and ready for record', error:false});
           setPostBtn({show:true});
           setTransSheets(transSheets)
          }
        }
        if(!table.show){
          setPostError({msg:'', error:false})
        }
      },[table]);

      React.useEffect(()=>{
        if(resetUploadTableCall){handleCloseTable()}        
      },[resetUploadTableCall]);

      React.useEffect(()=>{
          if (file?.name){
            const fileDetails = getFileDetails({file, maxSize:200000, validExt:['csv', 'xls', 'xlsx']});
            if(fileDetails.valid){
              handleDispatchPost('setInfoMsg', {error:false, msg:'Uploading successful! Please wait while we process...'});
              setTimeout(()=>{readData(file)}, 1000);
            }else{
              handleDispatchPost('setInfoMsg', {error:true, msg:fileDetails.msg})
            }            
          }
      },[file]);  

      
  return (
    <div >
        <div className='bg-gray-200 px-2 py-1 text-gray-700'>
            <div className='flex flex-row gap-1 hover:bg-white px-2 py-[2px] hover:text-blue-600 active:bg-gray-100 rounded-sm w-fit cursor-pointer'
              onClick={()=>getUploadSampleFile()}>
              <MdDownload size={22} className=''/> Sample File
            </div>
        </div>
        <div className='p-3'>
            <div>
                <br/>
                <br/>
                <UploadFileExcel
                    className="hidden"
                    setUploadedData={(e)=>handleDispatchPost('setUploadedData', e)}
                    resetFileUploadCount={resetFileUploadCount}
                >
                    <p>Upload File</p>
                </UploadFileExcel>
            </div>
          {!table?.show? 
            <DragAndDropFileInput
                file={file}
                setFile={(e)=>handleDispatchPost('setFile', e)}
                handleUpload={handleUpload}
                infoMsg={infoMsg}
                setInfoMsg={(e)=>handleDispatchPost('setInfoMsg', e)}
                handleCancel={(e)=>handleDispatchPost('handleCancel', e)}
                isDragging={isDragging}
                isDropped={isDropped}
                setIsDragging={(e)=>handleDispatchPost('setIsDragging', e)}
                setIsDropped={(e)=>handleDispatchPost('setIsDropped', e)}
                selected={selected}
                getFileExtension={handleGetFileExtension}
                fileFormats={['csv, xls, xlsx']}
                maxSize="1000"
            />
           : <div className={``}>
              <div className='-mt-10'>
                <p className={`text-center  px-10 ${postError.error? 'text-red-600' : 'text-green-700'}`}>
                  {postError.msg}
                </p>
              </div>
              <div className='w-full flex justify-end '>
                <MdClose size={28} className='cursor-pointer font-bold text-red-600 active:text-red-300 hover:text-red-400'
                  onClick={handleCloseTable}/>
              </div>
              <Table
                classNameTable={`overflow-x-auto max-h-[60vh] overflow-y-auto my-4 md:my-6`}
                //header={[{className:'bg-blue-50 py-5', title:''}, {title:'FIRSTNAME'}, {title:'LASTNAME'}, {title:'GENDER'}, {title:'BIRTHDAY'}, {title:'CHURCH'}, {title:'EDIT'}]} 
                //rowKeys={['firstname', 'lastname', 'gender', 'birthday', 'church', 'edit']}
                //rows={tableRows}
                header={table?.header}
                rowKeys={table?.rowKeys}
                rows={table?.rows}
                classNameHeaderTR="bg-blue-50 cursor-pointer" 
                classNameRowsTR="border border-gray-200 hover:bg-blue-50"
                //clickableHeader={true}
                //onClickHeader={(e)=>console.log(e)}
                //clickableRowCell={true}
                //clickableRowCellKeys ={['firstname', 'gender', 'edit']}
                //onClickRowCell={(e)=>console.log(e)}
              />
            </div>
           }
        </div>
        
    </div>
  )
}

export default PostContainerTwoEntryByUpload