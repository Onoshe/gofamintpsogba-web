import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";

import * as bcrypt from "bcryptjs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { getLinkLogin, } from "@/lib/apiRequest/urlLinks";
import { patchRequest } from "@/lib/apiRequest/patchRequest";



export const handleEditUserRole= async(updateForm, selectedUser, session)=>{
    const user = session?.user;
    //return console.log(updateForm, fetchedUser)
    let result = {};
    if(selectedUser?.id && user?.userId){
        const pwdOk =  await verifyPassword(updateForm, user)
        if(pwdOk){
            const updatedParams = [updateForm?.role, updateForm?.nonActive === "active"? '0' : '1', dateFmtISO()];
            const {url, body} = getUpdateParams(selectedUser?.id, user.companyId, updatedParams);
            //return console.log(url, body)
            result = patchRequest(url, body);
        }else {result = {ok:false, msg:"Your password is incorrect!"}}  
    }
    return result
}

 function getUpdateParams(idNo, companyId, values){
    const url = getLinkPostTrans(companyId).patch;
    const body = {
      act: "UPDATE",
      whereField:"id",
      whereValue:idNo,
      whereType: "INT",
      table:companyId+"_usersaccount",
      fields:["role", "nonActive", "updatedAt"],
      values,
      types:["VARCHAR", "VARCHAR", "VARCHAR"]
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
