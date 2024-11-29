import { getLinkClientServer, getLinkFetchTableWithConds, getLinkPostTrans } from "@/lib/apiRequest/urlLinks";

import * as bcrypt from "bcryptjs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { getLinkLogin, } from "@/lib/apiRequest/urlLinks";
import { generatePassword } from "@/lib/generator";
import getRegisterUserEmailBody from "@/components/htmlEmail/registerUserEmail";
import { platformDomain } from "@/container/_home/utils/registerHandler";



export const handleAddNewUser= async(updateForm, session)=>{
    const user = session?.user;
    //return console.log(updateForm);
    let result = {};
    const pwdOk =  await verifyPassword(updateForm, user);
    const userName = updateForm.userId1.toLowerCase()+"."+updateForm.userId2.toLowerCase();
    const userId = user.companyId.toUpperCase()+"@"+userName;
    if(pwdOk){
        const coyId = await getCoyIdNo(user);
        const updatedParams = [userId, updateForm.firstname, updateForm.lastname, updateForm.title, 
            updateForm.email, updateForm.phoneNo, updateForm.role, coyId[0].id];
        const userEmailExist =  await checkUserExist(user, "email", updateForm.email);
        const userIdExist =  await checkUserExist(user, "userId", userId);
        if(userEmailExist){
            result = {ok:false, type:'EMAIL', msg:"User with this email already exist!"}
        }else if(userIdExist){
            result = {ok:false, type:'USERID', msg:"Default UserId already exist. Please, change the UserId"}
        }else{
            const {url, body, defaultSecret} = await getInsertParams(user.companyId, updatedParams);
            //return console.log(body, userForm)
             const domain =user.companyId.toLowerCase();
            result = await postRequest(url, body);
            if(result.ok){
              const addRes =  await postNewUserMail({domain, form:{firstname:updateForm.firstname, lastname:updateForm.lastname, email:updateForm.email}, loginDetails:{password:defaultSecret, userId}});
              console.log(addRes);
              result = addRes;
            }
            //result = {ok:true}
        }
        
        
    }else {result = {ok:false, msg:"Your password is incorrect!"}}  
    return result
}

 async function getInsertParams(companyId, values){
    const url = getLinkPostTrans(companyId).post;
    const companyDomain = companyId.toLowerCase();
    const defaultSecret =  generatePassword(8);
    const pwdHarshed =  await bcrypt.hash(defaultSecret, 10);
    const body = {
      act: "INSERT",
      table:companyId+"_usersaccount",
      fields:["userId", "firstname", "lastname", "title", "email", "phoneNo", "role", "companyId",
        "nonActive", "deleted", "companyDomain", "appSlug", "defaultSecret", "secret","registeredDate", "updatedAt", 
        "createdAt", "info"],
      values:[[...values, 
        "0", "0", companyDomain, "QUICKRECORDS", "1", pwdHarshed, dateFmtISO(), dateFmtISO(), 
        dateFmtISO(), "defaultPassword: "+defaultSecret]],
      types:["VARCHAR", "VARCHAR", "VARCHAR","VARCHAR","VARCHAR","VARCHAR","VARCHAR","INT",
        "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR","VARCHAR", "VARCHAR", 
        "VARCHAR", "VARCHAR"]
    };
    return {url, body, defaultSecret}
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

const checkUserExist = async (user, cond, vals)=>{
    let userFound = false;
       const table = user.companyId+"_usersaccount";
       const checkLink = getLinkFetchTableWithConds({table, conds:cond, values:vals});
       const userData = await getRequest(checkLink).then((res)=> res);
       if(userData?.data?.length){
          userFound = true;  
       }
    return userFound
}


const getCoyIdNo = async (user)=>{
    let userFound = false;
       const table = "_clients";
       const val = user.companyId.toUpperCase();
       const checkLink = getLinkFetchTableWithConds({table, conds:"companyDomain", values:val});
       const userData = await getRequest(checkLink).then((res)=> res);
       if(userData?.data?.length){
          userFound = userData.data;  
       }
    return userFound
}


const postNewUserMail = async ({domain, form, loginDetails})=>{
    const mailHtml = getRegisterUserEmailBody({
        name:'Dear: '+form.firstname+' '+form.lastname, 
        subject:"QuickRecords Login Details", 
        userName:loginDetails.userId, 
        email:form.email, 
        password:loginDetails.password, 
        emailMsg1:'Your account registration on QuickRecords was successful and your login details are:',
        emailMsg2:'Go to the login page and login to change your one-time password.',
        loginPage:platformDomain});
        const sendMailLink = getLinkClientServer(domain).dev;
        const mailBody = {
            route:"SENDMAIL",
            mailObj:{
                mailTo:form.email,
                mailFrom:"no-reply@quickrecords.gofamintpsogba.org",
                mailSubject:"QuickRecords Login Details",
                mailBody:mailHtml
            }
        };

      const res =  await postRequest(sendMailLink, mailBody);
      return res
       
}