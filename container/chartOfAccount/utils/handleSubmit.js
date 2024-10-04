//const { BiEditAlt, BiTrash } = require("react-icons/bi");
import { postRequest } from '@/lib/apiRequest/postRequest';
import { sortArrayByKey } from '@/lib/sort/sortArrayByKey';
import { validateInputs } from '@/lib/validation/validateInput';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { coaCreateQuery, coaQuery, coaUpdateQuery } from './coaQuery';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { getLinkCOA } from '@/lib/apiRequest/urlLinks';



const handleSubmit = async ({ formInput, setInfoMsg, user, coaStructure, chartOfAccounts, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput})=>{

  //return console.log(formInput)
   const validateFieldVal = validateInputs({type:'FIELDVALUE', form:formInput, test:{reqFields:['typeCode', 'accountName', 'accountCode']}});
   if(!validateFieldVal.error){
    const validateAcctCode = validateInputs({form:chartOfAccounts, type:'VALUEEXIST', test:{key:'accountCode', value:formInput.accountCode}});
    const accountCodeStr = formInput.accountCode.toString();
    if(accountCodeStr[0] === "0"){
      return setInfoMsg({msg:"Account Code cannot start with zero!", error:true})
    } 
    const {accountCode, accountName, addToDashboard, description, accountType, typeCode, createdBy, updatedBy} = formInput;
        const acctStructure = coaStructure?.find((dt)=> parseInt(dt.code) === parseInt(typeCode));
        let form = { 
          typeCode:acctStructure.code, 
          typeName:acctStructure.name, 
          accountCode, 
          accountName, 
          accountType:acctStructure.title, 
          description, 
          addToDashboard,
          createdBy,
          updatedBy,
          ...formInput,
          //addToDashboard:addToDashboard? 'Yes' :'No', 
          //edit:<BiEditAlt size={22} className='text-blue-700 cursor-pointer hover:text-[blue]'/>,
          //delete:<BiTrash size={22} className='text-red-700 cursor-pointer hover:text-[red]'/>, 
        }

    if(formInput.editAcct){
      const {url, body} = coaUpdateQuery(form, user, "chartofaccount");
            //return console.log(body)
            const urlLink = getLinkCOA({user, accountCode});
            const acct = await getRequest(urlLink).then((res)=> res);
            if(acct?.data?.length){ //AccountCode found
              //return  console.log(acct.data, formInput.id) 
                if(acct.data[0].id == formInput.id){
                    //Found account id and edited account id are the same meanin accountCode was not changed. Run update
                    await patchRequest(url, body).then((res)=> {
                      if(res?.ok){
                        setFormInput({}); 
                        runDispatchClientDataCall()
                        handleInfoMsg('success',  "Account updated successfully");
                        setShowBlind(false)
                      }else{
                        handleInfoMsg('error', res?.error || "Error in updating user record");
                    }})
                }else{ //Error. Found accountCode is different from editing id
                  handleInfoMsg('error', "Error in updating record");
                }

            }else{ //AccountCode not found meaning accountCode was changed. Run update  
              await patchRequest(url, body).then((res)=> {
                if(res?.ok){
                  setFormInput({});
                  runDispatchClientDataCall()
                  handleInfoMsg('success', "Account updated successfully");
                  setShowBlind(false)
                }else{
                  handleInfoMsg('error', res?.error || "Error in posting data");
                }
              })
            }

    }else{
      if(!validateAcctCode.error){
        const urlLink = getLinkCOA({user, accountCode});
        const acct = await getRequest(urlLink).then((res)=> res);
        const nonDeleted = acct?.data?.filter((dt)=> dt.deleted != '1');
        if(nonDeleted?.length){
            handleInfoMsg('error', "Account with account code'"+accountCode+"' already exist");
         }else{
            const {url, body} = coaCreateQuery(form, user, "chartofaccount");
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
        
      }else{
        setInfoMsg({msg:"Account Code already exist!", error:true})
      }  
    }
    
   }else{
     setInfoMsg({msg:"Enter the require fields!", error:true});
   }
   setFormInput({...formInput, editAcct:''})
}



  export {handleSubmit}