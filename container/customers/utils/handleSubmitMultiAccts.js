import { preparePAQuery } from '@/container/customers/utils/preparePAQuery';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import { postRequest } from '@/lib/apiRequest/postRequest';
import { capitalizeFirstCharOnly } from '@/lib/capitalize/capitalizeString';



export const handleSubmitMultiAccts = async ({forms,  handleInfoMsg,  personalAcct,
  runDispatchClientDataCall, setFormInput, user, setActiveTab})=>{
    if(forms?.length){
      for (let i = 0; i < forms.length; i++) {
        const form =  forms[i];
        const lastItem = forms.length == i +1;
          const {url, body} = preparePAQuery(form, user, personalAcct);
          await postRequest(url, body).then((res)=> {
            if(res?.ok){
              if(lastItem){ 
                setActiveTab('DISPLAY')
                runDispatchClientDataCall();
                handleInfoMsg('success', "New user added successfully");
                postActivity(user, activities.CREATE, `${capitalizeFirstCharOnly(personalAcct)}'s Account:${form.accountCode}- ${form.firstname} ${form.lastname}`);
                setFormInput({});
              }
            }else{
              handleInfoMsg('error', res?.error || "Error in posting data");
            }
          })
      }
    }else{
      handleInfoMsg('error', "Data not available. Please check");
    }
}
