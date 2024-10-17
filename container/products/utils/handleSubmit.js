//const { BiEditAlt, BiTrash } = require("react-icons/bi");
import { postRequest } from '@/lib/apiRequest/postRequest';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { productInsertQuery, productUpdateQuery } from './productQuery';
import { validateAndFormatProducts } from '@/lib/validation/validateProductsUpload';
import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import { getLinkFetchTableWithConds, getLinkProduct } from '@/lib/apiRequest/urlLinks';



//For creating or editing a particular product
const handleSubmit = async ({ formInput, setInfoMsg, user, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput})=>{


   if(formInput?.productName && formInput?.productCode && (formInput?.category || formInput?.newCategory)){
    //const res = validateInputs({form:products, type:'VALUEEXIST', test:{key:'productCode', value:formInput.productCode}});
    
    const {productCode, productName, description, category} = formInput;
    const isEdit = formInput.editProduct;
    const fetchTableUrl = getLinkFetchTableWithConds({table:user.companyId+'_products', conds:'deleted', values:'0'});
    const productsObj = await getRequest(fetchTableUrl);
    const products = productsObj.data;
    const res =validateAndFormatProducts([{productCode, productName, description, category:category? category : formInput?.newCategory}], products, isEdit);
    if(res.error){
      const errorMsg = getErrorMessage(res?.errorType, res?.key, res?.rowIndex);
     return  handleInfoMsg('error', errorMsg);
    }

    if(formInput.editProduct){
            const {url, body} = productUpdateQuery(formInput, user);
            const product = products.find((dt)=> dt.productCode == productCode);
            if(product?.id){ //AccountCode found
                if(product.id == formInput.id){
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
                  handleInfoMsg('error', "Product code "+productCode+" already exist");
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

    }else{ //Create Account Chart
        const product = products.find((dt)=> dt.productCode == productCode);
        if(product?.id){
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
   //setFormInput({...formInput, editAcct:''})
}



  export {handleSubmit}