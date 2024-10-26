import { patchRequest } from "@/lib/apiRequest/patchRequest";
import {prepareQueryTwoEntryTrans, prepareQueryTwoEntryTransDetails } from "./prepareQueryTwoEntry";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
import { activities, postActivity } from "@/lib/apiRequest/postActivity";



export async function handleSubmitTwoEntry({transSheetForm, chartOfAccounts, user, vendors, customers,  setTransSheet, 
    runDispatchClientDataCall, recordTransaction, dispatchTranSheetTwoEntryReset, router, notify, resetUploadTableCall, setResetUploadTableCall}) {
   const {url, body} =  prepareQueryTwoEntryTrans({transSheetForm, user, chartOfAccounts, postingFrom:"TWOENTRY"});
   //return console.log(body, transSheetForm, recordTransaction) 

   if(recordTransaction?.editTran){
    const transListingPage = recordTransaction.transListingPage;
    const url = getLinkPostTrans().patch;
    const transId = recordTransaction.editDetails.id;
    const updateParams  ={
      act: "UPDATE",
      whereField:"id",
      whereValue:transId,
      whereType: "INT"};
      const updatedBody = {...body, values:body.values[0], ...updateParams};
      //return console.log(transSheetForm)
      const transRes = await patchRequest(url, updatedBody)
      if(transRes?.data?.length){ 
        const insertedTrans = [{id:transId}];
        const {body} = prepareQueryTwoEntryTransDetails({transSheetForm, chartOfAccounts, user, vendors, customers, insertedTrans});
        runUpdate({url, body, transSheetForm, notify, setTransSheet, runDispatchClientDataCall, 
          dispatchTranSheetTwoEntryReset, router, transListingPage});
      }
    }else{ //POST TRANS
      //return console.log(transSheetForm)
      const transRes = await postRequest(url, body);
      if(transRes?.data?.length){
        const insertedTrans = transRes.data;
        const {url, body} = prepareQueryTwoEntryTransDetails({transSheetForm, chartOfAccounts, user, vendors, customers, insertedTrans});
          await postRequest(url, body)
          .then((res)=> {
              if(res?.ok){
                    //console.log(res)
                    const transRefs = transSheetForm.map(dt => dt.reference).join(', ');
                    const postingNote = transSheetForm?.length >1? `Transaction with references ${transRefs}` :`Transaction with reference ${transRefs}`;
                    postActivity(user, activities.RECORD, postingNote);
                    setTransSheet([{date:'', description:'', debitAccount:'', creditAccount:'', debitSub:'', creditSub:'', reference:'', amount:''}]); 
                    runDispatchClientDataCall();
                    setResetUploadTableCall(resetUploadTableCall +1);
                    notify('success', "User record updated successfully");
              }else{
                notify('error', res?.error || "Error in updating user record");
              }
            }) 
      }
   }
}




async function runUpdate({url, body, transSheetForm, notify, setTransSheet, runDispatchClientDataCall, 
  dispatchTranSheetTwoEntryReset, router, transListingPage}){
    /**************************************** 
      PrepareQueryTwoEntryTransDetails function arranges return body in such a way that debit 
      transaction comes first before credit transaction. Hence, debit transDetailsId to be updated 
      comes first before credit id. 
    ******************************************/
    //return console.log(body)
    const values = body.values;
    let tranDetailsId = [transSheetForm[0].idDr, transSheetForm[0].idCr]; 
    console.log(values, transSheetForm);
    for (let i = 0; i < values.length; i++) {
        const lastItem = (values.length-1) == i;
        const value = values[i];
        const updateParams  ={
          act: "UPDATE",
          whereField:"id",
          whereValue:tranDetailsId[i],
          whereType: "INT",
          values:value
        };
          const updatedBody = {...body, ...updateParams};  
          await patchRequest(url, updatedBody)
          .then((res)=> {
              //console.log(res)
              if(!res?.ok){
               return notify('error', res?.error || "Error in updating user record");
              }else{
                if(lastItem){
                  const tranRef = transSheetForm[0]?.reference;
                  const postingNote = `Transaction with reference ${tranRef}`;
                  postActivity(user, activities.UPDATE, postingNote);
                  
                  dispatchTranSheetTwoEntryReset();
                  runDispatchClientDataCall();
                  notify('success', "User record updated successfully");

                }
              }
            })
          .then(()=> { setTimeout(()=>router.push(transListingPage), 500)}) 
      }
}