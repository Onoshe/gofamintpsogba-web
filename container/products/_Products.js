'use client'
import TableWithPinnedView from '@/components/tables/TableWithPinnedView';
import React, {useReducer} from 'react';
import CreateProduct from './component/CreateProduct';
import useStoreTransactions from '@/context/storeTransactions';
import { handleSubmit} from './utils/handleSubmit';
import { handleClickRow, handleDeleteProduct } from './utils/handleTableActions';
import { initStateCreateByUpload, reducerCreateByUpload } from './reducers/reducerCreateByUpload';
import CreateProductByUpload from './component/CreateProductByUpload';
import Header from './component/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmAlert from '@/components/confirmAlert/ConfirmAlert';
import ToolsBar from './component/ToolsBar';
import { handleSubmitMultiple } from './utils/handleSubmitMultiple';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
import useStoreHeader from '@/context/storeHeader';
import { getCompanyLogo } from '../company/components/utils/getSubscriptionHistory';
import { getPermissions, pmsActs } from '@/lib/permissions/permissions';

const Products = ({ssUser}) => {
  const { session, user,  status} = useAuthCustom(ssUser);
  const {products, dispatchProducts, runDispatchClientDataCall,} = useStoreTransactions((state) => state);
  const [stateCreate, dispatchCreate] = useReducer(reducerCreateByUpload, initStateCreateByUpload);
  const [showBlind, setShowBlind] = React.useState(false);
  const [formInput, setFormInput] = React.useState({productName:'', productCode:'', description:'', newCategory:"", category:"", categoryCode:""});
  const [deleteRow, setDeleteRow] = React.useState({});
  const [infoMsg, setInfoMsg] = React.useState({msg:""});
  const [createType, setCreateType] = React.useState('MANUAL');
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [alertBlind, setAlertBlind] = React.useState({show:false, cell:{}, title:'', msg:'', showInput:false, inputVal:""}); //React.useState({show:false, title:'', msg:''});
  const {settings} = useStoreHeader((state) => state);
  const [showConfirm, setShowConfirm] = React.useState({show:false, cell:{}, title:'', msg:'', showInput:false, inputVal:""});
  const companyLogoFile = getCompanyLogo(settings);


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
        setFormInput({category:'', productName:'', productCode:'', description:'', newCategory:"",});
        setInfoMsg({msg:''})
  }
  const handleClickBtn =(act)=>{
    if(act==="MANUAL"){
      handleShowBlind(true)
    }
    setCreateType(act)
  }

  const handleFormInput =(e)=>{
    const {name, value} = e.target;
    //console.log(value, name)
    let inputVal = value;
    if(value?.includes('--New Category--')){
      //inputVal = "";
    }
    if(name === 'category'){
      setFormInput({...formInput, [name]:inputVal, newCategory:''})
    }else{ setFormInput({...formInput, [name]:inputVal}) }
    setInfoMsg({msg:''})
  }

  const handleInfoMsg = (type, msg)=>{
    notify(type, msg);
  }
  const handleClickRowFunction = async (el)=>{
    const editDeleteLock = settings?.data?.find((dt)=> dt.slug === "transaction-edit-delete-lock");
    if(editDeleteLock?.smallText === "ON"){
      notify('error', "Transaction Edit or Delete has been locked!. Please, contact the Admin to unlock");
    }else{
      const {key, row} = el;
      if(row.createdBy === "DEMO") return;
      const perms = await getPermissions({user, act:pmsActs.EDIT_PRODUCT, form:[row]});
      if(!perms.permit) return notify("error", perms.msg);

      handleClickRow({el, products, setFormInput, setShowBlind, setInfoMsg, dispatchProducts, setDeleteRow, deleteRow, setSelectedProduct, 
        setAlertBlind, user});
    }
  };
  const handleConfirmation =(event)=>{
    if(event === "CANCEL"){
      handleDeleteProduct({deleteType:'CANCEL', setAlertBlind})
    }else if(event === "CONTINUE"){
      //handleDeleteProduct({el:{}, deleteRow, deleteType:'CONTINUE', handleInfoMsg, setAlertBlind, setDeleteRow, user, runDispatchClientDataCall})
      
        if(alertBlind?.cell?.row?.id && user?.companyId){
          const {id, productCode, productName} = alertBlind.cell.row;
          const deletedAcct = `${productCode}: ${productName} account`;
        if(alertBlind.showInput){
            if(!alertBlind?.inputVal) return notify('error', 'Please, enter '+alertBlind.cell.row.productName+' account code to confirm account delete!')
            if(alertBlind?.inputVal?.trim() === alertBlind.cell.row.productCode){
              handleDeleteProduct({el:{}, deleteRow, deleteType:'CONTINUE', handleInfoMsg, setAlertBlind, setDeleteRow, user, runDispatchClientDataCall})
            }else{notify('error', 'The value you entered is not the same as '+alertBlind.cell.row.productName+' account code')}
        }else{
          handleDeleteProduct({el:{}, deleteRow, deleteType:'CONTINUE', handleInfoMsg, setAlertBlind, setDeleteRow, user, runDispatchClientDataCall})
        }
      }else{notify('error', 'Account not found or User not logged in!')} 
    }
  }
  const handleSubmitFunction = async(e)=>{
    e.preventDefault();
    const perms = await getPermissions({user, act:pmsActs.CREATE_PRODUCT, form:[formInput]});
    if(!perms.permit) return notify("error", perms.msg);

    handleSubmit({ formInput, setInfoMsg, user, products, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput});
    //handleSubmit({e, formInput,products, setInfoMsg, dispatchProducts, handleShowBlind, setFormInput})
  }
  const handleCreateMultiProducts =()=>{
    const formData = stateCreate.table.rows;
    handleSubmitMultiple({formData,  user,products, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput, dispatchCreate});
  }

  return (
      <div className='min-h-screen -mt-[15px]'>
        <div className='bg-blue-50 pt-4 pb-3'>
            <CreateProduct showBlind={showBlind} handleClose={()=>{handleShowBlind(false); setFormInput({});}}
              formInput={formInput}
              handleFormInput={handleFormInput}
              handleSubmit={handleSubmitFunction}
              products={products}
              infoMsg={infoMsg}
              selectedProduct={selectedProduct}
              />
            <Header handleShowBlind={handleShowBlind} handleClickBtn={handleClickBtn} createType={createType}/>
        </div>
        {createType === "UPLOAD" && 
            <CreateProductByUpload stateCreate={stateCreate} 
              dispatchCreate={dispatchCreate}
              handleCreateMultiProducts={handleCreateMultiProducts}
              products={products}
              />
          }
          {createType !== "UPLOAD" && <ToolsBar
             excelData={products}
             notify={notify}
             runDispatchClientDataCall={runDispatchClientDataCall}
             user={user}
             companyLogoFile={companyLogoFile}
          />}
          {createType === "MANUAL" && <>
            {products?.length > 1?
              <TableWithPinnedView
                classNameTable={"overflow-x-auto h-[70vh] overflow-y-auto mt-2 mx-4 mb-4 resize-y"}
                //classNameTable={"overflow-x-auto h-[70vh] overflow-y-auto resize-y m-4"}
                header={headersArr} 
                rowKeys={['productCode', 'category', 'productName', 'description', 'edit', 'delete']}
                rows={products.slice(1)}
                classNameHeaderTR="bg-blue-50 cursor-pointer" 
                classNameRowsTR="border border-gray-200 hover:bg-blue-50"
                clickableHeader={false}
                onClickHeader={(e)=>console.log(e)}
                clickableRowCell={true}
                clickableRowCellKeys ={['edit', 'delete']}
                onClickRowCell={handleClickRowFunction}
            />
          : <div>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <p className='text-center text-red-900'>No Product available</p>
            </div>}
          </>}
          <ConfirmAlert
            showBlind={alertBlind.show}
            title={alertBlind.title}
            msg={alertBlind.msg}
            handleContinue={()=>handleConfirmation("CONTINUE")}
            handleCancel={()=>handleConfirmation("CANCEL")}
            setShowConfirm={setAlertBlind}
            showConfirm={alertBlind}
            //handleInfoMsg={handleInfoMsg}
            //runDispatchClientDataCall={runDispatchClientDataCall}
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
          />
      </div>
  )
}

export default Products;

//[{className:'bg-blue-50 py-5', title:''}, {title:'Product Code'}, {title:'Category'}, {title:'Product Name'}, {title:'Description'}, {title:'Edit'}, {title:'Delete'}]
const headersArr=[
  {className:'bg-blue-50 py-5', title:''}, 
  {title:'Product Code', name:'productCode'}, 
  {title:'Category', name:'category'}, 
  {title:'Product Name', name:'productName'}, 
  {title:'Description', name:'description'}, 
  {title:'Edit', name:'edit'}, 
  {title:'Delete', name:'delete'}
]; 
