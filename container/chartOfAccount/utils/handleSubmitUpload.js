import { postRequest } from '@/lib/apiRequest/postRequest';
import { coaCreateQuery } from './coaQuery';



const handleSubmitUpload = async ({formInput, user, coaStructure, runDispatchClientDataCall,handleInfoMsg, setShowBlind, dispatchCreate})=>{
  
    for (let i = 0; i < formInput.length; i++) {
      const formData = formInput[i];
      const lastItem = formInput.length == i +1;

      const {accountCode, accountName,  description, typeCode} = formData;
          const acctStructure = coaStructure?.find((dt)=> parseInt(dt.code) == parseInt(typeCode));
          let form = { 
            typeCode, 
            typeName:acctStructure.name, 
            accountCode, 
            accountName, 
            accountType:acctStructure.title, 
            description, 
            addToDashboard:'',
            //createdBy,
            //updatedBy 
          };
          
            const {url, body} = coaCreateQuery(form, user, "chartofaccount");
            await postRequest(url, body).then((res)=> {
              if(res?.ok){
                if(lastItem){
                  runDispatchClientDataCall()
                  handleInfoMsg('success', "New chart of account created successfully");
                  setShowBlind(false);
                  dispatchCreate({type:'resetTableData', payload:''})
                }
              }else{
                handleInfoMsg('error', res?.error || "Error in posting data");
              }
            })
       }
}



  export {handleSubmitUpload}