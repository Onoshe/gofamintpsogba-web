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
import 'react-toastify/dist/ReactToastify.css';
import { handleSubmitMultiAccts } from './utils/handleSubmitMultiAccts';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
import { getPermissions, pmsActs } from '@/lib/permissions/permissions';
import ConfirmAlert from '@/components/confirmAlert/ConfirmAlert';
import { handleDeleteAccountOrTran } from './utils/handleDeleteAccountOrTran';
import { getLinkFetchTableWithConds } from '@/lib/apiRequest/urlLinks';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { getDeleteAffectedTransactions } from '../chartOfAccount/utils/handleDeleteRelatedTrans';


const Customers = ({ssUser}) => {
  const { session, user,  status} = useAuthCustom(ssUser);
  const {customers, dispatchCustomers, runDispatchClientDataCall} = useStoreTransactions((state) => state);
  const {settings, toastNotice, dispatchToastNotice} = useStoreHeader((state) => state);
  const [activeTab, setActiveTab] = React.useState('DISPLAY');
  const [editForm, setEditForm] = React.useState(false);
  const [formInput, setFormInput] = React.useState({});
  const [infoMsg, setInfoMsg] = React.useState({msg:'', error:false});
  const [selectedOpt, setSelectedOpt] = React.useState('');
  const [uploadedForm, setUploadedForm] = React.useState('');
  const [uploadInfo, setUploadInfo] = React.useState({msg:'', error:false});
  const [searchValue, setSearchValue] = React.useState('');
  const [customersDisplay, setCustomersDisplay] = React.useState([...customers]);
  const [showConfirm, setShowConfirm] = React.useState({show:false, cell:{}, title:'', msg:'', showInput:false, inputVal:""});
  const [uploading, setUploading] = React.useState(null);
  //console.log(formInput)
  //Uploaded file accountCode is of type accountCode:00007. Format to accountCode:C-00007
  if(uploadedForm?.rows?.length){
    uploadedForm.rows = uploadedForm.rows.map((dt)=> {
      return {...dt, accountCode:dt.accountCode?.includes("C-")? dt.accountCode : "C-"+dt.accountCode}});
  }
 

  const notify =(type, msg)=>{
    dispatchToastNotice({type, msg, count:parseInt(toastNotice.count)+1})
  }
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
  const  handleCreateMultiPersonalAccts = async ()=>{
    setUploading('uploading');
    const perms = await getPermissions({user, act:pmsActs.CREATE_PERSONAL_ACCOUNT, form:[formInput]});
    if(!perms.permit) return notify("error", perms.msg);

    await  handleSubmitMultiAccts({forms:uploadedForm,  handleInfoMsg,  personalAcct:"customers", runDispatchClientDataCall, setFormInput, user, setActiveTab})
      .then(()=>{ setUploading(null);});
  
  };

  const handleUpload =(e)=>{
    //console.log(e)
  }
  const handleClickCell = async (el)=>{ 
        const editDeleteLock = settings?.data?.find((dt)=> dt.slug === "transaction-edit-delete-lock");
        if(editDeleteLock?.smallText === "ON"){
          notify('error', "Transaction Edit or Delete has been locked!. Please, contact the Admin to unlock");
        }else{    
          if(el?.row?.createdBy !== "DEMO"){
            const perms = await getPermissions({user, act:pmsActs.EDIT_PERSONAL_ACCOUNT, form:[el.row]});
            if(perms.permit){
            await handleClickRow({el, user, setFormInput,  setInfoMsg, handleActiveTab, setSelectedOpt, setShowConfirm});
            }else{notify("error", perms.msg)}
          }
        }
      
  }
  const handleConfirm = (act)=>{
    if(act === "CANCEL"){ setShowConfirm({show:false, cell:{}, inputVal:''});}
    if(act === "CONTINUE"){
      if(showConfirm?.cell?.row?.id && user?.companyId){
          const {id, accountCode, firstname, lastname} = showConfirm.cell.row;
          const deletedAcct = `${accountCode}: ${firstname} ${lastname} account`;
         if(showConfirm.showInput){
             if(!showConfirm?.inputVal) return notify('error', 'Please, enter '+showConfirm.cell.row.firstname+' '+showConfirm.cell.row.lastname+' account code to confirm account delete!')
            if(showConfirm?.inputVal?.trim() === showConfirm.cell.row.accountCode){
              //return console.log(showConfirm?.inputVal?.trim(), showConfirm.cell.row.accountCode)
              handleDeleteAccountOrTran({user, notify, setShowConfirm, runDispatchClientDataCall, deletedAcct, showConfirm, showConfirmObj:true, whereVal:id, tableName:"customers"})
            }else{notify('error', 'The value you entered is not the same as '+showConfirm.cell.row.firstname+' '+showConfirm.cell.row.lastname+' account code')}
         }else{
            handleDeleteAccountOrTran({user, notify, showConfirm, setShowConfirm, runDispatchClientDataCall, deletedAcct, showConfirmObj:true, whereVal:id, tableName:"customers"})    
         }
      }else{notify('error', 'Account not found or User not logged in!')}
   } 
  }

  const handleInfoMsg = (type, msg)=>{
    notify(type, msg);
  }
 
  const handleSubmitFunction = async (e)=>{
    const perms = await getPermissions({user, act:pmsActs.CREATE_PERSONAL_ACCOUNT, form:[formInput]});
    if(!perms.permit) return notify("error", perms.msg);

    handleSubmit({e, formInput, setInfoMsg,  handleInfoMsg, personalAccts:customers, handleActiveTab, dispatchCustomers, setFormInput, 
      user, runDispatchClientDataCall, setActiveTab, setFormInput, personalAcct:"customers", handleClear});
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

 const validateUploadData = async ()=>{
  const fetchTableUrl = getLinkFetchTableWithConds({table:user.companyId+'_customers', conds:'deleted', values:'0'});
  const customers = await getRequest(fetchTableUrl);
    setUploadInfo({msg:'Form uploaded successfully', error:false});
    const res =validateAndFormatPersonalAcct(uploadedForm.rows, customers);
    console.log(res)
    if(res.error){
      const errorMsg = getErrorMessage(res?.errorType, res?.key, res?.rowIndex);
      setUploadInfo({msg:errorMsg, error:true})
    }else{
      setUploadedForm(res.data);
    }
 }

  React.useEffect(()=>{
    if(uploadedForm.show && uploadedForm.rows){
      validateUploadData();
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
          user={user}
          notify={notify}
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
          uploading={uploading}
          personalAcctLen={customers?.length}
      />
     } 

        <ConfirmAlert showBlind={showConfirm.show}
             title={showConfirm.title}
             msg={showConfirm.msg}
             handleCancel={()=>handleConfirm("CANCEL")}
             handleContinue={()=>handleConfirm("CONTINUE")}
             setShowConfirm={setShowConfirm}
             showConfirm={showConfirm}
           />
        
    </TabWrapper>
  )
}

export default Customers