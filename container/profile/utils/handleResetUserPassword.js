import { getLinkClientServer, getLinkPostTrans } from "@/lib/apiRequest/urlLinks";

import * as bcrypt from "bcryptjs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { getLinkLogin, } from "@/lib/apiRequest/urlLinks";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { generatePassword } from "@/lib/generator";
import getRegisterUserEmailBody from "@/components/htmlEmail/registerUserEmail";


export const handleResetUserPassword= async(updateForm, fetchedUser, session)=>{
    const user = session?.user;
    let result = {};
    const {url, body, defaultSecret} = await getUpdateParams(fetchedUser?.id, user.companyId);
    const form = {userId:fetchedUser.userId, userName:fetchedUser.firstname+" "+fetchedUser.lastname, email:fetchedUser.email, defaultPassword:defaultSecret};

    //return console.log(form)
    if(fetchedUser?.id && user?.userId){
        const pwdOk =  await verifyPassword(updateForm, user)
        if(pwdOk){
            result = await patchRequest(url, body);
            //console.log(result)
            if(result?.ok){
                //Send mail
             result = await sendResetPasswordMail(form);
            // console.log(result)      
            }
        }else {result = {ok:false, msg:"Your password is incorrect!"}}  
    }
    
    return result
}

  async function sendResetPasswordMail({userId, userName, email, defaultPassword}){
    const mailHtml = getRegisterUserEmailBody({
        name:'Dear: '+userName, 
        subject:"QuickRecords Password Reset", 
        userName:userId, 
        email, 
        password:defaultPassword, 
        emailMsg1:'Reset password was initiated on your account by the Admin. Your new default login details are as follows:',
        emailMsg2:'Go to the login page and login to change your one-time password.',
        loginPage:'https://quick-records.vercel.app/login'});
        const sendMailLink = getLinkClientServer().dev;
        const mailBody = {
            route:"SENDMAIL",
            mailObj:{
                mailTo:email,
                mailFrom:"no-reply@quickrecords.gofamintpsogba.org",
                mailSubject:"QuickRecords Password Reset",
                mailBody:mailHtml
            }
        };
       //console.log(mailBody) 
       return  await postRequest(sendMailLink, mailBody);
        //.then(()=>{
            //setModalAlert({...alert, msgTitle:'Registration successful', msg:'You will now be redirected to the login page. Check your inbox or spam messages for your login details', type:'success', showLoading:true, loadingMsg:'Redirecting, please wait...', show:true});
            //setModalAlertCall({showModal:'', act:'REGISTER'});
            //dispatchResetForm();
        //})
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
    return {url, body, defaultSecret}
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
