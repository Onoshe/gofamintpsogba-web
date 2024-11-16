import { getRequest } from "@/lib/apiRequest/getRequest";
import { getLinkFetchTableWithConds, getLinkRegisterDemoAcct, getLinkUserData } from "@/lib/apiRequest/urlLinks";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { getRandomNumbers } from "@/lib/radomNos/getRandomNumbers";
import * as bcrypt from "bcryptjs";
import { postOTPMail, updateResetPassword } from "./handleSendOTP";
import { patchRequest } from "@/lib/apiRequest/patchRequest";




async function postQuery(form, client, domain){
    const pwdHarshed =  await bcrypt.hash(form.password, 10);
    let userId = `${form.firstname}.${form.lastname}`.toLowerCase();
     userId = `${client.companyDomain.toUpperCase()}@${userId}`;
    
    const {postUserLink} = getLinkRegisterDemoAcct(userId, client.companyDomain);
    const {verifyUserIdLink} = getLinkUserData({form:{userId}, domain});
    const userIdExist = await getRequest(verifyUserIdLink).then((res)=> res);

    if(userIdExist?.data?.length){
      const randNo = getRandomNumbers(0, 9, 1)[0];
      userId = `${form.firstname}.${form.lastname}${randNo}`.toLowerCase();
      userId = `${client.companyDomain.toUpperCase()}@${userId}`;
    }    
    const body = {
        "act":"INSERT",
        "table":"demo_usersaccount",
        "fields":["userId", "firstname","lastname","email", "secret", "gender", "companyId", "companyDomain", "role", "registeredDate", "createdAt", "updatedAt", "appSlug", "defaultSecret"],
        "values":[[userId, form.firstname,form.lastname, form.email, pwdHarshed, form.password, client.id, 'demo', 'Accountant', dateFmtISO(), dateFmtISO(), dateFmtISO(), "QUICKRECORDS", "1"]],
        "types":["VARCHAR", "VARCHAR", "VARCHAR","VARCHAR","VARCHAR","VARCHAR", "INT", "VARCHAR", "VARCHAR", "VARCHAR","VARCHAR","VARCHAR", "VARCHAR", "INT"]
      };
    return {url:postUserLink, body, loginDetails:{userId, password:form.password}}
}   


async function resetPwdOTPQuery({userId, setResendOpt, form, dispatchForm, setAlert}){
  //return console.log(123)
  //const userId = form.userName;
  setResendOpt(false);
  if(!userId) return setAlert({msg:'',msgTitle:'User ID not found', type:'error', show:true});

  const companyId = userId.split("@")[0]?.toLowerCase();
  const table = companyId+'_usersaccount';
  const userExistLink = getLinkFetchTableWithConds({table, conds:'userId', values:userId});
  const resetPwdExistLink = getLinkFetchTableWithConds({table, conds:'resetPassword', values:'1'});

  const userIdExist = await getRequest(userExistLink);
  const resetPwdExist = await getRequest(resetPwdExistLink);

  if(!userIdExist?.data?.length) return setAlert({msg:'',msgTitle:'User ID does not exist', type:'error', show:true}); 
  if(!resetPwdExist?.data?.length) return setAlert({msg:'',msgTitle:'Reset password not initiated on this account', type:'error', show:true}); 

  //return console.log(userIdExist)
  const {url, body, resetCode}  = updateResetPassword(userIdExist.data[0], companyId);
  //return console.log(url, body, resetCode)
  const res =  await patchRequest(url, body);
  if(res?.ok){
    await postOTPMail({resetCode, userId, email:userIdExist.data[0].email}).then((res)=>{
      setResendOpt(true);
      dispatchForm({...form, password:'', otp:''});
    //setAlert({msg:'OTP sent to '+userIdExist.data[0].email, msgTitle:'Check your inbox or junck messages for the OTP', type:'success', show:true}); 
    })
  }

  //return {url, body, loginDetails:{userId, password:form.password, ok:true}}
}   

export { postQuery, resetPwdOTPQuery};
