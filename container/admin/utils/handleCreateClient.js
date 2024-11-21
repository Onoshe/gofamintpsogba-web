import { postRequest } from "@/lib/apiRequest/postRequest";
import { createClientQuery } from "./queries";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { handlePasscode } from "./handlePasscode";
import { getLinkClientServer, getLinkFetchTable, getLinkFetchTableWithConds } from "@/lib/apiRequest/urlLinks";


export const dbTables = ["COASTRUCTURE",  "CHARTOFACCOUNT",  "PRODUCTS" ,  "CUSTOMERS", "VENDORS","TRANSACTIONS","TRANSACTIONSDETAILS", "USERSACCOUNT","ACTIVITYLOG", "SETTINGS"];
export const dbTablesRemove = ["COASTRUCTURE",  "PRODUCTS" ,  "CUSTOMERS", "VENDORS", "TRANSACTIONS", "CHARTOFACCOUNT","TRANSACTIONSDETAILS", "USERSACCOUNT","ACTIVITYLOG", "SETTINGS"];


export const handleCreateClient = async (form, alert, setAlert, handleRevalidate, setForm)=>{
    let isError = true;
    const requiredFlds = [
        'companyName', 'companyDomain', 'address', 'email', 'contactPersonFirstName', 'contactPersonLastName', 
        'contactPersonPhoneNo', 'businessType', 'packagePlan', 'passcode', 'passcodeSlug'];
    

    
    const requiredEmpty = getEmptyField (form, requiredFlds);
    if(requiredEmpty){
            setAlert({...alert, msgTitle:'', msg:'Please enter '+requiredEmpty+". All fields are required!", type:'error', show:true});
            isError = true;
    }else{
        if(form?.companyDomain?.split(" ").length > 1){
            setAlert({...alert, msg:'Company domain cannot have a space!', type:'error', show:true});
            return isError
        } 
        const passcodeRes = await handlePasscode(form);
            if(!passcodeRes?.ok){
                setAlert({...alert, msgTitle:'Incorrect passcode', msg:'', type:'error', show:true});
            }else{
                const domainLw = form.companyDomain.trim().toLowerCase();
                const domainUp = form.companyDomain.trim().toUpperCase();
                
                const userUrl = getLinkFetchTableWithConds({table:'_clients', conds:'companyDomain,companyDomain', values:`${domainUp},${domainLw}`});
                const user = await getRequest(userUrl);
  
                    if(user?.data?.length){
                        setAlert({...alert, msg:'', msgTitle:"Client with '"+form.companyDomain+"' domain already exist", type:'error', show:true});
                    }else{  //act:  CREATE_CLIENT
                        const {url, body} = createClientQuery(form, "CREATE_CLIENT"); 

                        //Insert new client in _clients and create new client database 
                        const resData = await postRequest(url, body);
                        if(!resData.ok){
                            setAlert({...alert, msg:'', msgTitle:resData.msg, type:'error', show:true});
                        }{
                            //Create new client tables
                            const domain = form.companyDomain.trim().toLowerCase();
                            const url =  getLinkClientServer(domain).server;
                            const body = {
                                "act":"CREATE_CLIENT_TABLES",
                                "domain":domain,
                                "clientId":form.clientId,
                                "table":domain+"_usersaccount"
                              };
                           await postRequest(url, body)
                            .then((res)=>{
                                if(res?.ok){
                                    setAlert({...alert, msg:resData.db.msg, msgTitle:resData.msg, type:'success', show:true});
                                    handleRevalidate('DBTABLES');
                                    handleRevalidate('DBS');
                                    isError = false;
                                    setForm({autoCreateTables:true});
                                    
                                }else{
                                    setAlert({...alert, msg:'', msgTitle:resData.msg, type:'error', show:true});
                                }
                             })
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
