'use client'
import { useState } from 'react';
import AllPersonalAccount from '@/components/customersVendors/AllPersonalAccount';
import CreatePersonalAccount from '@/components/customersVendors/CreatePersonalAccount';
import TabWrapper from '@/components/customersVendors/HeaderTab';
import useStoreHeader from '@/context/storeHeader';
import React from 'react';
import useStoreTransactions from '@/context/storeTransactions';
import { handleSubmit } from './utils/handleSubmit';
import { handleClickRow } from './utils/handleTableActions';
import { validateAndFormatPersonalAcct } from '@/lib/validation/validatePersonalAcctUpload';
import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleSubmitMultiAccts } from './utils/handleSubmitMultiAccts';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
import { getPermissions, pmsActs } from '@/lib/permissions/permissions';


const Customers = ({ssUser}) => {
  const { session, user,  status} = useAuthCustom(ssUser);
  const {customers, dispatchCustomers, runDispatchClientDataCall} = useStoreTransactions((state) => state);
  const [activeTab, setActiveTab] = React.useState('DISPLAY');
  const [editForm, setEditForm] = React.useState(false);
  const [formInput, setFormInput] = React.useState({});
  const [infoMsg, setInfoMsg] = React.useState({msg:'', error:false});
  const [selectedOpt, setSelectedOpt] = React.useState('');
  const [uploadedForm, setUploadedForm] = React.useState('');
  const [uploadInfo, setUploadInfo] = React.useState({msg:'', error:false});
  const [searchValue, setSearchValue] = React.useState('');
  const [customersDisplay, setCustomersDisplay] = React.useState([...customers]);
  
  //console.log(customers)
  //Uploaded file accountCode is of type accountCode:00007. Format to accountCode:C-00007
  if(uploadedForm?.rows?.length){
    uploadedForm.rows = uploadedForm.rows.map((dt)=> {
      return {...dt, accountCode:dt.accountCode?.includes("C-")? dt.accountCode : "C-"+dt.accountCode}});
  }
  //console.log(uploadInfo)
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
  if(customers?.length){
    customers.forEach(el => {
      const exist = accountGroups?.find(dt=> dt.value == el.accountGroup);
      if(el?.accountGroup && !exist){
        accountGroups.push({value:el.accountGroup, label:el.accountGroup})}
    });
  }
  //console.log(accountGroups)
  const handleActiveTab =(tab, act)=>{
        setActiveTab(tab);
        setEditForm(act==='EDIT');
        if(act !=="EDIT"){setFormInput({});}
  }
  const  handleCreateMultiPersonalAccts =()=>{
    handleSubmitMultiAccts({forms:uploadedForm,  handleInfoMsg,  personalAcct:"customers", runDispatchClientDataCall, setFormInput, user, setActiveTab});
  };

  const handleUpload =(e)=>{
    //console.log(e)
  }
  const handleClickCell =(el)=>{     
      if(el?.row?.createdBy !== "DEMO"){
        //return console.log({user, act:pmsActs.EDIT_PERSONAL_ACCOUNT, companyId:user.companyId, form:el.row})
        const result = getPermissions({user, act:pmsActs.EDIT_PERSONAL_ACCOUNT, companyId:user.companyId, form:el.row});
        if(result.permit){
          handleClickRow({el, setFormInput,  setInfoMsg, handleActiveTab, setSelectedOpt});
        }else{notify("error", result.msg)}
      }
  }

  const handleInfoMsg = (type, msg)=>{
    notify(type, msg);
  }
 
  const handleSubmitFunction =(e)=>{
    handleSubmit({e, formInput, setInfoMsg,  handleInfoMsg, personalAccts:customers, handleActiveTab, dispatchCustomers, setFormInput, 
      user, runDispatchClientDataCall, setActiveTab, setFormInput, personalAcct:"customers"})
    //console.log(e)
  }

  const handleSearch =(el)=>{
    const searchedCustomer = [...customers].filter((e)=> `${e.firstname} ${e.lastname} ${e.othernames}${e.email}${e.nextContactPersonName} ${e.nextContactPersonEmail} ${e.nextContactPersonName} ${e.residentialAddress} ${e.companyName} ${e.companyAddress}`.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));    
    //const searchTerm = `${firstname}${lastname}${email}${nextContactPersonName}${nextContactPersonEmail}${nextContactPersonName}${residentialAddress}${companyName}${companyAddress}`;
    setCustomersDisplay(searchedCustomer);
    //handleClickRow({el, setFormInput,  setInfoMsg, handleActiveTab, setSelectedOpt});
 }
 const onChangeSearch =(el)=>{     
    setSearchValue(el.target.value);
 }
 const handleClear =()=>{     
  setSearchValue("");
  setCustomersDisplay(customers)
}
 React.useEffect(()=>{
  if(!searchValue){
    handleClear();
  }
 },[searchValue, customers]);


  React.useEffect(()=>{
    if(uploadedForm.show && uploadedForm.rows){
      setUploadInfo({msg:'Form uploaded successfully', error:false});
      const res =validateAndFormatPersonalAcct(uploadedForm.rows, customers);
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
      tab1Title="All Customers"
      tab2Title="Create Customer"
      activeTab={activeTab}
      handleActiveTab={handleActiveTab}
    >
     {activeTab==="DISPLAY"?
       <AllPersonalAccount
          personalAccounts={customersDisplay}
          handleClickCell={handleClickCell}
          showAllRows={false}
          searchName="customersSearch"
          searchValue={searchValue}
          onChangeSearch={onChangeSearch}
          handleSearch={handleSearch}
          handleClear={handleClear}
          personalAcctType="Customers"
       />
      :<CreatePersonalAccount 
          formData={formInput}
          setFormData={setFormInput}
          handleSubmit={handleSubmitFunction}
          handleUpload={handleUpload}
          personalAcctType="CUSTOMERS"
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

export default Customers