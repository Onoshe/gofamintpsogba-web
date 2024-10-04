import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { getLinkPostTrans } from '@/lib/apiRequest/urlLinks';




export const handleDeleteTransaction = async ({ recordTransaction,  user, setShowConfirm, notify, runDispatchClientDataCall, router})=>{
    const url = getLinkPostTrans().patch;
    const transListingPage = recordTransaction.transListingPage;
    let body = {
      act: "UPDATE",
      whereField:"id",
      whereValue:recordTransaction.editDetails.id,
      whereType: "INT",
      table:user.companyId+"_transactions",
      fields:["deleted"],
      values :["1"],
      types:["INT"]
    };
    await patchRequest(url, body)
    .then((res)=> {
      if(res?.ok){ 
        runDispatchClientDataCall()
        notify('success', "Transaction deleted successfully");
        setShowConfirm(false);
        setTimeout(()=>router.push(transListingPage), 500)
      }else{
        notify('error', res?.error || "Error in deleting transaction. Try again");
        setTimeout(()=>router.push(transListingPage), 500)
      }
    })
}