import { getLinkFetchTableWithConds, getLinkPostTrans } from "@/lib/apiRequest/urlLinks";

import * as bcrypt from "bcryptjs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { getLinkLogin, } from "@/lib/apiRequest/urlLinks";
import { generatePassword } from "@/lib/generator";



export const handleAddNewUser= async(updateForm, session)=>{
    const user = session?.user;
    //return console.log(user)
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
            const {url, body} = await getInsertParams(user.companyId, updatedParams);
            //return console.log(body, coyId)
            result = postRequest(url, body);
            //result = {ok:true}
        }
        
        
    }else {result = {ok:false, msg:"Your password is incorrect!"}}  
    
    return result
}

 async function getInsertParams(companyId, values){
    const url = getLinkPostTrans().post;
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