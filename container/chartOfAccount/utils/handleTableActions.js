import { getDeleteAffectedTransactions } from "./handleDeleteRelatedTrans";


const handleClickRow = async ({el, user, setFormInput, setShowBlind, setShowConfirm, setInfoMsg, chartOfAccounts, dispatchChartOfAccounts, setSelectedOpt, coaStructure})=>{
    const {key, i, row} = el;
    const rowIndex = i; // ---New Category-- is the default row 0;


    const {typeCode} = row;
    const acctStructure = coaStructure?.find((dt)=> parseInt(dt.code) === parseInt(typeCode));
    //Edit 
    if(key === 'edit'){
      setSelectedOpt(typeCode);
      setFormInput({...row, accountType:acctStructure.name, editAcct:true});
      setShowBlind(true);
      setInfoMsg({msg:''});
    }
    //Delete
    if(key === 'delete'){

      const affectedTrans = await getDeleteAffectedTransactions({user, t:'m', c:row?.accountCode});
      
      if(affectedTrans?.transIds?.length){
        const acctCode = row?.accountCode || row?.productCode;
        const acctName = row?.accountName || row?.productName;
        const title = `${acctCode}- ${acctName} account affected ${affectedTrans.transIds.length} transactions!`
        const msg= `${acctCode} Account and all associated transactions will be deleted. Enter ${acctName}'s account code if you really want to continue`;
        setShowConfirm({show:true, cell:el, title, msg, titleRed:true, showInput:true});
        setFormInput({...row, accountType:acctStructure.name, deleteAcct:true});
       }else{
        const title = `Do you really want to delete account: ${row?.productCode || row?.accountCode}- ${row?.productName || row?.accountName}?`
        const msg= "Please note that all transactions associated with this account will also be deleted.";
        setShowConfirm({show:true, showInput:false, cell:el, title, msg});
        setFormInput({...row, accountType:acctStructure.name, deleteAcct:true});
       }


      //setFormInput({...row, accountType:acctStructure.name, deleteAcct:true});
      //setShowConfirm({show:true, cell:el, title, msg, titleRed:true, showInput:true});
      //const newCOA = chartOfAccounts.filter((acct, i)=> acct.accountCode !== row.accountCode);
      //dispatchChartOfAccounts(newCOA);
    }
  }

  


  export {handleClickRow}