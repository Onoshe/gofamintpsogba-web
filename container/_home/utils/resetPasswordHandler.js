import * as bcrypt from "bcryptjs";
import { validateInputs } from "./validateInputs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { getLinkPostUser, getLinkResetPwd } from "@/lib/apiRequest/urlLinks";



const  resetPasswordHandler = async (form, setAlert, setModalAlert, setModalAlertCall)=>{
    const res = validateInputs(form, "RESETPWD");
    //form = {password:'', userName:'', opt:''}
    if(res.error){
        setAlert({...alert, msg:'Please enter your username and email', type:'error', show:true});
    }else{
        const domain = form?.userName?.split('@')[0].toLowerCase();
        const urlLink = getLinkResetPwd({domain, form});
        const user = await getRequest(urlLink).then((res)=> res);
        //console.log(user);
        if(user?.data?.length){
                const {resetPassword, resetPasswordCode, resetPasswordExpires} = user.data[0];
               if(resetPassword == "1"){
                    let timeToExpire  =  resetPasswordExpires;
                    timeToExpire = new Date(timeToExpire).getTime();
                    const currntTime = new Date().getTime();
                    //console.log([currntTime, timeToExpire,currntTime > timeToExpire, resetPassword, resetPasswordCode, resetPasswordExpires, new Date().toISOString()]); 
                    if(currntTime > timeToExpire){
                        setAlert({...alert, msg:`Sorry, the OPT code has expired. Click Resend for a new code`, type:'error', show:true});            
                    }else{
                     if(form.otp === resetPasswordCode){
                         //console.log(user)
                         const pwdHarshed =  await bcrypt.hash(form.password, 10);
                         const {url, body} = updateResetPassword(user.data[0], domain, pwdHarshed);
                         //return console.log(body)
                         await postRequest(url, body)
                         .then((res)=> {
                             //setAlert({...alert, msgTitle:'OTP sent successfully!', msg:'Check your inbox or spam messages for the code', type:'success', show:true});
                             setModalAlert({...alert, msgTitle:'Password successfully updated', msg:'You will now be redirected to the login page.', type:'success', showLoading:true, loadingMsg:'Redirecting, please wait...', show:true});
                             setModalAlertCall({showModal:'', act:'RESETPWD'});
                             //setTimeout(()=>goToPage('/reset-password'), 300);
                       });
                     }else{setAlert({...alert, msg:`Incorrect OPT`, type:'error', show:true});}
                  }
               }else{
                setAlert({...alert, msg:`Sorry, password reset was not initiated on '${form.userName}', You can login with your existing password.`, type:'error', show:true});    
               }
        }else{
            setAlert({...alert, msg:`User with '${form.email}' email was not found. Contact your Admin for your username and email`, type:'error', show:true});           
        }

    }
}



function updateResetPassword(user, domain, pwd){
    //console.log(resetCode);
    const url = getLinkPostUser(domain);
    const body = {
        "act":"UPDATE",
        "table":domain+"_usersaccount",
        "fields":["resetPassword","resetPasswordCode", "resetPasswordExpires", "updatedAt", "secret"],
        "values":["0", null, null, dateFmtISO(), pwd],  ////Enum is stored as a string, hence type of VARCHAR
        "types":["VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR"],
        "whereField":"id",
        "whereValue":user?.id, 
        "whereType":"INT"
      };
    return {url, body}
}   



export {resetPasswordHandler}