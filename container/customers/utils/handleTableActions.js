

const handleClickRow = ({el, setFormInput,  setInfoMsg, handleActiveTab,   setShowConfirm, setSelectedOpt})=>{
    const {key, i, row} = el;
    const rowIndex = i; // ---New Category-- is the default row 0;

    //Edit 
    if(key === 'edit'){
      setFormInput({...row, accountCode:row.accountCode.slice(2), editAcct:true});
      handleActiveTab('CREATE', 'EDIT');
      setInfoMsg({msg:''});
    }
    //Delete
    if(key === 'delete'){
      setShowConfirm({show:true, cell:el})
    }
  }



  export {handleClickRow}