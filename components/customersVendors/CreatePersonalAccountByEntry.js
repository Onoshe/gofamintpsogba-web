'use client'
import React, {useState, useEffect} from 'react';
import { basicTextFields } from '@/constants/formFields/formFields';
import Form from './Form';


const CreatePersonalAccountByEntry = ({formData, setFormData, personalAcctType, handleInfoMsg, handleSubmit, infoMsg, setInfoMsg, handleCancel, 
  personalAcctGroups, selectedOption, setSelectedOption, noGroupValueMsg, group, setGroup}) => {
      const keysContactPerson = ["accountCode", "title","firstname", "lastname","othernames", "email","dob","phoneNo","formNo", "position","residentialAddress", "nextContactPersonName", "nextContactPersonPhoneNo", "nextContactPersonEmail",];
      const keysCompany = ["companyName", "companyEmail", "companyPhoneNo", "companyAddress", "businessType", "region", "country","state", "zip", "registeredDate", "info"]
      const [uploadedData, setUploadedData] = React.useState([]);
      
     
      
      const onChangeHandler = (e)=>{
          const {name, value} = e.target;
            setFormData({...formData, [name]:value})
            setInfoMsg({error:false, msg:""});
      }
     
     const handleSubmitCall =(e)=>{
        e.preventDefault();
        let errorInfo = {msg:'', error:false}
        if(!formData?.type){
          errorInfo = {error:true, msg:'Please, select Individual or Company type'}
         } else if(!formData.title || formData.title === "Select"){
          errorInfo = {error:true, msg:'Please, select title'}
         }

        if(errorInfo.error){
          setInfoMsg(errorInfo)
          handleInfoMsg('error', errorInfo?.msg)
        }else{handleSubmit(formData);}
     }
     
  return (
    <div>
        <Form
            uploadedData={uploadedData}
            setUploadedData={setUploadedData}
            onChangeHandler={onChangeHandler}
            basicTextFields={basicTextFields} 
            formData={formData}
            infoMsg={infoMsg}
            keysContactPerson={keysContactPerson}
            keysCompany={keysCompany}
            handleSubmit={handleSubmitCall}
            personalAcctType={personalAcctType}
            handleCancel={handleCancel}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            groupValue={group}
            handleSelectedGroup={e=>setGroup(e)}
            options={personalAcctGroups}
            noGroupValueMsg={noGroupValueMsg}
      />    
    </div>
  )
}

export default CreatePersonalAccountByEntry