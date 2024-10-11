import { postRequest } from "@/lib/apiRequest/postRequest";
import { createClientAccountQuery, createClientQuery, manageClientQuery } from "./queries";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { handlePasscode } from "./handlePasscode";
import { getLinkAdminCreateClient, getLinkClientServer, getLinkFetchTableWithConds } from "@/lib/apiRequest/urlLinks";


export const dbTables = ["COASTRUCTURE",  "CHARTOFACCOUNT",  "PRODUCTS" ,  "CUSTOMERS", "VENDORS","TRANSACTIONS","TRANSACTIONSDETAILS", "USERSACCOUNT","ACTIVITYLOG", "SETTINGS"];
export const dbTablesRemove = ["COASTRUCTURE",  "PRODUCTS" ,  "CUSTOMERS", "VENDORS", "TRANSACTIONS", "CHARTOFACCOUNT","TRANSACTIONSDETAILS", "USERSACCOUNT","ACTIVITYLOG", "SETTINGS"];


export const handleCreateClientAccountOnly = async (form, alert, setAlert, handleRevalidate)=>{
    let isError = true;
    const requiredFlds = [
        'companyName', 'companyDomain', 'address', 'email', 'contactPersonFirstName', 'contactPersonLastName', 
        'contactPersonPhoneNo', 'businessType', 'packagePlan', 'passcode', 'passcodeSlug'];
    
    if(form.companyDomain.split(" ").length > 1){
        setAlert({...alert, msg:'Company domain cannot have a space!', type:'error', show:true});
        return isError
    } 
    const requiredEmpty = getEmptyField (form, requiredFlds);
    if(requiredEmpty){
            setAlert({...alert, msg:'Please enter '+requiredEmpty+". All fields are required!", type:'error', show:true});
            isError = true;
    }else{
        const passcodeRes = await handlePasscode(form);
            if(!passcodeRes?.ok){
                setAlert({...alert, msgTitle:'Incorrect passcode', msg:'', type:'error', show:true});
            }else{
                const {url, body} = createClientAccountQuery(form, "INSERT"); 
                const clUrl = getLinkFetchTableWithConds({table:'_clients', conds:'companyDomain', values:form.companyDomain.toLowerCase()});
                const clients =  await getRequest(clUrl); //postRequest(url, body).then((res)=> res);

                if(clients?.data?.length){
                    setAlert({...alert, msg:'', msgTitle:"Client with '"+form.companyDomain+"' domain already exist", type:'error', show:true});
                }else{  //act:  INSERT_NEW_CLIENT
                   //return console.log(url, body)
                   if(clients.ok){
                       await postRequest(url, body)
                        .then((res)=> {
                            console.log(res)
                            if(res.ok){
                                setAlert({...alert, msg:res.msg, type:res.ok? 'success' : 'error', show:true});
                            }else{setAlert({...alert, msg:res.error, type:'error', show:true});}
                        });
                   }else{
                    setAlert({...alert, msg:clients.error, type:'error', show:true});
                   }
                }
            }
    }
    return isError
}


function getEmptyField (form, requiredFlds){
    let invalidFld = false; 
    for (let i = 0; i < requiredFlds.length; i++) {
        const requiredFld = requiredFlds[i];
        if(!form[requiredFld]){
            return invalidFld = requiredFld 
        }
    }
    return invalidFld
}
