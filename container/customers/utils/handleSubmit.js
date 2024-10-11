import { preparePAQuery } from '@/container/customers/utils/preparePAQuery';
import { updatePAQuery } from '@/container/customers/utils/updatePAQuery';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { postRequest } from '@/lib/apiRequest/postRequest';
import { getLinkPersoanlAcct } from '@/lib/apiRequest/urlLinks';
import { validateInputs } from '@/lib/validation/validateInput';



const handleSubmit = async ({e, formInput, setInfoMsg, handleInfoMsg, personalAccts,  personalAcct,
  runDispatchClientDataCall, setFormInput, user, setActiveTab})=>{

   const validateFieldVal = validateInputs({type:'FIELDVALUE', form:formInput, test:{reqFields:['type', 'accountCode', 'firstname', 'lastname', 'title']}});
   if(!validateFieldVal.error){
    let validateAcctCode = {};
    if(formInput.editAcct){
      validateAcctCode = validateInputs({form:personalAccts, type:'VALUEEXIST', test:{key:'accountCode', value:formInput.accountCode}});
    }else{
      validateAcctCode = validateInputs({form:personalAccts, type:'VALUEEXIST', test:{key:'accountCode', value:"C-"+formInput.accountCode}});
    }
    
 
    if(formInput.editAcct){ //Edit User
      if(validateAcctCode.error) return handleInfoMsg('error', res?.error || "Error in updating user record");

        const accountCodeEdited = formInput.accountCode;
        let accountCodeNew = personalAcct==="vendors"? "V-"+parseInt(accountCodeEdited).toString().padStart(6,0) : "C-"+parseInt(accountCodeEdited).toString().padStart(6,0);
        const urlLink = getLinkPersoanlAcct({user, personalAcct, accountCodeNew});
        const acct = await getRequest(urlLink).then((res)=> res);
        const {url, body} = updatePAQuery(formInput, user, personalAcct);
        //return console.log(acct, body)
        if(acct?.data?.length){ //AccountCode found
            if(acct.data[0].id == formInput.id){
                //Found account id and edited account id are the same meaning accountCode was not changed. Run update
                await patchRequest(url, body).then((res)=> {
                  if(res?.ok){
                    setFormInput({}); 
                    setActiveTab('DISPLAY')
                    runDispatchClientDataCall()
                    handleInfoMsg('success', "User record updated successfully");
                  }else{
                    handleInfoMsg('error', res?.error || "Error in updating user record");
                }})
            }else{ //Error. Found accountCode id varies from account being edited      
                handleInfoMsg('error', "Account Code already exist.");
              }
          }else{//AccountCode not found meaning accountCode was changed. Run update
            await patchRequest(url, body).then((res)=> {
              if(res?.ok){
                setFormInput({}); 
                setActiveTab('DISPLAY')
                runDispatchClientDataCall()
                handleInfoMsg('success', "User record updated successfully");
              }else{
                handleInfoMsg('error', res?.error || "Error in posting data");
              }
            })
          }
    }else{ //Create User
      if(!validateAcctCode.error){
        const {url, body} = preparePAQuery(formInput, user, personalAcct);
        //return  console.log(body)
        await postRequest(url, body).then((res)=> {
          if(res?.ok){
            setFormInput({}); 
            setActiveTab('DISPLAY')
            runDispatchClientDataCall()
            handleInfoMsg('success', "New user added successfully");
          }else{
            handleInfoMsg('error', res?.error || "Error in posting data");
          }
        })
      }else{
        setInfoMsg({msg:"Account Code already exist!", error:true})
        handleInfoMsg("error", "Account Code already exist!")
      }  
    }
    
   }else{
    setInfoMsg({msg:"Enter the require fields!", error:true});
    handleInfoMsg("error", "Enter the require fields!")
   }
   //setFormInput({...formInput, editAcct:''})
}



  export {handleSubmit}