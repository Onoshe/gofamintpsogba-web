import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";

import * as bcrypt from "bcryptjs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { getLinkLogin, } from "@/lib/apiRequest/urlLinks";
import { patchRequest } from "@/lib/apiRequest/patchRequest";


export const handleUpdateUserPassword= async(updateForm, fetchedUser, session)=>{
    const user = session?.user;
    
    let result = {};
    if(updateForm.passwordNew === updateForm.passwordConfirm){
        const pwdHarshed =  await bcrypt.hash(updateForm.passwordNew, 10);
        const updatedParams = [pwdHarshed, dateFmtISO()];
        const {url, body} = getUpdateParams(fetchedUser?.id, user.companyId, updatedParams);

        if(fetchedUser?.id && user?.userId){
            const pwdOk =  await verifyPassword(updateForm, user)
            if(pwdOk){
                result = patchRequest(url, body);
            }else {result = {ok:false, msg:"Your old password is incorrect!"}}  
        }
    }else{
        result = {ok:false, msg:"Your new password does not match!"}
    }
    return result
}

 function getUpdateParams(idNo, companyId, values){
    const url = getLinkPostTrans().patch;
    const body = {
      act: "UPDATE",
      whereField:"id",
      whereValue:idNo,
      whereType: "INT",
      table:companyId+"_usersaccount",
      fields:["secret", "updatedAt"],
      values,
      types:["VARCHAR", "VARCHAR"]
    };
    return {url, body}
}


const  verifyPassword = async (updateForm, user)=>{
    let passwordOk = false;
       const form = {userName:user.userId};
       const urlLink = getLinkLogin({domain:user.companyId, form});
       const userData = await getRequest(urlLink).then((res)=> res);
       if(userData?.data?.length){
        const match = await bcrypt.compare(updateForm.passwordOld, userData.data[0].secret);
        if(match){
            passwordOk = true;
        }
       }
    return passwordOk
}
