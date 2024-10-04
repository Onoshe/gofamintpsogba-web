

const handleClickRow = ({el, setFormInput, setShowBlind, setShowConfirm, setInfoMsg, chartOfAccounts, dispatchChartOfAccounts, setSelectedOpt, coaStructure})=>{
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
      setFormInput({...row, accountType:acctStructure.name, deleteAcct:true});
      setShowConfirm(true);
      //const newCOA = chartOfAccounts.filter((acct, i)=> acct.accountCode !== row.accountCode);
      //dispatchChartOfAccounts(newCOA);
    }
  }

  


  export {handleClickRow}