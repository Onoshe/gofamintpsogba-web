import { getRequest } from "@/lib/apiRequest/getRequest";
import { getLinkAdminAccess } from "@/lib/apiRequest/urlLinks";
import * as bcrypt from "bcryptjs";




export const handlePasscode = async (form)=>{

        if(!form.passcodeSlug || !form.passcode){
            return {ok:false, msg:'Please enter passcode slug and passcode', type:'error'};
        }else{
             const urlLink = getLinkAdminAccess(form.passcodeSlug);
            const passcode = await getRequest(urlLink).then((res)=> res);
                if(!passcode?.data?.length){
                     return {ok:false, msg:'Slug does not exist', type:'error'};
                }else{
                    const match = await bcrypt.compare(form.passcode, passcode.data[0].column1);
                    if(match){
                        return {ok:true, msg:'Passcode ok', type:'success'};  
                    }else{
                        return {ok:false, msg:'Incorrect passcode', type:'error'};
                    }
                }
        }
}