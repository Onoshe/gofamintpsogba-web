'use client'
import { useState } from 'react';
import AllPersonalAccount from '@/components/customersVendors/AllPersonalAccount';
import CreatePersonalAccount from '@/components/customersVendors/CreatePersonalAccount';
import TabWrapper from '@/components/customersVendors/HeaderTab';
import React from 'react';
import useStoreTransactions from '@/context/storeTransactions';
import { validateAndFormatPersonalAcct } from '@/lib/validation/validatePersonalAcctUpload';
import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleSubmit } from '../customers/utils/handleSubmit';
import { handleClickRow } from '../customers/utils/handleTableActions';
import { handleSubmitMultiAccts } from '../customers/utils/handleSubmitMultiAccts';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
import { getPermissions, pmsActs } from '@/lib/permissions/permissions';
import ConfirmAlert from '@/components/confirmAlert/ConfirmAlert';
import { getPersonalAcctUrl } from '../customers/utils/getPersonalAcctUrl';
import { useSWRFetcher } from '@/lib/hooks/useSWRFetcher';
import { handleDeleteAccountOrTran} from '../customers/utils/handleDeleteAccountOrTran';
import { getLinkFetchTableWithConds } from '@/lib/apiRequest/urlLinks';
import { getRequest } from '@/lib/apiRequest/getRequest';


const Vendors = ({ssUser}) => {
  const { session, user,  status} = useAuthCustom(ssUser);
  const {vendors, dispatchVendors, runDispatchClientDataCall} = useStoreTransactions((state) => state);
  //const {data, mutate} = useSWRFetcher(getPersonalAcctUrl(user, 'vendors'));
  //const vendors = data.data;
  const [activeTab, setActiveTab] = React.useState('DISPLAY');
  const [editForm, setEditForm] = React.useState(false);
  const [formInput, setFormInput] = React.useState({});
  const [infoMsg, setInfoMsg] = React.useState({msg:'', error:false});
  const [selectedOpt, setSelectedOpt] = React.useState('');
  const [uploadedForm, setUploadedForm] = React.useState('');
  const [uploadInfo, setUploadInfo] = React.useState({msg:'', error:false});
  const [searchValue, setSearchValue] = React.useState('');
  const [vendorsDisplay, setVendorsDisplay] = React.useState([...vendors]);
  const [showConfirm, setShowConfirm] = React.useState({show:false, cell:{}});

  
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
      //return console.log({user, act:pmsActs.EDIT_PERSONAL_ACCOUNT, companyId:user.companyId, form:el.row})
      const result = getPermissions({user, act:pmsActs.EDIT_PERSONAL_ACCOUNT, companyId:user.companyId, form:el.row});
      if(result.permit){
        handleClickRow({el, setFormInput,  setInfoMsg, handleActiveTab, setSelectedOpt, setShowConfirm});
      }else{notify("error", result.msg)}
    }
}

  const handleConfirm = (act)=>{
    if(act === "CANCEL"){setShowConfirm({show:false, cell:{}});}
    if(act === "CONTINUE"){
      if(showConfirm?.cell?.row?.id && user?.companyId){
        const {id, accountCode, firstname, lastname} = showConfirm.cell.row;
        const deletedAcct = `${accountCode}: ${firstname} ${lastname} account`;
        handleDeleteAccountOrTran({user, notify, setShowConfirm, runDispatchClientDataCall, deletedAcct, showConfirmObj:true, whereVal:id, tableName:"vendors"})
     }else{notify('error', 'Account not found or User not logged in!')}
    }
  }


 const handleInfoMsg = (type, msg)=>{
    notify(type, msg);
  }
  const handleSubmitFunction = async (e)=>{
   handleSubmit({e, formInput, setInfoMsg, handleInfoMsg,  personalAccts:vendors, handleActiveTab, dispatchVendors, setFormInput,
     user, runDispatchClientDataCall, setActiveTab, setFormInput, personalAcct:"vendors", handleClear});
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
  setVendorsDisplay(vendors);
  //console.log(vendors)
}
 React.useEffect(()=>{
  if(!searchValue){
    handleClear();
  }
 },[searchValue, vendors]);

 React.useEffect(()=>{
   handleClear();
 },[vendors]);


  const validateUploadData = async ()=>{
    const fetchTableUrl = getLinkFetchTableWithConds({table:user.companyId+'_vendors', conds:'deleted', values:'0'});
    const vendors = await getRequest(fetchTableUrl);
      setUploadInfo({msg:'Form uploaded successfully', error:false});
      const res =validateAndFormatPersonalAcct(uploadedForm.rows, vendors);
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
          user={user}
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

        <ConfirmAlert showBlind={showConfirm.show}
             title={`Do you really want to delete account: ${showConfirm?.cell?.row?.accountCode}- ${showConfirm?.cell?.row?.firstname} ${showConfirm?.cell?.row?.lastname}?`}
             msg="Please note that all transactions associated with this account will also be deleted."
             handleCancel={()=>handleConfirm("CANCEL")}
             handleContinue={()=>handleConfirm("CONTINUE")}
           />
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