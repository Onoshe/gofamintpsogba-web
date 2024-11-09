//const { BiEditAlt, BiTrash } = require("react-icons/bi");
import { postRequest } from '@/lib/apiRequest/postRequest';
import { sortArrayByKey } from '@/lib/sort/sortArrayByKey';
import { validateInputs } from '@/lib/validation/validateInput';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { coaCreateQuery, coaQuery, coaUpdateQuery } from './coaQuery';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { getLinkCOA, getLinkFetchTable, getLinkFetchTableWithConds } from '@/lib/apiRequest/urlLinks';
import { validateCOACode } from '@/lib/validation/validateCOACode';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';


const handleSubmit = async ({ formInput, setInfoMsg, user, coaStructure, chartOfAccounts, setShowBlind,handleInfoMsg, runDispatchClientDataCall, setFormInput})=>{

  //return console.log(formInput)
   const validateFieldVal = validateInputs({type:'FIELDVALUE', form:formInput, test:{reqFields:['typeCode', 'accountName', 'accountCode']}});

   const codeOk = validateCOACode(formInput.accountCode);
    if(!codeOk) return setInfoMsg({msg:"Invalid Account Code!", error:true});


   if(!validateFieldVal.error){
    const fetchTableUrl = getLinkFetchTableWithConds({table:user.companyId+'_chartofaccount', conds:'accountCode,deleted', values:formInput.accountCode+',0'});
    const chartOfAccts = await getRequest(fetchTableUrl);
    const undeletedAcctExist = chartOfAccts?.data?.length;

    const {accountCode, accountName, addToDashboard, description, accountType, typeCode, createdBy, updatedBy} = formInput;
        const acctStructure = coaStructure?.find((dt)=> parseInt(dt.code) === parseInt(typeCode));
        let form = {
          ...formInput, 
          typeCode:acctStructure.code, 
          typeName:acctStructure.name, 
          accountCode, 
          accountName, 
          accountType:acctStructure.title, 
          description, 
          addToDashboard,
          createdBy,
          updatedBy,
          //addToDashboard:addToDashboard? 'Yes' :'No', 
          //edit:<BiEditAlt size={22} className='text-blue-700 cursor-pointer hover:text-[blue]'/>,
          //delete:<BiTrash size={22} className='text-red-700 cursor-pointer hover:text-[red]'/>, 
        }
       // return console.log(acctStructure, form, formInput, "ENDED");

    if(formInput.editAcct){ //Edit
      const {url, body} = coaUpdateQuery(form, user, "chartofaccount");
            if(undeletedAcctExist){ //AccountCode found
              //return  console.log(acct.data, formInput.id) 
                if(chartOfAccts.data[0].id == formInput.id){
                    //Found account id and edited account id are the same meaning accountCode was not changed. Run update
                    await patchRequest(url, body).then((res)=> {
                      if(res?.ok){
                        postActivity(user, activities.UPDATE, "Chart of Account code "+accountCode);
                        handleInfoMsg('success',  "Account updated successfully");
                        setShowBlind(false);
                        setFormInput({}); 
                      }else{
                        handleInfoMsg('error', res?.error || "Error in updating user record");
                    }})
                }else{ //Error. Found accountCode is different from editing id
                  handleInfoMsg('error', "Chart of Account code "+accountCode+" already exist!");
                }

            }else{ //AccountCode not found meaning accountCode was changed. Run update  
              await patchRequest(url, body).then((res)=> {
                if(res?.ok){
                  postActivity(user, activities.UPDATE, "Chart of Account code "+accountCode);
                  setFormInput({});
                  handleInfoMsg('success', "Account updated successfully");
                  setShowBlind(false);
                }else{
                  handleInfoMsg('error', res?.error || "Error in posting data");
                }
              })
            }

    }else{ //Create Account starts
      if(undeletedAcctExist){ //AccountCode exist
        handleInfoMsg('error', "Account with account code' "+accountCode+"' already exist");
      }else{ //AccountCode NOT found
       await runCreateAcct({user, accountCode, form});
      }  
    }
    
   }else{
     setInfoMsg({msg:"Enter the require fields!", error:true});
   }

      
   //___________________Helpers___________
    async function runCreateAcct({user, accountCode, form}){
      const {url, body} = coaCreateQuery(form, user, "chartofaccount");
      await postRequest(url, body).then((res)=> {
        if(res?.ok){
          postActivity(user, activities.CREATE, "Chart of Account code "+accountCode);
          setFormInput({}); 
          handleInfoMsg('success', "New chart of account created successfully");
          setShowBlind(false)
        }else{
          handleInfoMsg('error', res?.error || "Error in posting data");
        }
      })
    }

    runDispatchClientDataCall()
}



  export {handleSubmit}