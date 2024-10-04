//const { BiEditAlt, BiTrash } = require("react-icons/bi");
import { sortArrayByKey } from '@/lib/sort/sortArrayByKey';
import { validateInputs } from '@/lib/validation/validateInput';
import { BiEditAlt, BiTrash } from 'react-icons/bi';



const handleSubmit =({e, formInput, setInfoMsg, dispatchProducts, handleShowBlind, products, setFormInput})=>{
    e.preventDefault();
    if(formInput?.productName && formInput?.productCode && (formInput?.category || formInput?.newCategory)){
      const res = validateInputs({form:products, type:'VALUEEXIST', test:{key:'productCode', value:formInput.productCode}});
      
      const {productCode, productName, description, category} = formInput;
        const selProduct = products?.find((dt)=> parseInt(dt.id) === parseInt(formInput.id));
        let allProducts = [...products];
        let editedRow = { 
          productName, 
          productCode, 
          description, 
          category, 
          edit:<BiEditAlt size={22} className='text-blue-700 cursor-pointer hover:text-[blue]'/>,
          delete:<BiTrash size={22} className='text-red-700 cursor-pointer hover:text-[red]'/>, 
        }

    if(formInput.editProduct){
      editedRow = { ...editedRow, id:formInput.id}
      allProducts = allProducts.map((row)=> {
       return row.id === editedRow.id? editedRow : row;
      })
      sortArrayByKey(allProducts, 'productName');
      dispatchProducts(allProducts);
      handleShowBlind(false)
    }else{
      if(!res.error){
        editedRow = {
          ...editedRow,
          id:products?.length+1, 
          };
        allProducts.push(editedRow);
        sortArrayByKey(allProducts, 'productName');
        dispatchProducts(allProducts);
        handleShowBlind(false)
      }else{
        setInfoMsg({msg:"Product Code already exist!", error:true})
      }  
    }
    setFormInput({...formInput, editProduct:''})
    }else{
      setInfoMsg({msg:"Enter the require fields!", error:true});
    } 
  }



  export {handleSubmit}