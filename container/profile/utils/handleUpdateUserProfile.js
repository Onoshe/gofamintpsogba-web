import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";

import * as bcrypt from "bcryptjs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { getLinkLogin, } from "@/lib/apiRequest/urlLinks";
import { patchRequest } from "@/lib/apiRequest/patchRequest";


export const handleUpdateUserProfile= async(form, fetchedUser, session)=>{
    const user = session?.user;
    const updatedParams = [form?.phoneNo, form?.title, form?.recoveryEmail, dateFmtISO()];
    const {url, body} = getUpdateParams(fetchedUser?.id, user.companyId, updatedParams);
    let result = {};

    if(form.recoveryEmail == fetchedUser.email){
        result = {ok:false, msg:"Your email cannot the same as your recovery email."}
    }else{
        if(fetchedUser?.id && user?.userId){
        const pwdOk =  await verifyPassword(form, user)
        if(pwdOk){
            result = patchRequest(url, body);
        }else {result = {ok:false, msg:"Incorrect password!"}}  
        }
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
      fields:["phoneNo", "title", "recoveryEmail", "updatedAt"],
      values,
      types:["VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR"]
    };
    return {url, body}
}


const  verifyPassword = async (updateForm, user)=>{
    let passwordOk = false;
       const form = {userName:user.userId};
       const urlLink = getLinkLogin({domain:user.companyId, form});
       const userData = await getRequest(urlLink).then((res)=> res);
       if(userData?.data?.length){
        const match = await bcrypt.compare(updateForm.password, userData.data[0].secret);
        if(match){
            passwordOk = true;
        }
       }
    return passwordOk
}
