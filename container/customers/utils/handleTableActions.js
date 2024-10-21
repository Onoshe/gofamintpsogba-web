import { getDeleteAffectedTransactions } from "@/container/chartOfAccount/utils/handleDeleteRelatedTrans";


const handleClickRow = async ({el, user, setFormInput,  setInfoMsg, handleActiveTab,   setShowConfirm, setSelectedOpt})=>{
    const {key, i, row} = el;
    const rowIndex = i; // ---New Category-- is the default row 0;

   // console.log(row)
    //Edit 
    if(key === 'edit'){
      setFormInput({...row, accountCode:row.accountCode.slice(2), editAcct:true});
      handleActiveTab('CREATE', 'EDIT');
      setInfoMsg({msg:''});
    }
    //Delete
    if(key === 'delete'){
      const affectedTrans = await getDeleteAffectedTransactions({user, t:'s', c:row?.accountCode});
      //console.log(affectedTrans, affectedTrans?.transIds.length)
      if(affectedTrans?.transIds.length){
        const title = `${row?.accountCode}- ${row?.firstname} ${row?.lastname} account affected ${affectedTrans.transIds.length} transactions!`
        const msg= `${row?.accountCode} Account and transactions will be deleted. Enter ${row.lastname}'s account code if you really want to continue`;
        setShowConfirm({show:true, cell:el, title, msg, titleRed:true, showInput:true});
       }else{
        const title = `Do you really want to delete account: ${row?.accountCode}- ${row?.firstname} ${row?.lastname}?`
        const msg= "Please note that all transactions associated with this account will also be deleted.";
        setShowConfirm({show:true, showInput:false, cell:el, title, msg});
       }
    }
  }



  export {handleClickRow}