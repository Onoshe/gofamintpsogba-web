import { postRequest } from "@/lib/apiRequest/postRequest";
import { createClientQuery, createUserQuery, manageClientQuery } from "./queries";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { handlePasscode } from "./handlePasscode";
import { getLinkForgotPassword } from "@/lib/apiRequest/urlLinks";


export const handleCreateUser = async (form, alert, setAlert, handleRevalidate, clientsData)=>{

    if(!form.firstname || !form.lastname || !form.domain || !form.email || !form.role || !form.inactive ||
        !form.password || !form.passcode || !form.passcodeSlug){
            setAlert({...alert, msg:'Please enter all the required fields', type:'error', show:true});
    }else{
        const passcodeRes = await handlePasscode(form);
            if(!passcodeRes?.ok){
                setAlert({...alert, msgTitle:'Incorrect passcode', msg:'', type:'error', show:true});
            }else{
                const client = clientsData?.find(c => c.companyDomain.toLowerCase() === form.domain.toLowerCase());
                const {url, body, userId} = await createUserQuery({...form, companyId:client.id});
                //return console.log(url, body, userId)
                const urlCreateUser = getLinkForgotPassword({form, userId})
                const user = await getRequest(urlCreateUser).then((res)=> res);
                if(user?.data?.length){
                    setAlert({...alert, msg:"User with id '"+userId+"' already exist in '"+form.domain+"' compant", type:'error', show:true});
                }else{
                    await postRequest(url, body)
                        .then((res)=> {
                            setAlert({...alert, msgTitle:'Account created successfuly', type:'success', show:true});
                            handleRevalidate('USERSACCOUNT');
                        });
                }
            }
    }
}
