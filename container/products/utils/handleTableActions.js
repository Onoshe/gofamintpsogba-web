import { getDeleteAffectedTransactions, handleDeleteAffectedTransactions } from "@/container/chartOfAccount/utils/handleDeleteRelatedTrans";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { activities, postActivity } from "@/lib/apiRequest/postActivity";
import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";

/*
const handleClickCell = async (el)=>{     
  if(el?.row?.createdBy !== "DEMO"){
    const result = getPermissions({user, act:pmsActs.EDIT_PERSONAL_ACCOUNT, companyId:user.companyId, form:el.row});
    if(result.permit){
     await handleClickRow({el, user, setFormInput,  setInfoMsg, handleActiveTab, setSelectedOpt, setShowConfirm});
    }else{notify("error", result.msg)}
  }
}
const handleConfirm = (act)=>{
if(act === "CANCEL"){ setShowConfirm({show:false, cell:{}, inputVal:''});}
if(act === "CONTINUE"){
  if(showConfirm?.cell?.row?.id && user?.companyId){
      const {id, accountCode, firstname, lastname} = showConfirm.cell.row;
      const deletedAcct = `${accountCode}: ${firstname} ${lastname} account`;
     if(showConfirm?.showInput){
        if(!showConfirm?.inputVal) return notify('error', 'Please, enter '+showConfirm.cell.row.firstname+' '+showConfirm.cell.row.lastname+' account code to confirm account delete!')
        if(showConfirm?.inputVal?.trim() === showConfirm.cell.row.accountCode){
          //return console.log(showConfirm?.inputVal?.trim(), showConfirm.cell.row.accountCode)
          handleDeleteAccountOrTran({user, notify, setShowConfirm, runDispatchClientDataCall, deletedAcct, showConfirm, showConfirmObj:true, whereVal:id, tableName:"vendors"})
        }else{notify('error', 'The value you entered is not the same as '+showConfirm.cell.row.firstname+' '+showConfirm.cell.row.lastname+' account code')}
     }else{
        handleDeleteAccountOrTran({user, notify, setShowConfirm, showConfirm, runDispatchClientDataCall, deletedAcct, showConfirmObj:true, whereVal:id, tableName:"vendors"})    
     }
  }else{notify('error', 'Account not found or User not logged in!')}
} 
}
*/

const handleClickRow = async ({el, setFormInput, setShowBlind, setInfoMsg, dispatchProducts, deleteType, setDeleteRow,
     deleteRow, setAlertBlind, setSelectedProduct, handleInfoMsg, runDispatchClientDataCall, user, setShowConfirm})=>{
    const {key, i, row} = el;
    const rowIndex = i +1; // ---New Category-- is the default row 0;

    //Edit 
    if(key === 'edit'){
      const {id, productName, productCode, description, category} = row;
      setFormInput({id, productName, productCode, description, newCategory:"", category, editProduct:true});
      setSelectedProduct(category);
      setShowBlind(true);
      setInfoMsg({msg:''});
    }
    //Delete Confirmation
    if(key === 'delete'){
      const affectedTrans = await getDeleteAffectedTransactions({user, t:'s', c:row?.productCode});
      setDeleteRow(row);
      //setAlertBlind({show:true, title:'Delete Product '+row.productCode, msg:'Do you really want to delete '+row.productName+' with code '+row.productCode+'?'})
      //console.log(affectedTrans)
      if(affectedTrans?.transIds?.length){
        const title = `${row?.productCode}- ${row?.productName} account affected ${affectedTrans.transIds.length} transactions!`
        const msg= `${row?.productCode} Account and all associated transactions will be deleted. Enter ${row.productName}'s account code if you really want to continue`;
        setAlertBlind({show:true, cell:el, title, msg, titleRed:true, showInput:true});
       }else{
        const title = `Do you really want to delete account: ${row?.productCode}- ${row?.productName}?`
        const msg= "Please note that all transactions associated with this account will also be deleted.";
        setAlertBlind({show:true, showInput:false, cell:el, title, msg});
       }

    }

  }


export const handleDelete = async (el)=>{
    const {deleteRow, user, handleInfoMsg, setAlertBlind, setDeleteRow, runDispatchClientDataCall} = el;

    const url = getLinkPostTrans().patch;
    let body = {
      act: "UPDATE",
      whereField:"id",
      whereValue:deleteRow.id,
      whereType: "INT",
      table:user.companyId+"_products",
      fields:["deleted"],
      values :["1"],
      types:["INT"]
    };
    /*await patchRequest(url, body).then((res)=> {
      if(res?.ok){
        runDispatchClientDataCall()
        handleInfoMsg('success', "Product "+deleteRow.productCode+ ' deleted successfull');
        postActivity(user, activities.DELETE, `${deleteRow.productCode}:${deleteRow.productName} deleted from products table by user`);
        setAlertBlind({show:false});
        setDeleteRow({});
      }else{
        handleInfoMsg('error', res?.error || "Error in deleting account. Try again");
      }
    })*/

    //const deletedAcct = `${deleteRow.productCode}:${deleteRow.productName}`;
    const updateRes = await handleDeleteAffectedTransactions({user, t:'s', c:deleteRow.productCode});
    if(updateRes?.ok){
      await patchRequest(url, body).then((res)=>{
        if(res?.ok){
          runDispatchClientDataCall();
          
          handleInfoMsg('success', "Product "+deleteRow.productCode+ ' deleted successfull');
          postActivity(user, activities.DELETE, `${deleteRow.productCode}:${deleteRow.productName} deleted from products table by user`);
          setAlertBlind({show:false});
          setDeleteRow({});
        }else{
          handleInfoMsg('error', res?.error || "Error in deleting account. Try again");
        }
      });
    }else{
      handleInfoMsg('error', updateRes?.error || "Error in deleting account. Try again");
  }
}


export const handleDeleteProduct =(el)=>{
   const {deleteRow, deleteType, setAlertBlind} = el;

  if(deleteRow?.productName && deleteType === "CONTINUE"){
      handleDelete(el)
  }
  if(deleteType === "CANCEL"){
    setAlertBlind({show:false, title:'', msg:''})
  }
}


  export {handleClickRow}