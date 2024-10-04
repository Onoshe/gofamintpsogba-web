import { postRequest } from "@/lib/apiRequest/postRequest";
import { createClientQuery, manageClientQuery } from "./queries";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { handlePasscode } from "./handlePasscode";
import { getLinkAdminCreateClient, getLinkClientServer } from "@/lib/apiRequest/urlLinks";


export const dbTables = ["COASTRUCTURE",  "CHARTOFACCOUNT",  "PRODUCTS" ,  "CUSTOMERS", "VENDORS","TRANSACTIONS","TRANSACTIONSDETAILS", "USERSACCOUNT","ACTIVITYLOG", "SETTINGS"];
export const dbTablesRemove = ["COASTRUCTURE",  "PRODUCTS" ,  "CUSTOMERS", "VENDORS", "TRANSACTIONS", "CHARTOFACCOUNT","TRANSACTIONSDETAILS", "USERSACCOUNT","ACTIVITYLOG", "SETTINGS"];


export const handleCreateClient = async (form, alert, setAlert, handleRevalidate)=>{
    let isError = true;
    const requiredFlds = [
        'companyName', 'companyDomain', 'address', 'email', 'contactPersonFirstName', 'contactPersonLastName', 
        'contactPersonPhoneNo', 'businessType', 'packagePlan', 'passcode', 'passcodeSlug'];

    const requiredEmpty = getEmptyField (form, requiredFlds);
    if(requiredEmpty){
            setAlert({...alert, msg:'Please enter '+requiredEmpty+". All fields are required!", type:'error', show:true});
            isError = true;
    }else{
        const passcodeRes = await handlePasscode(form);
            if(!passcodeRes?.ok){
                setAlert({...alert, msgTitle:'Incorrect passcode', msg:'', type:'error', show:true});
            }else{
                const {url, body} = createClientQuery(form, "INSERT_NEW_CLIENT"); //"INSERT_NEW_CLIENT"
                //console.log(url, body)
                
                //const urlLink = getLinkAdminCreateClient({form}); 
                //const user = await getRequest(urlLink).then((res)=> res);
                
                const user =  await postRequest(url, body).then((res)=> res);
                //console.log(body, form, user)
                //return isError


                if(user?.data?.length){
                    setAlert({...alert, msg:'', msgTitle:"Client with '"+form.companyDomain+"' domain already exist", type:'error', show:true});
                }else{
                   const resData =  await postRequest(url, body)
                        .then((res)=> {
                            //console.log(res)
                            setAlert({...alert, msg:res.msg, type:res.ok? 'success' : 'error', show:true});
                            /*if(res?.ok){
                                const {id, companyDomain} = res.data.find((cl)=> cl.companyDomain.toLowerCase() === form.companyDomain.toLowerCase());
                                if(form.autoCreateTables){
                                    const url = getLinkClientServer().server;
                                        let body = {
                                        "db":"",
                                        "act":"CREATE",
                                        "domain":companyDomain,
                                        "clientId":id,
                                        "tables":dbTables
                                        };
                                    
                                    //setAlert({...alert, msg:'', msgTitle:"Client created successfully", type:'success', show:true});
                                    //handleRevalidate('DBTABLES');
                                    return {url, body};
                                }else{
                                    setAlert({...alert, msg:'', msgTitle:"Client created successfully", type:'success', show:true});
                                    handleRevalidate('DBTABLES');
                                }
                            }else{setAlert({...alert, msg:'', msgTitle:res.error || "Error! Failed to post data", type:'error', show:true});}
                        */
                        });
                    if(resData?.url){
                        //Auto create client Tables
                        //console.log(resData)
                        await patchRequest(resData.url, resData.body)
                        .then((res)=> {
                            setAlert({...alert, msg:'', msgTitle:"Client with domain name '"+resData.body.domain+"' and tables created successfully", type:'success', show:true});
                            handleRevalidate('DBTABLES');
                            isError = false;
                        });
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
