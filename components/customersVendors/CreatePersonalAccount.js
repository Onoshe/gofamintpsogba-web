'use client'
import React, {useReducer,useEffect, useState} from 'react'
import { RadioButtonSingle, RadioButtonsPair } from '../forms/RadioButtonsPair'
import HorizontalLine from '../misc/HorizontalLine'
import CreatePersonalAccountByUpload from './CreatePersonalAccountByUpload'
import CreatePersonalAccountByEntry from './CreatePersonalAccountByEntry'
import { getFileExtension } from './modules/getFileExtension'
import { getFileDetails } from '@/lib/exel/getFileDetails'
import { readSpreadSheetFile } from '@/lib/exel/readSpreedSheetFile'
import { aoaToObj } from '@/lib/exel/aoaToObj'
import { initStateCreateByUpload, reducerCreateByUpload } from './reducers/reducerCreateByUpload'
import Table from '../tables/Table'
import { MdClose } from 'react-icons/md';
import ToolsBarUpload from './ToolsBarUpload'



const CreatePersonalAccount = ({ handleUpload, useUploadedForm, setUploadedForm, formData, setFormData,personalAcctType, handleSubmit, 
    infoMsgByEntry, setInfoMsgByEntry, uploadInfo, editForm,  handleInfoMsg, handleCancel, showCreateBtn, handleCreateMultiPersonalAccts, accountGroups}) => {
    const [stateCreate, dispatchCreate] = useReducer(reducerCreateByUpload,  initStateCreateByUpload);
    const {file,table, infoMsg, checkedBtn, checkedEditBtn, isDropped, isDragging, selected} = stateCreate;
    const [selectedOption, setSelectedOption] = React.useState({});
    const [group, setGroup] = React.useState("NEW");
    
    const handleGetFileExtension=()=>{
      return getFileExtension(file);
    }

    const handleDispatchPost =(type, payload)=>{
      if(useUploadedForm){
        setUploadedForm(payload);
      }
      dispatchCreate({type, payload});
    };
    const personalAcctGroups =  accountGroups?.length? accountGroups : []; //[{ value: 'SUPPLIERS', label: 'SUPPLIERS' }];
   
  const  readData = async (file)=>{
      //Read and display the data
      await readSpreadSheetFile(file).then((res)=>{
        const rows = aoaToObj(res);
        const rowKeys = Object.keys(rows[0]);
        const header = rowKeys.map((key)=> { return {title:key}});
       handleDispatchPost('setTable', {show:true, rows, rowKeys, header})
      })
    } 
    
    React.useEffect(()=>{
        if (file?.name){
          const fileDetails = getFileDetails({file, maxSize:3000000, validExt:['csv', 'xls', 'xlsx']});
          if(fileDetails.valid){
            handleDispatchPost('setInfoMsg', {error:false, msg:'Uploading successful! Please wait while we process...'});
            setTimeout(()=>{readData(file)}, 1000);
          }else{
            handleDispatchPost('setInfoMsg', {error:true, msg:fileDetails.msg})
          }            
        }
    },[file]);

    useEffect(()=>{
          setFormData({...formData, accountGroup:""})
          setInfoMsgByEntry({error:false, msg:""});
          setSelectedOption({})
    },[group]);

    useEffect(()=>{
      if(selectedOption?.value){
            setFormData({...formData, accountGroup:selectedOption.value})
            setInfoMsgByEntry({error:false, msg:""});
      }
    },[selectedOption]);


    const noGroupValueMsg = personalAcctGroups?.length? "--Select--" : "--No Group--";

  return (
    <div>
      {editForm?
        <RadioButtonSingle
            classNameCont={'m-3 ml-5'}
            btnName="EDIT"
            btnTitle="Edit Form"
            checkedBtn={'EDIT'}
            setCheckedBtn={e=>console('')}
        />
        :<RadioButtonsPair
            classNameCont={'m-3 ml-5'}
            btn1Name="BYENTRY"
            btn1Title="Create by Entry"
            btn2Name="BYUPLOAD"
            btn2Title="Create by Upload"
            checkedBtn={checkedBtn}
            setCheckedBtn={e=>handleDispatchPost('setCheckedBtn', e)}
        />}
        <HorizontalLine widths={98} bColor={'silver'}/>
        {checkedBtn !== "BYENTRY" && 
          <ToolsBarUpload/>
        }
        <div className=''>
          <p className={`text-center pt-4 px-10 ${uploadInfo.error? 'text-red-600' : 'text-green-500'}`}>
            {table.show? uploadInfo.msg : ''}
          </p>
        </div>
        <>
            {checkedBtn === "BYENTRY"?
                <CreatePersonalAccountByEntry
                  handleSubmit={handleSubmit}
                  formData={formData}
                  setFormData={setFormData}
                  personalAcctType={personalAcctType}
                  infoMsg={infoMsgByEntry}
                  setInfoMsg={setInfoMsgByEntry}
                  handleInfoMsg={ handleInfoMsg}
                  handleCancel={handleCancel}
                  personalAcctGroups={personalAcctGroups}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  noGroupValueMsg={noGroupValueMsg}
                  group={group}
                  setGroup={setGroup}
                />
                :<CreatePersonalAccountByUpload
                  classNameCont={`pt-16 ${table.show? 'hidden' :''}`}
                  file={file}
                  infoMsg={infoMsg}
                  isDragging={isDragging}
                  isDropped={isDropped}
                  selected={selected}
                  setInfoMsg={(e)=>handleDispatchPost('setInfoMsg', e)}
                  setFile={(e)=>handleDispatchPost('setFile', e)}
                  handleUpload={handleUpload}
                  handleCancel={(e)=>handleDispatchPost('handleCancel', e)}
                  setIsDragging={(e)=>handleDispatchPost('setIsDragging', e)}
                  setIsDropped={(e)=>handleDispatchPost('setIsDropped', e)}
                  
                  getFileExtension={handleGetFileExtension}
                  fileFormats={['csv, xls, xlsx']}
                  maxSize="3000"
            />}
            {table?.show &&
              <div className={`lg:w-[calc(100vw-300px)]`}>
                <div className='flex justify-end mr-5'>
                  <MdClose size={28} className='cursor-pointer font-bold text-red-600 active:text-red-300 hover:text-red-400'
                      onClick={()=>handleDispatchPost('setToggleTable', false)}/>
                </div>
                <Table
                  classNameTable={`overflow-x-auto max-h-[60vh] overflow-y-auto ml-3 mb-4 my-1 `}
                  header={table?.header}
                  rowKeys={table?.rowKeys}
                  rows={table?.rows}
                  classNameHeaderTR="bg-blue-50 cursor-pointer" 
                  classNameRowsTR="border border-gray-200 hover:bg-blue-50"
                />
                  
                  <br/><br/><br/><br/><br/>

                  {showCreateBtn && 
                    <div className='fixed bottom-0 bg-blue-50 w-full'>
                      <div className='flex flex-row gap-4 p-4 '>
                            <input type='submit' className="btn btn-info btn-sm px-10" value="Create" 
                              onClick={handleCreateMultiPersonalAccts}/>
                      </div>
                    </div>}
              </div>
            }
       </>
    </div>
  )
}

export default CreatePersonalAccount