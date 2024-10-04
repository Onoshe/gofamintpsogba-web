import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";

import * as bcrypt from "bcryptjs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { getLinkLogin, } from "@/lib/apiRequest/urlLinks";
import { patchRequest } from "@/lib/apiRequest/patchRequest";



export const handleDeleteUserAcct= async(updateForm, selectedUser, session)=>{
    const user = session?.user;
    //return console.log(updateForm, selectedUser, user)
    let result = {};
        const pwdOk =  await verifyPassword(updateForm, user)
        if(pwdOk){
            const {url, body} = getUpdateParams(selectedUser?.id, user.companyId);
            result = patchRequest(url, body);
        }else {result = {ok:false, msg:"Your password is incorrect!"}}  
    
    return result
}

 function getUpdateParams(idNo, companyId){
    const url = getLinkPostTrans().patch;
    const body = {
      act: "UPDATE",
      whereField:"id",
      whereValue:idNo,
      whereType: "INT",
      table:companyId+"_usersaccount",
      fields:["deleted", "updatedAt"],
      values:["1", dateFmtISO()],
      types:["VARCHAR", "VARCHAR",]
    };
    return {url, body}
}


const  verifyPassword = async (updateForm, user)=>{
    let passwordOk = false;
       const form = {userName:user.userId};
       const urlLink = getLinkLogin({domain:user.companyId, form});
       const userData = await getRequest(urlLink).then((res)=> res);
       if(userData?.data?.length){
        const match = await bcrypt.compare(updateForm.passwordDelete, userData.data[0].secret);
        if(match){
            passwordOk = true;
        }
       }
    return passwordOk
}
