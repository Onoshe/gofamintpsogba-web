import { preparePAQuery } from '@/container/customers/utils/preparePAQuery';
import { updatePAQuery } from '@/container/customers/utils/updatePAQuery';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import { postRequest } from '@/lib/apiRequest/postRequest';
import { getLinkFetchTableWithConds, getLinkPersoanlAcct } from '@/lib/apiRequest/urlLinks';
import { capitalizeFirstChar } from '@/lib/capitalize/capitalizeString';
import { validateInputs } from '@/lib/validation/validateInput';



const handleSubmit = async ({e, formInput, setInfoMsg, handleInfoMsg, personalAccts,  personalAcct,
  runDispatchClientDataCall, setFormInput, user, setActiveTab, handleClear})=>{

    const personalAcctsUrl = getLinkFetchTableWithConds({table:user.companyId+'_'+personalAcct.toLowerCase(), conds:'deleted', values:'0'});
    let personalAcctsFecthed = await getRequest(personalAcctsUrl);

    //Auto assign accountCode if assignAcctCode is true. This is for Create-By-Entry NOT Create-By_Upload
    let existingAcctCodeLen = 6;
    if(formInput?.assignAcctNo){
      const {nextAcctCode, acctCodeLen} = autoAssignAccountCode(personalAcctsFecthed?.data);
      //console.log(formInput, acctCode)
      formInput.accountCode = nextAcctCode;
      existingAcctCodeLen = acctCodeLen;
    }
    
   const validateFieldVal = validateInputs({type:'FIELDVALUE', form:formInput, test:{reqFields:['type', 'accountCode', 'firstname', 'lastname', 'title']}});
   if(!validateFieldVal.error){
    const acctCodePref = personalAcct==="vendors"? "V-" : "C-";
    const inputAcctCodeFmt = acctCodePref+parseInt(formInput.accountCode).toString().padStart(6,0);
    let validateAcctCode = validateInputs({form:personalAcctsFecthed.data, type:'VALUEEXIST', test:{key:'accountCode', value:inputAcctCodeFmt}});
    
    //return console.log(validateAcctCode, personalAcctsFecthed.data, inputAcctCodeFmt)
    if(formInput.editAcct){ //Edit User
      if(validateAcctCode.error){
        if(validateAcctCode.data.id != formInput.id) return handleInfoMsg('error', "Account code already exist");
      }
      // NO ERROR || FOUND ACCOUNT-ID IS EDITED ACCOUNT-ID: RUN UPDATE
      //const urlLink = getLinkPersoanlAcct({user, personalAcct, accountCodeNew:inputAcctCodeFmt});
      const {url, body} = updatePAQuery(formInput, user, personalAcct, existingAcctCodeLen);
      await patchRequest(url, body).then((res)=> {
        if(res?.ok){
          setActiveTab('DISPLAY')
          handleInfoMsg('success', "User record updated successfully");
          postActivity(user, activities.UPDATE, `${capitalizeFirstChar(personalAcct)}'s Account:${formInput.accountCode}- ${formInput.firstname} ${formInput.lastname}`);
          setFormInput({}); 
          handleClear(); //To update displayPersonal Account displayed on table

        }else{
          handleInfoMsg('error', res?.error || "Error in updating user record");
      }})
    }else{ //Create User
      if(!validateAcctCode.error){
        const {url, body} = preparePAQuery(formInput, user, personalAcct, existingAcctCodeLen);
        //return  console.log(body, formInput, personalAcct)
        await postRequest(url, body).then((res)=> {
          if(res?.ok){
            setActiveTab('DISPLAY')
            handleInfoMsg('success', "New personal account created successfully");
            postActivity(user, activities.CREATE, `New ${capitalizeFirstChar(personalAcct)}'s Account:${formInput.accountCode}- ${formInput.firstname} ${formInput.lastname}`);
            setFormInput({}); 
            handleClear(); 
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
    handleInfoMsg("error", validateFieldVal?.field? capitalizeFirstChar(validateFieldVal.field)+" is required!" : "Enter the require fields!")
   }

   //Run update incase some deleted or created account have not populated on the display table
   runDispatchClientDataCall();
}



  export {handleSubmit};


  function autoAssignAccountCode(fetchedPAcct){
     //Get the last highest accountCode
     let highest = 0;
     let acctPref = "";
     let acctCodeLen = 0;
     if(fetchedPAcct?.length){
        fetchedPAcct?.forEach(el => {
          const acctSplit = el.accountCode.split('-');
          acctPref = acctSplit[0];
          acctCodeLen = acctSplit[1].length;
          const no = parseInt(acctSplit[1]);
          highest = highest > no? highest : no; 
      });
     }
     let nextAcctNo = highest +1;
     //let accountCode = nextAcctNo.toString().padStart(acctCodelen, '0');
     //accountCode = `${acctPref}-${accountCode}`;
     return {nextAcctCode: nextAcctNo.toString(), acctCodeLen}; //It will be padded to 
  }