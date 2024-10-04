import { preparePAQuery } from '@/container/customers/utils/preparePAQuery';
import { postRequest } from '@/lib/apiRequest/postRequest';



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
                setFormInput({}); 
                setActiveTab('DISPLAY')
                runDispatchClientDataCall()
                handleInfoMsg('success', "New user added successfully");
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
