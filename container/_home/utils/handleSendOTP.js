import { getLinkClientServer, getLinkPostTrans, getLinkPostUser } from "@/lib/apiRequest/urlLinks";

import * as bcrypt from "bcryptjs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getUniqueRandomNumbers } from "@/lib/radomNos/getRandomNumbers";
import { getExpirationTime } from "@/lib/time/getTime";
import getOTPEmailBody from "@/components/htmlEmail/otpEmail";



 export const handleSendOTP= async(updateForm)=>{
    const {id, companyDomain, email, userId} = updateForm;
    //return console.log(updateForm)
    
    let result = {};
    if(updateForm?.id){
        const user = {id, userName:userId}
        const domain = companyDomain;
        const {url, body, resetCode} = updateResetPassword(user, domain);
        result = await patchRequest(url, body);

        const mailHtml = getOTPEmailBody({OTP:resetCode, name:"Dear: "+userId, 
            subject:"Password Reset Initiated on your Account",
            optMsg: "This OTP Is valid only for 15 mintues, If you haven't requested this OTP Contact us immediately!",
        });
        const sendMailLink = getLinkClientServer(domain).dev;
        const mailBody = {
            route:"SENDMAIL",
            mailObj:{
                mailTo:email,
                mailFrom:"no-reply@quickrecords.gofamintpsogba.org",
                mailSubject:"OTP Authentication",
                mailBody:mailHtml
            }
        };
      result =  await postRequest(sendMailLink, mailBody); //result ={ok:true, message:"Mail sent successfull"}
      //console.log(result)
    }
    return result
}


export function updateResetPassword(user, domain){
    const resetCode = getUniqueRandomNumbers(0, 9, 6, true);
    const expiredTime = getExpirationTime(20, true);
    const url = getLinkPostTrans(domain).patch;
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
    return {url, body, resetCode}
}   

export async function postOTPMail({resetCode, userId, email}){
    const mailHtml = getOTPEmailBody({OTP:resetCode, name:"Dear: "+userId, 
        subject:"Password Reset Initiated on your Account",
        optMsg: "This OTP Is valid only for 15 mintues, If you haven't requested this OTP Contact us immediately!",
    });
    let domain = userId.split("@")[0];
    domain = domain.toLowerCase();
    const sendMailLink = getLinkClientServer(domain).dev;
    const mailBody = {
        route:"SENDMAIL",
        mailObj:{
            mailTo:email,
            mailFrom:"no-reply@quickrecords.gofamintpsogba.org",
            mailSubject:"OTP Authentication",
            mailBody:mailHtml
        }
    };

  return await postRequest(sendMailLink, mailBody); //{ok:true, message:"Mail sent successfull"}
}
