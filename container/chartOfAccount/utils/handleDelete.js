import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { getLinkPostTrans } from '@/lib/apiRequest/urlLinks';




export const handleDelete = async ({ formInput,  user, setShowConfirm, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput})=>{
    const url = getLinkPostTrans().patch;
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
    await patchRequest(url, body).then((res)=> {
      if(res?.ok){
        setFormInput({}); 
        runDispatchClientDataCall()
        handleInfoMsg('success', formInput.accountName+" deleted successfully");
        setShowBlind(false);
        setShowConfirm(false)
      }else{
        handleInfoMsg('error', res?.error || "Error in deleting account. Try again");
      }
    })
}