import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { prepareQueryMultiTrans, prepareQueryMultiTransDetails } from "./prepareQueryMultiEntry";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { getLinkDeleteTran, getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
import { activities, postActivity } from "@/lib/apiRequest/postActivity";


export async function handleSubmitMultiEntry({transSheetForm, chartOfAccounts, user, vendors, customers,  setTransSheet, 
    runDispatchClientDataCall, recordTransaction, notify, dispatchTranSheetMultiEntryReset, router}) {
   const {url, body} =  prepareQueryMultiTrans({transSheetForm, user, chartOfAccounts, postingFrom:"MULTIENTRY"});
   
   if(recordTransaction?.editTran){
    const transListingPage = recordTransaction.transListingPage;
    const url = getLinkPostTrans(user.companyId).patch;
    const transId = recordTransaction.editDetails.id;
    const updateParams  ={
      act: "UPDATE",
      whereField:"id",
      whereValue:transId,
      whereType: "INT"};
      const updatedBody = {...body, values:body.values[0], ...updateParams};
      
      //Update transactions table row
      const transRes = await patchRequest(url, updatedBody);
      //console.log(transRes)
      if(transRes?.data?.length){ 

        //Delete affected rows from transactionsdetails using transactionID reference
        const deleteBody  ={
          table:user.companyId+"_transactionsdetails",
          act: "DELETE",
          whereField:"transactionID",
          whereValue:transId,
          whereType: "INT"
        };
        const urlDelete =  getLinkDeleteTran(user.companyId);
        const deleteRes = await patchRequest(urlDelete, deleteBody);

        if(deleteRes.ok){
          //Insert updated data in transactiondetails table
          const insertedTrans = [{id:transId}];
          prepareAndPostTransDetails({transSheetForm, chartOfAccounts, user, vendors, customers, insertedTrans,
            setTransSheet, runDispatchClientDataCall, notify, transListingPage, dispatchTranSheetMultiEntryReset, router});
        }
       }
    }else{
      const transRes = await postRequest(url, body);
      //console.log(transRes)
      if(transRes?.data?.length){
        const insertedTrans = transRes.data;
        prepareAndPostTransDetails({transSheetForm, chartOfAccounts, user, vendors, customers, insertedTrans,
          setTransSheet, runDispatchClientDataCall, notify, dispatchTranSheetMultiEntryReset, transListingPage:''});
      }
    } 
}


const prepareAndPostTransDetails = async ({transSheetForm, chartOfAccounts, user, vendors, customers, insertedTrans,
    setTransSheet, runDispatchClientDataCall, notify, transListingPage, dispatchTranSheetMultiEntryReset, router}) =>{
        const {url, body} = prepareQueryMultiTransDetails({transSheetForm, chartOfAccounts, user, vendors, customers, insertedTrans});
        await postRequest(url, body)
        .then((res)=> {
            //console.log(res)
            if(res?.ok){
                //setTransSheet([{debitCredit:1, date:"", reference:''}, {debitCredit:2}]); 
                const transRefs = transSheetForm.map(dt => dt.reference).join(', ');
                const postingNote = transSheetForm?.length >1? `Transaction with references ${transRefs}` :`Transaction with reference ${transRefs}`;
                postActivity(user, activities.RECORD, postingNote);

                dispatchTranSheetMultiEntryReset();
                runDispatchClientDataCall();
                notify('success', "User record updated successfully");
            }else{
              notify('error', res?.error || "Error in updating user record");
            }
        })
        .then(()=> { 
          if(transListingPage){
            dispatchTranSheetMultiEntryReset();
            setTimeout(()=>router.push(transListingPage), 1000)
          }
        }) 
};