import * as bcrypt from "bcryptjs";
import { validateInputs } from "./validateInputs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { getUniqueRandomNumbers } from "@/lib/radomNos/getRandomNumbers";
import { getExpirationTime } from "@/lib/time/getTime";
import { getLinkForgotPassword, getLinkPostUser } from "@/lib/apiRequest/urlLinks";



const  forgotPasswordHandler = async (form, setAlert, setModalAlert, setModalAlertCall)=>{
    const res = validateInputs(form, "FORGOTPWD");
    if(res.error){
        setAlert({...alert, msg:'Please enter your username and email', type:'error', show:true});
    }else{
        const domain = form.userName.split('@')[0].toLowerCase();
        const urlLink = getLinkForgotPassword({domain, form});
        const user = await getRequest(urlLink).then((res)=> res);
        //console.log(user, domain);
        if(user?.data?.length){
                //console.log(user)
                if(user.data[0].email == form.email || user.data[0]?.recoveryEmail == form.email){
                    const {url, body} = updateResetPassword(user.data[0], domain);
                    //return console.log(body)
                    await postRequest(url, body)
                    .then((res)=> {
                        //setAlert({...alert, msgTitle:'OTP sent successfully!', msg:'Check your inbox or spam messages for the code', type:'success', show:true});
                        setModalAlert({...alert, msgTitle:'OTP sent successfully!', msg:'Please wait while we redirect you to password reset page. Check your inbox or spam messages for password reset OTP', type:'success', showLoading:true, loadingMsg:'Redirecting, please wait...', show:true});
                        setModalAlertCall({showModal:'', act:'FORGOTPWD'});
                        //setTimeout(()=>goToPage('/reset-password'), 300);
                });
            }else{
                setAlert({...alert, msgTitle:'Incorrect Email!', msg:`'${form.email}' is not the registered or recovery email for ${form.userName}`, type:'error', show:true});   
            }
        }else{
            setAlert({...alert, msg:`User with '${form.email}' email was not found. Contact your Admin for your username and email`, type:'error', show:true});           
        }

    }
}



function updateResetPassword(user, domain){
    const resetCode = getUniqueRandomNumbers(0, 9, 6, true);
    const expiredTime = getExpirationTime(20, true);
    const urlLink = getLinkPostUser();
    const body = {
        "act":"UPDATE",
        "table":domain+"_usersaccount",
        "fields":["resetPassword","resetPasswordCode", "resetPasswordExpires", "updatedAt"],
        "values":["1".toString(), resetCode.toString(), expiredTime.toString(), dateFmtISO()],  ////Enum is stored as a string, hence type of VARCHAR
        "types":["VARCHAR", "VARCHAR", "VARCHAR", "VARCHAR"],
        "whereField":"id",
        "whereValue":user?.id, 
        "whereType":"INT"
      };
    return {url:urlLink, body}
}   



export {forgotPasswordHandler}