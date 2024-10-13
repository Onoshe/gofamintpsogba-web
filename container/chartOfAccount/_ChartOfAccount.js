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



const ChartOfAccount = ({ssUser}) => {
  const { session, user,  status} = useAuthCustom(ssUser);
  const {coaStructure,runDispatchClientDataCall, chartOfAccounts, dispatchChartOfAccounts} = useStoreTransactions((state) => state);
  const [stateCreate, dispatchCreate] = useReducer(reducerCreateByUpload, initStateCreateByUpload);
  const [showBlind, setShowBlind] = React.useState(false);
  const [formInput, setFormInput] = React.useState({id:'',  accountName:'', accountType:'', typeCode:'', accountCode:'', description:'', addToDashboard:false, editAcct:false});
  const [selectedOpt, setSelectedOpt] = React.useState('999');
  const [infoMsg, setInfoMsg] = React.useState({msg:""});
  const [createType, setCreateType] = React.useState('MANUAL');
  const [showConfirm, setShowConfirm] = React.useState(false);
  sortArrayByKey(chartOfAccounts, 'accountCode');
  
  //console.log(stateCreate);

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

  const handleClickRowFunction =(el)=>{
    const {key, row} = el;
     if(row.createdBy === "DEMO") return;
     handleClickRow({el, setFormInput, setShowBlind, setInfoMsg, setShowConfirm, handleSubmitFunction, chartOfAccounts, dispatchChartOfAccounts, setSelectedOpt, coaStructure})
  };
  const coaStructureWithoutRetEarnings = coaStructure?.filter((dt)=> dt.name.toLowerCase() !== "retainedearnings");
  const coaAcct = mapChartOfAccountForDisplay(chartOfAccounts, coaStructure);
  //console.log(chartOfAccounts, coaStructure)

  //console.log(formInput)
  const handleInfoMsg = (type, msg)=>{
    notify(type, msg);
  }
  const handleConfirm = (act)=>{
      if(act === "CANCEL"){setShowConfirm(false); handleShowBlind(false)}
      if(act === "CONTINUE"){
         //console.log(formInput)
        handleDelete({ formInput,  user, setShowConfirm, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput})
      }
  }
  const handleSubmitFunction =(e)=>{
      //return console.log(formInput)
      e.preventDefault();
      handleSubmit({formInput, setInfoMsg, user, coaStructure, chartOfAccounts, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput})
  }

  return (
      <div className=''>
          <CreateChartOfAccount showBlind={showBlind} handleClose={()=>handleShowBlind(false)}
            formInput={formInput}
            handleFormInput={handleFormInput}
            handleSubmit={handleSubmitFunction}
            coaStructure={coaStructureWithoutRetEarnings}
            infoMsg={infoMsg}
            selectedOpt={selectedOpt}
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
              />
          }
          {createType === "MANUAL" && <ToolsBar
             excelData={chartOfAccounts}
          />}
           <ConfirmAlert showBlind={showConfirm}
             title={"Do you really want to delete "+formInput.accountName+ " ?"}
             msg="Please note that all transactions associated with this account will also be deleted."
             handleCancel={()=>handleConfirm("CANCEL")}
             handleContinue={()=>handleConfirm("CONTINUE")}
           />

          {createType === "MANUAL" && 
            <TableWithPinnedView
              header={headersArr} 
              rowKeys={['accountCode', 'accountName', 'accountType', 'description', 'edit', 'delete']}
              rows={coaAcct}
              classNameTable={"overflow-x-auto max-h-[65vh] overflow-y-auto my-4 md:my-6"}
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
