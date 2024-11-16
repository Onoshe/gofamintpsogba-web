import { getRequest } from '@/lib/apiRequest/getRequest';
import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { getLinkFetchTableWithConds, getLinkPostTrans } from '@/lib/apiRequest/urlLinks';
import { handleDeleteAffectedTransactions } from './handleDeleteRelatedTrans';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';



export const handleDelete = async ({ formInput,  user, setShowConfirm, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput})=>{
    const url = getLinkPostTrans(user.companyId).patch;
    let body = {
      act: "UPDATE",
      whereField:"id",
      whereValue:formInput.id,
      whereType: "INT",
      table:user.companyId+"_chartofaccount",
      fields:["deleted"],
      values :["1"],
      types:["INT"]
    };  
    //return console.log(formInput)
    const deletedAcct = `${formInput.accountCode}:${formInput.accountName}`;
    const updateRes = await handleDeleteAffectedTransactions({user, t:'m', c:formInput.accountCode});
    if(updateRes?.ok){
      await patchRequest(url, body).then((res)=>{
        postActivity(user, activities.DELETE, `${deletedAcct} deleted from chart of account table by user`);
        setFormInput({}); 
        runDispatchClientDataCall()
        handleInfoMsg('success', formInput.accountName+" deleted successfully");
        setShowBlind(false);
        setShowConfirm({show:false, cell:'', title:'', msg:'', titleRed:false, showInput:false})
      })
    }else{
      handleInfoMsg('error', updateRes?.error || "Error in deleting account. Try again");
    }
}