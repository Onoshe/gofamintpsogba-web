import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";

import * as bcrypt from "bcryptjs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { getLinkLogin, } from "@/lib/apiRequest/urlLinks";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { generatePassword } from "@/lib/generator";


export const handleResetUserPassword= async(updateForm, fetchedUser, session)=>{
    const user = session?.user;
    let result = {};
    const {url, body} = await getUpdateParams(fetchedUser?.id, user.companyId);

    //return console.log(body)
    if(fetchedUser?.id && user?.userId){
        const pwdOk =  await verifyPassword(updateForm, user)
        if(pwdOk){
            result = patchRequest(url, body);
        }else {result = {ok:false, msg:"Your password is incorrect!"}}  
    }
    
    return result
}

 async function getUpdateParams(idNo, companyId){
    const defaultSecret =  generatePassword(8);
    const pwdHarshed =  await bcrypt.hash(defaultSecret, 10);

    const url = getLinkPostTrans().patch;
    const body = {
      act: "UPDATE",
      whereField:"id",
      whereValue:idNo,
      whereType: "INT",
      table:companyId+"_usersaccount",
      fields:["secret", "defaultSecret", "updatedAt"],
      values:[pwdHarshed, "1", dateFmtISO()],
      types:["VARCHAR","VARCHAR", "VARCHAR"]
    };
    return {url, body}
}


const  verifyPassword = async (updateForm, user)=>{
    let passwordOk = false;
       const form = {userName:user.userId};
       const urlLink = getLinkLogin({domain:user.companyId, form});
       const userData = await getRequest(urlLink).then((res)=> res);
       if(userData?.data?.length){
        const match = await bcrypt.compare(updateForm.passwordReset, userData.data[0].secret);
        if(match){
            passwordOk = true;
        }
       }
    return passwordOk
}
