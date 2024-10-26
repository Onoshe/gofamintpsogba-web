'use client'
import TableWithPinnedView from '@/components/tables/TableWithPinnedView';
import React, { useReducer } from 'react';
import CreateChartOfAccount from './component/CreateChartOfAccount';
import useStoreTransactions from '@/context/storeTransactions';
import { handleClickRow } from './utils/handleTableActions';
import { handleSubmit } from './utils/handleSubmit';
import Header from './component/Header';
import CreateChartOfAccountByUpload from './component/CreateChartOfAccountByUpload';
import { initStateCreateByUpload,  reducerCreateByUpload} from './reducers/reducerCreateByUpload';
import { sortArrayByKey } from '@/lib/sort/sortArrayByKey';
import { mapChartOfAccountForDisplay } from '@/lib/transactionsManager/mapChartOfAccountForDisplay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmAlert from '@/components/confirmAlert/ConfirmAlert';
import { handleDelete } from './utils/handleDelete';
import ToolsBar from './component/ToolsBar';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
import { getRequest } from '@/lib/apiRequest/getRequest';
import useStoreHeader from '@/context/storeHeader';
import { getCompanyLogo } from '../company/components/utils/getSubscriptionHistory';
import { getPermissions, pmsActs } from '@/lib/permissions/permissions';



const ChartOfAccount = ({ssUser}) => {
  const { session, user,  status} = useAuthCustom(ssUser);
  const {coaStructure, clientsDataCall,controlAcctsCode, runDispatchClientDataCall, transactions, chartOfAccounts, dispatchChartOfAccounts} = useStoreTransactions((state) => state);
  const [stateCreate, dispatchCreate] = useReducer(reducerCreateByUpload, initStateCreateByUpload);
  const [showBlind, setShowBlind] = React.useState(false);
  const [formInput, setFormInput] = React.useState({id:'',  accountName:'', accountType:'', typeCode:'', accountCode:'', description:'', addToDashboard:false, editAcct:false});
  const [selectedOpt, setSelectedOpt] = React.useState('999');
  const [infoMsg, setInfoMsg] = React.useState({msg:""});
  const [createType, setCreateType] = React.useState('MANUAL');
  const [showConfirm, setShowConfirm] = React.useState({show:false, cell:'', title:'', msg:'', titleRed:false, showInput:false});
  const {settings} = useStoreHeader((state) => state);
  const companyLogoFile = getCompanyLogo(settings);
  sortArrayByKey(chartOfAccounts, 'accountCode');

  //getRequest("http://localhost/quickrecords_backend/server.php/api/affected-trans?d=demo").then((res)=>console.log(res));



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

  const handleShowBlind =(act)=>{
        setShowBlind(act);
        setFormInput({id:'', accountName:'', accountType:'', typeCode:'', accountCode:'', description:'', addToDashboard:false,});
        setInfoMsg({msg:''});
        setSelectedOpt('999')
  }
  const handleClickBtn =(act)=>{
    if(act==="MANUAL" && createType === "MANUAL"){
      handleShowBlind(true)
    }
    setCreateType(act)
  }
  const handleFormInput =(e)=>{
    const {name, value} = e.target;
        //return console.log(name, value)
        if(name === 'selectCategory' && value){
          setFormInput({...formInput, [name]:value, newCategory:''})
        }else{ setFormInput({...formInput, [name]:value})}
        setInfoMsg({msg:""});
    }

  const handleClickRowFunction = async (el)=>{
    const {key, row} = el;
    if(row.createdBy === "DEMO") return;
    const perms = await getPermissions({user, act:pmsActs.EDIT_COA, form:[row]});
    if(!perms.permit) return notify("error", perms.msg);

     handleClickRow({el, user, setFormInput, setShowBlind, setInfoMsg, setShowConfirm, handleSubmitFunction, chartOfAccounts, dispatchChartOfAccounts, setSelectedOpt, coaStructure})
  };
  const coaStructureWithoutRetEarnings = coaStructure?.filter((dt)=> dt.name.toLowerCase() !== "retainedearnings");
  const coaAcct = mapChartOfAccountForDisplay(chartOfAccounts, coaStructure);
  //console.log(chartOfAccounts, coaStructure)

  const handleInfoMsg = (type, msg)=>{
    notify(type, msg);
  }
  const handleConfirm = (act)=>{
      if(act === "CANCEL"){setShowConfirm({show:false, cell:'', title:'', msg:''}); handleShowBlind(false)}
      if(act === "CONTINUE"){
          if(showConfirm?.cell?.row?.id && user?.companyId){
          if(showConfirm.showInput){
              if(!showConfirm?.inputVal) return notify('error', 'Please, enter '+showConfirm.cell.row.accountName+' account code to confirm account delete!')
              if(showConfirm?.inputVal?.trim() === showConfirm.cell.row.accountCode){
                //handleDeleteProduct({el:{}, deleteRow, deleteType:'CONTINUE', handleInfoMsg, setShowConfirm, setDeleteRow, user, runDispatchClientDataCall})
                handleDelete({ formInput,  user, setShowConfirm, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput})
              }else{notify('error', 'The value you entered is not the same as '+showConfirm.cell.row.accountName+' account code')}
          }else{
            //handleDeleteProduct({el:{}, deleteRow, deleteType:'CONTINUE', handleInfoMsg, setShowConfirm, setDeleteRow, user, runDispatchClientDataCall})
            handleDelete({ formInput,  user, setShowConfirm, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput})
          }
        }else{notify('error', 'Account not found or User not logged in!')} 

      }
  }
  const handleSubmitFunction = async (e)=>{
    const perms = await getPermissions({user, act:pmsActs.CREATE_COA, form:[formInput]});
    if(!perms.permit) return notify("error", perms.msg);

      e.preventDefault();
      handleSubmit({formInput, setInfoMsg, user, coaStructure, chartOfAccounts, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput})
  }

  return (
      <div className=''>
          <CreateChartOfAccount showBlind={showBlind} handleClose={()=>{handleShowBlind(false); setFormInput({});}}
            formInput={formInput}
            handleFormInput={handleFormInput}
            handleSubmit={handleSubmitFunction}
            coaStructure={coaStructureWithoutRetEarnings}
            infoMsg={infoMsg}
            selectedOpt={selectedOpt}
            chartOfAccounts={chartOfAccounts}
            controlAcctsCode={controlAcctsCode}
            />
          <Header handleShowBlind={handleShowBlind} handleClickBtn={handleClickBtn} createType={createType}/>
          {createType === "UPLOAD" && 
            <CreateChartOfAccountByUpload 
              stateCreate={stateCreate} 
              dispatchCreate={dispatchCreate}
              chartOfAccounts={chartOfAccounts}
              coaStructure={coaStructure}
              dispatchChartOfAccounts={dispatchChartOfAccounts}
              user={user}

              //setFormInput=""
              runDispatchClientDataCall={runDispatchClientDataCall}
              handleInfoMsg={handleInfoMsg}
              setShowBlind={setShowBlind}
              controlAcctsCode={controlAcctsCode}
              />
          }
          {createType === "MANUAL" && <ToolsBar
             excelData={chartOfAccounts}
             runDispatchClientDataCall={runDispatchClientDataCall}
             notify={notify}
             user={user}
             companyLogoFile={companyLogoFile}
             coaStructure={coaStructure}
          />}
           <ConfirmAlert showBlind={showConfirm.show}
             title={showConfirm.title}
             msg={showConfirm.msg}
             handleCancel={()=>handleConfirm("CANCEL")}
             handleContinue={()=>handleConfirm("CONTINUE")}
             setShowConfirm={setShowConfirm}
              showConfirm={showConfirm}
           />
            <button className='btn btn-sm m-2 hidden' onClick={()=>{runDispatchClientDataCall()}}>Run Update Data</button>
          {createType === "MANUAL" && 
            <TableWithPinnedView
              header={headersArr} 
              rowKeys={['accountCode', 'accountName', 'accountType', 'description', 'edit', 'delete']}
              rows={coaAcct}
              //classNameTable={"overflow-x-auto h-[70vh] overflow-y-auto resize-y"}
              classNameTable={"overflow-x-auto h-[70vh] overflow-y-auto resize-y m-4"}
              classNameHeaderTR="bg-blue-50 cursor-pointer" 
              classNameRowsTR="border border-gray-200 hover:bg-blue-50"
              clickableHeader={true}
              onClickHeader={(e)=>console.log()}
              clickableRowCell={true}
              clickableRowCellKeys ={['edit', 'delete']}
              onClickRowCell={handleClickRowFunction}
              pinRow
            />}

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
        />
      </div>
  )
}

export default ChartOfAccount;


const headersArr=[
  {className:'bg-blue-50 py-5', title:''}, 
  {title:'Account Code', name:'accountCode'}, 
  {title:'Account Name', name:'accountName'}, 
  {title:'Account Type', name:'accountType'}, 
  {title:'Description', name:'description'}, 
  {title:'Add to Dashboard', name:'addToDashboard'}, 
  {title:'Edit', name:'edit'}, 
  {title:'Delete', name:'delete'}
]; 
