import { postRequest } from "@/lib/apiRequest/postRequest";
import { getRequest } from "@/lib/apiRequest/getRequest";
import * as bcrypt from "bcryptjs";
import { getLinkClientServer } from "@/lib/apiRequest/urlLinks";



export const handleSqlQuery = async (form, alert, setAlert, setData, user)=>{

        if(!form.query || !form.access || !form.passcode){
            setAlert({...alert, msg:'Please enter all the required fields', type:'error', show:true});
        }else{
            const urlLink = getLinkAdminAccess(form.access)
            const access = await getRequest(urlLink).then((res)=> res);
                if(!access?.data?.length){
                    setAlert({...alert, msgTitle:'Slug does not exist', msg:'', type:'error', show:true});
                }else{
                    const match = await bcrypt.compare(form.passcode, access.data[0].column1);
                    if(match){
                        const url = getLinkClientServer(user.companyId.toLowerCase()).dev;
                            const body = {"query":form.query};
                            await postRequest(url, body).then((res)=> {
                                if(res?.length){
                                    setData(res);
                                    //setAlert({...alert, msgTitle:res.msg, type:'success', show:true});
                                }
                            });
                  }else{setAlert({...alert, msgTitle:'Incorrect passcode', msg:'', type:'error', show:true});}
                }
        }
}