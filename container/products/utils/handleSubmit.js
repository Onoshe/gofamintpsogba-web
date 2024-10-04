//const { BiEditAlt, BiTrash } = require("react-icons/bi");
import { postRequest } from '@/lib/apiRequest/postRequest';
import { validateInputs } from '@/lib/validation/validateInput';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { productInsertQuery, productUpdateQuery } from './productQuery';
import { validateAndFormatProducts } from '@/lib/validation/validateProductsUpload';
import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import { getLinkProduct } from '@/lib/apiRequest/urlLinks';



//For creating or editing a particular product
const handleSubmit = async ({ formInput, setInfoMsg, user,products, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput})=>{


   if(formInput?.productName && formInput?.productCode && (formInput?.category || formInput?.newCategory)){
    //const res = validateInputs({form:products, type:'VALUEEXIST', test:{key:'productCode', value:formInput.productCode}});
    
    const {productCode, productName, description, category} = formInput;
    const isEdit = formInput.editProduct;
    const res =validateAndFormatProducts([{productCode, productName, description, category:category? category : formInput?.newCategory}], products, isEdit);
    if(res.error){
      const errorMsg = getErrorMessage(res?.errorType, res?.key, res?.rowIndex);
     return  handleInfoMsg('error', errorMsg);
    }

    if(formInput.editProduct){
            const urlLink = getLinkProduct({user, productCode});
            const product = await getRequest(urlLink).then((res)=> res);
            const {url, body} = productUpdateQuery(formInput, user);
            if(product?.data?.length){ //AccountCode found
                if(product.data[0].id == formInput.id){
                    await patchRequest(url, body).then((res)=> {
                      if(res?.ok){
                        setFormInput({}); 
                        runDispatchClientDataCall()
                        handleInfoMsg('success',  "Product updated successfully");
                        setShowBlind(false)
                      }else{
                        handleInfoMsg('error', res?.error || "Error in updating user record");
                    }})
                }else{ //Error. Found accountCode id different from editing id
                  handleInfoMsg('error', "Error in updating product");
                }

            }else{ //AccountCode not found meaning accountCode was changed. Run update  
              await patchRequest(url, body).then((res)=> {
                if(res?.ok){
                  setFormInput({});
                  runDispatchClientDataCall()
                  handleInfoMsg('success', "Product updated successfully");
                  setShowBlind(false)
                }else{
                  handleInfoMsg('error', res?.error || "Error in posting data");
                }
              })
            }

    }else{
        const urlLink = getLinkProduct({user, productCode});
        const product = await getRequest(urlLink).then((res)=> res);
        //return console.log(product);
        if(product?.data?.length){
            handleInfoMsg('error', "Product with code'"+productCode+"' already exist");
         }else{
            const {url, body} = productInsertQuery(formInput, user);
            await postRequest(url, body).then((res)=> {
              if(res?.ok){
                setFormInput({}); 
                runDispatchClientDataCall()
                handleInfoMsg('success', "New chart of account created successfully");
                setShowBlind(false)
              }else{
                handleInfoMsg('error', res?.error || "Error in posting data");
              }
            })
          }  
       }
    
   }else{
     setInfoMsg({msg:"Enter the require fields!", error:true});
   }
   setFormInput({...formInput, editAcct:''})
}



  export {handleSubmit}