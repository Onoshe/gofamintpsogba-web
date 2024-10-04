import ConfirmAlert from '@/components/confirmAlert/ConfirmAlert';
import React from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { getLinkPostTrans } from '@/lib/apiRequest/urlLinks';


const EditDeleteTransaction = ({reportName, viewTransId,  selectedTranFromList, handleClickCell,  recordTransaction,  user, notify, runDispatchClientDataCall, router}) => {
    const [showConfirm, setShowConfirm] = React.useState(false);
  

    const handleDeleteTran =()=>{
        setShowConfirm(true)
      }
    const handleConfirm = (act)=>{
      if(act === "CANCEL"){setShowConfirm(false); }
      if(act === "CONTINUE"){
        handleDeleteTransaction({selectedTranFromList, user, runDispatchClientDataCall, notify, router, setShowConfirm})
        //handleDeleteTransaction({ recordTransaction,  user, setShowConfirm, notify, runDispatchClientDataCall, router})
      }
    }

    const handleTransaction =(act)=>{
        //return console.log(selectedTranFromList);
        //const transEntries = transactionsDetails.filter((dt)=> dt.transId == viewTransId);
        //const transEntry = transactionsDetails?.find((dt)=> dt.transId == viewTransId);
        //return console.log(selectedTranFromList, act)
        if(act === "EDIT" && selectedTranFromList?.row){
            //console.log(selectedTranFromList)
            handleClickCell({...selectedTranFromList, key:'edit'});
        }else if(act === "DELETE" && selectedTranFromList?.row){
            handleDeleteTran();
        }
    }

  return (
    <>
        <div className={`my-8 px-4 flex-row items-center gap-5 py-8 ${reportName === "transaction-view" && viewTransId && selectedTranFromList?.row? 'flex' :'hidden'}`}>
            <div className='text-blue-700 bg-gray-200 py-2 px-3 hover:shadow-md rounded-md cursor-pointer hover:text-[blue] flex flex-row items-center'
                onClick={()=>handleTransaction('EDIT')}><BiEditAlt size={22}/> Edit</div>
            <div className='text-red-700 bg-gray-200 py-2 px-3 hover:shadow-md rounded-md cursor-pointer hover:text-red-600 flex flex-row items-center'
                onClick={()=>handleTransaction('DELETE')}><MdDelete size={22}/> Delete</div>
        </div>
        <br/>
        <br/>
         <ConfirmAlert 
            showBlind={showConfirm}
            title={"Do you really want to delete Transaction no "+viewTransId+"?"}
            msg="Please note that all entries associated with this transaction will also be deleted."
            handleCancel={()=>handleConfirm("CANCEL")}
            handleContinue={()=>handleConfirm("CONTINUE")}
       />
    </>
  )
}

export default EditDeleteTransaction;






const handleDeleteTransaction = async ({ selectedTranFromList,  user, notify, runDispatchClientDataCall, router, setShowConfirm})=>{
    const url = getLinkPostTrans().patch;
    const route = `/${user.companyId}/reports`;
    let body = {
      act: "UPDATE",
      whereField:"id",
      whereValue:selectedTranFromList.row.id,
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
        setTimeout(()=>router.push(route), 500)
      }else{
        notify('error', res?.error || "Error in deleting transaction. Try again");
        setTimeout(()=>router.push(route), 500)
      }
    })
    .then(()=>{
      setShowConfirm(false);
    })
}