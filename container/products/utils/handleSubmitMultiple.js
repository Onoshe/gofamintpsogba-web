//const { BiEditAlt, BiTrash } = require("react-icons/bi");
import { postRequest } from '@/lib/apiRequest/postRequest';
import { validateInputs } from '@/lib/validation/validateInput';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { productInsertQuery, productUpdateQuery } from './productQuery';
import { validateAndFormatProducts } from '@/lib/validation/validateProductsUpload';
import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import { getLinkPostMultiple } from '@/lib/apiRequest/urlLinks';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';



//For creating multiple products
export const handleSubmitMultiple = async ({ formData,  user,products, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput, dispatchCreate})=>{

    const isEdit = false;
    const res =validateAndFormatProducts(formData, products, isEdit);
    if(res.error){
      const errorMsg = getErrorMessage(res?.errorType, res?.key, res?.rowIndex);
     return  handleInfoMsg('error', errorMsg);
    }else{
        const urlLink = getLinkPostMultiple({user});
        const products = await getRequest(urlLink).then((res)=> res);
        //console.log(products)
        for (let i = 0; i < formData.length; i++) {
            const el = formData[i];
            const productCodeExist = products?.data?.find((dt)=> {
               return dt.deleted == 0 && (dt.productCode == el.productCode) //Return non-deleted product
            });
            if(productCodeExist?.productCode){
                handleInfoMsg('error', "Product with code'"+productCodeExist.productCode+"' already exist");
             }else{
                const {url, body} = productInsertQuery(el, user);
                await postRequest(url, body).then((res)=> {
                  if(res?.ok){
                    const lastItem = formData.length == i +1;
                    if(lastItem){
                        postActivity(user, activities.CREATE, "Product Account code "+el.productCode);
                        setFormInput({}); 
                        runDispatchClientDataCall()
                        handleInfoMsg('success', "New chart of account created successfully");
                        setShowBlind(false);
                        dispatchCreate({type:'resetUploadData', payload:{}});
                    }
                  }else{
                    handleInfoMsg('error', res?.error || "Error in posting data");
                  }
                })
              }
        }
        
        setFormInput({...formData, editAcct:''})
    }
}
