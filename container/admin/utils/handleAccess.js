import { postRequest } from "@/lib/apiRequest/postRequest";
import { createAccessQuery, createClientQuery, manageClientQuery, updateAccessQuery } from "./queries";
import { getRequest } from "@/lib/apiRequest/getRequest";
import * as bcrypt from "bcryptjs";
import { handlePasscode } from "./handlePasscode";
import { getLinkAdminAccess } from "@/lib/apiRequest/urlLinks";

export const handleAccess = async (form, alert, setAlert, setForm, handleRevalidate)=>{


    if(form.actType === "CREATE"){
        if(!form.name || !form.slug || !form.description || !form.column1 || !form.passcodeSlug || !form.passcode){
            setAlert({...alert, msg:'Please enter all the required fields', type:'error', show:true});
        }else{
            const passcodeRes = await handlePasscode(form);
            if(passcodeRes?.ok){
                const {url, body} = await createAccessQuery(form);
                const urlAccess = getLinkAdminAccess(form.slug);
                const access = await getRequest(urlAccess).then((res)=> res);
                //return console.log(user);
                if(access?.data?.length){
                    setAlert({...alert, msgTitle:'Slug already exist', msg:'', type:'error', show:true});
                }else{
                await postRequest(url, body)
                .then((res)=> {
                    if(res?.data?.length){
                        //console.log(res)
                        setAlert({...alert, msgTitle:'Data inserted successfully', type:'success', show:true});
                        setForm({actType:'CREATE'});
                        handleRevalidate('ACCESS');
                    }else{setAlert({...alert, msgTitle:'Error in posting data', type:'error', show:true});}
                });
            }
            }else{
                setAlert({...alert, msgTitle:'Accss denied!', msg:passcodeRes?.msg, type:'error', show:true});
            }
        }
    }else if(form.actType === "UPDATE"){
        //console.log(form, form.newAccess === form.confirmAccess)
        //const pwdHarshed =  await bcrypt.hash("QUICKRECORDS2024", 10);
        //console.log(pwdHarshed);

        if(!form.newAccess || !form.confirmAccess || !form.slug || !form.passcode || !form.passcodeSlug){
            setAlert({...alert, msg:'Please enter all the required fields', type:'error', show:true});
            }else{
                if(form.newAccess === form.confirmAccess){
                    const {url, body} = await updateAccessQuery(form);
                    const urlAccess = getLinkAdminAccess(form.slug);
                    const accesss = await getRequest(urlAccess).then((res)=> res);
                    if(accesss?.data?.length){ //Slug to update exist
                        const passcodeRes = await handlePasscode(form);
                            if(passcodeRes?.ok){
                                await postRequest(url, body)
                                .then((res)=> {
                                    if(res?.data?.length){
                                        //console.log(res)
                                        setAlert({...alert, msgTitle:'Access updated successfully', type:'success', show:true});
                                        setForm({actType:'CREATE'});
                                        handleRevalidate('ACCESS');
                                    }else{setAlert({...alert, msgTitle:'Error in posting data', type:'error', show:true});}
                                });
                            }else{ setAlert({...alert, msgTitle:passcodeRes.msg, msg:'', type:'error', show:true});}
                       
                    }else{setAlert({...alert, msgTitle:'Incorrect slug!', msg:'Your selected slug does not exist', type:'error', show:true});}
                }else{setAlert({...alert, msgTitle:'Incorrect access!', msg:'Your access does not match, please check', type:'error', show:true});}
        }
    
 }


}