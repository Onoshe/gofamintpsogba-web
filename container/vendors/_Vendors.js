'use client'
import { useState } from 'react';
import AllPersonalAccount from '@/components/customersVendors/AllPersonalAccount';
import CreatePersonalAccount from '@/components/customersVendors/CreatePersonalAccount';
import TabWrapper from '@/components/customersVendors/HeaderTab';
import React from 'react';
import useStoreTransactions from '@/context/storeTransactions';
import { validateAndFormatPersonalAcct } from '@/lib/validation/validatePersonalAcctUpload';
import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleSubmit } from '../customers/utils/handleSubmit';
import { handleClickRow } from '../customers/utils/handleTableActions';
import { handleSubmitMultiAccts } from '../customers/utils/handleSubmitMultiAccts';


const Vendors = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const {vendors, dispatchVendors, runDispatchClientDataCall} = useStoreTransactions((state) => state);
  const [activeTab, setActiveTab] = React.useState('DISPLAY');
  const [editForm, setEditForm] = React.useState(false);
  const [formInput, setFormInput] = React.useState({});
  const [infoMsg, setInfoMsg] = React.useState({msg:'', error:false});
  const [selectedOpt, setSelectedOpt] = React.useState('');
  const [uploadedForm, setUploadedForm] = React.useState('');
  const [uploadInfo, setUploadInfo] = React.useState({msg:'', error:false});
  const [searchValue, setSearchValue] = React.useState('');
  const [vendorsDisplay, setVendorsDisplay] = React.useState([...vendors]);
  

  //Uploaded file accountCode is of type accountCode:00007. Format to accountCode:C-00007
  if(uploadedForm?.rows?.length){
    uploadedForm.rows = uploadedForm.rows.map((dt)=> {
      return {...dt, accountCode:dt.accountCode?.includes("V-")? dt.accountCode : "V-"+dt.accountCode}});
  }
 
  const notify = (type, msg) => toast[type](msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      theme: "colored",
    //transition: 'Bounce',
    });

    let accountGroups = []; 
  if(vendors?.length){
    vendors.forEach(el => {
      const exist = accountGroups?.find(dt=> dt.value == el.accountGroup);
      if(el?.accountGroup && !exist){
        accountGroups.push({value:el.accountGroup, label:el.accountGroup})}
    });
  }
  const handleActiveTab =(tab, act)=>{
        setActiveTab(tab);
        setEditForm(act==='EDIT');
        if(act !=="EDIT"){setFormInput({});}
  }
  const  handleCreateMultiPersonalAccts =()=>{
    handleSubmitMultiAccts({forms:uploadedForm,  handleInfoMsg,  personalAcct:"vendors", runDispatchClientDataCall, setFormInput, user, setActiveTab});
  };

  const handleUpload =(e)=>{
    console.log(e)
  }
  const handleClickCell =(el)=>{     
      if(el?.row?.createdBy !== "DEMO"){
        //console.log()
        handleClickRow({el, setFormInput,  setInfoMsg, handleActiveTab, setSelectedOpt});
      }
  }
 
  const handleInfoMsg = (type, msg)=>{
    notify(type, msg);
  }
  const handleSubmitFunction = async (e)=>{
   handleSubmit({e, formInput, setInfoMsg, handleInfoMsg,  personalAccts:vendors, handleActiveTab, dispatchVendors, setFormInput,
     user, runDispatchClientDataCall, setActiveTab, setFormInput, personalAcct:"vendors"});
    //console.log(formInput)
  }

  const handleSearch =(el)=>{
    const searchedCustomer = [...vendors].filter((e)=> `${e.firstname} ${e.lastname} ${e.othernames} ${e.email} ${e.nextContactPersonName} ${e.nextContactPersonEmail} ${e.nextContactPersonName} ${e.residentialAddress} ${e.companyName} ${e.companyAddress}`.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));    
    setVendorsDisplay(searchedCustomer);
 }
 const onChangeSearch =(el)=>{     
    setSearchValue(el.target.value);
 }
 const handleClear =()=>{     
  setSearchValue("");
  setVendorsDisplay(vendors)
}
 React.useEffect(()=>{
  if(!searchValue){
    handleClear();
  }
 },[searchValue, vendors]);

 // console.log(uploadedForm)
  React.useEffect(()=>{
    if(uploadedForm.show && uploadedForm.rows){
      setUploadInfo({msg:'Form uploaded successfully', error:false});
      const res =validateAndFormatPersonalAcct(uploadedForm.rows, vendors);
      if(res.error){
        const errorMsg = getErrorMessage(res?.errorType, res?.key, res?.rowIndex);
        setUploadInfo({msg:errorMsg, error:true})
      }else{
        setUploadedForm(res.data);
      }
    }
  },[uploadedForm]);

  return (
    <TabWrapper
      tab1Name="DISPLAY"
      tab2Name="CREATE"
      tab1Title="All Vendors"
      tab2Title="Create Vendor"
      activeTab={activeTab}
      handleActiveTab={handleActiveTab}
    >
     {activeTab==="DISPLAY"?
       <AllPersonalAccount
          personalAccounts={vendorsDisplay}
          handleClickCell={handleClickCell}
          showAllRows={false}
          searchName="vendorsSearch"
          searchValue={searchValue}
          onChangeSearch={onChangeSearch}
          handleSearch={handleSearch}
          handleClear={handleClear}
          personalAcctType="Vendors"
       />
      :<CreatePersonalAccount 
        formData={formInput}
        setFormData={setFormInput}
        handleSubmit={handleSubmitFunction}
        handleUpload={handleUpload}
        personalAcctType="VENDORS"
        infoMsgByEntry={infoMsg}
        setInfoMsgByEntry={(e)=>setInfoMsg(e)}
        useUploadedForm
        setUploadedForm={e=>setUploadedForm(e)}
        uploadInfo={uploadInfo}
        editForm={editForm}
        handleInfoMsg={handleInfoMsg}
        handleCancel={()=>setActiveTab('DISPLAY')}
        showCreateBtn={!uploadInfo?.error}
        handleCreateMultiPersonalAccts={handleCreateMultiPersonalAccts}
        accountGroups={accountGroups}
      />
     } 
     <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          //theme="light"
          //bodyClassName={postError.color}
        />
    </TabWrapper>
  )
}

export default Vendors