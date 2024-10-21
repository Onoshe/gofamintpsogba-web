import { handleDeleteAffectedTransactions } from '@/container/chartOfAccount/utils/handleDeleteRelatedTrans';
import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import {  getLinkPostTrans } from '@/lib/apiRequest/urlLinks';


/************ DELETE PERSONAL ACCOUNT (CUSTOMERS, VENDORS, PRODUCTS & CHART-OF-ACCOUNT) *************************
 * On delete of account, the accountCode will be deleted(disabled) and ALL the previous transactions  
 * relating to the accountCode will also be DELETED.
 * If not deleted, there will be error in the Trial-balance as transactions will be picked without Account head.
 * 
 * 
 */

export const handleDeleteAccountOrTran = async ({user, whereVal, tableName, showConfirm, notify, deletedAcct, showConfirmObj, setShowConfirm, runDispatchClientDataCall})=>{

    const url = getLinkPostTrans().patch;
    let body = {
      act: "UPDATE",
      whereField:"id",
      whereValue:whereVal,
      whereType: "INT",
      table:user.companyId+"_"+tableName,
      fields:["deleted"],
      values :["1"],
      types:["INT"]
    };
    
    //return console.log(showConfirm, tableName);
    const deleteRow = showConfirm.cell.row;
    const updateRes = await handleDeleteAffectedTransactions({user, t:'s', c:deleteRow.accountCode});
    if(updateRes?.ok){  
      await patchRequest(url, body)
      .then((res)=> {
        if(res?.ok){ 
          runDispatchClientDataCall();
          if(notify){notify('success', "Transaction deleted successfully");}
        }else{
          if(notify){notify('error', res?.error || "Error in deleting transaction. Try again");}
        }
      })
      .then(()=>{
        if(setShowConfirm){
          if(showConfirmObj){setShowConfirm({show:false})
          }else{setShowConfirm(false);}
        }
      })
      .then(()=>{
        postActivity(user, activities.DELETE, `Personal account of ${deleteRow.accountCode}:${deleteRow.firstname} ${deleteRow.lastname} deleted from ${tableName} table by user`);
      });
    }
}


/*
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

*/