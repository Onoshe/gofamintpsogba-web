import { getLinkPostTrans, getLinkPostUser } from "@/lib/apiRequest/urlLinks";

import * as bcrypt from "bcryptjs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { getLinkLogin, } from "@/lib/apiRequest/urlLinks";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getUniqueRandomNumbers } from "@/lib/radomNos/getRandomNumbers";
import { getExpirationTime } from "@/lib/time/getTime";



 export const handleSendOTP= async(updateForm)=>{

    let result = {};
    if(updateForm?.id){
        const user = {id:updateForm.id, userName:updateForm?.userId}
        const domain = updateForm?.companyDomain;
        const {url, body} = updateResetPassword(user, domain);
       //return console.log(url, body)
        result = await patchRequest(url, body);
    }
    return result
}

export function updateResetPassword(user, domain){
    const resetCode = getUniqueRandomNumbers(0, 9, 6, true);
    const expiredTime = getExpirationTime(20, true);
    const urlLink = getLinkPostTrans().patch;
    const info = "Password reset initiated by "+user?.userName || user?.userId;
    const body = {
        "act":"UPDATE",
        "table":domain+"_usersaccount",
        "fields":["defaultSecret", "resetPassword","resetPasswordCode", "resetPasswordExpires", "updatedAt", "info"],
        "values":["0", "1".toString(), resetCode.toString(), expiredTime.toString(), dateFmtISO(), info],  ////Enum is stored as a string, hence type of VARCHAR
        "types":["VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR"],
        "whereField":"id",
        "whereValue":user?.id, 
        "whereType":"INT"
      };
    return {url:urlLink, body}
}   


