import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";



const handleClickRow = ({el, setFormInput, setShowBlind, setInfoMsg, dispatchProducts, deleteType, setDeleteRow,
     deleteRow, setAlertBlind, setSelectedProduct, handleInfoMsg, runDispatchClientDataCall,})=>{
    const {key, i, row} = el;
    const rowIndex = i +1; // ---New Category-- is the default row 0;

    //Edit 
    if(key === 'edit'){
      const {id, productName, productCode, description, category} = row;
      setFormInput({id, productName, productCode, description, newCategory:"", category, editProduct:true});
      setSelectedProduct(category);
      setShowBlind(true);
      setInfoMsg({msg:''});
    }
    //Delete Confirmation
    if(key === 'delete'){
      setDeleteRow(row);
      setAlertBlind({show:true, title:'Delete Product '+row.productCode, msg:'Do you really want to delete '+row.productName+' with code '+row.productCode+'?'})
    }
  }


  export const handleDelete = async (el)=>{
    const {deleteRow, user, handleInfoMsg, setAlertBlind, setDeleteRow, runDispatchClientDataCall} = el;

    const url = getLinkPostTrans().patch;
    let body = {
      act: "UPDATE",
      whereField:"id",
      whereValue:deleteRow.id,
      whereType: "INT",
      table:user.companyId+"_products",
      fields:["deleted"],
      values :["1"],
      types:["INT"]
    };
    await patchRequest(url, body).then((res)=> {
      if(res?.ok){
        runDispatchClientDataCall()
        handleInfoMsg('success', "Product "+deleteRow.productCode+ ' deleted successfull');
        setAlertBlind({show:false});
        setDeleteRow({});
      }else{
        handleInfoMsg('error', res?.error || "Error in deleting account. Try again");
      }
    })
}

export const handleDeleteProduct =(el)=>{
   const {deleteRow, deleteType, setAlertBlind} = el;

  if(deleteRow?.productName && deleteType === "CONTINUE"){
      handleDelete(el)
  }
  if(deleteType === "CANCEL"){
    setAlertBlind({show:false, title:'', msg:''})
  }
}


  export {handleClickRow}