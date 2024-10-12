import * as bcrypt from "bcryptjs";
import { validateInputs } from "./validateInputs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { getLinkLogin, getLinkPostUser } from "@/lib/apiRequest/urlLinks";
import { findLoginUser, findUser } from "@/lib/authActions/findUser";
import { handleSendOTP } from "./handleSendOTP";



export const loginHandler = async({e, loadingBtn, setLoadingBtn, signIn, form, dispatchCoy, dispatchActivePage,
        runDispatchClientData, setAlert, goToPage, postActivity,dispatchCOAStructure, dispatchProducts, dispatchChartOfAccounts,
        dispatchCustomers, dispatchVendors, dispatchTransReady, dispatchTransactions, dispatchTransactionsDetails,
        activities,dispatchResetPwdInfo
})=>{
    if(loadingBtn.loading) return
    setLoadingBtn({loading:true});
    
    const findUserRes = await findLoginUser(form);
    //console.log(findUserRes)
    //******* Verify if defaultPassword || nonActive. Default password occur when a new user is added or when there is a reset of password**************
    if(findUserRes.ok){
        if(parseInt(findUserRes.defaultSecret) || parseInt(findUserRes.nonActive) || parseInt(findUserRes.resetPassword)){
            if(parseInt(findUserRes.defaultSecret)){
                setAlert({msgTitle:'Password reset has been initiated on your account', msg:'You will be redirected to password reset page to change your password.', type:'error', show:true});
                await handleSendOTP(findUserRes) // defaultSecret changed to 0 and resetPassword set to 1
                setTimeout(()=>{
                    dispatchResetPwdInfo({msg:'Password change code sent to '+findUserRes.email, style:'text-[cyan]', title:"Change Default Password", 
                        id:findUserRes.id, userName:findUserRes.userId, email:findUserRes.email,});
                    goToPage('/reset-password?u='+findUserRes.userId);
                }, 8000)
            }else if(parseInt(findUserRes.resetPassword)){
                setAlert({msgTitle:'Change Password initiated on your account', msg:'You are been redirected to the page', type:'info', show:true});
                setTimeout(()=>{
                    dispatchResetPwdInfo({msg:'Password change code sent to '+findUserRes.email, style:'text-[cyan]', title:"Change Password", 
                        id:findUserRes.id, userName:findUserRes.userId, email:findUserRes.email,});
                    goToPage('/reset-password?u='+findUserRes.userId);
                }, 3000)
                setLoadingBtn({loading:false}); 
            }else if(parseInt(findUserRes.nonActive)){
                setAlert({msgTitle:'Account de-activated!', msg:'Please contact your Admin to activate your account', type:'error', show:true});
                setLoadingBtn({loading:false}); 
            }
        }else{
            const result = await signIn('credentials', { //Check lib.authAction for the code
                redirect: false,
                email:form.email,
                password:form.password,
                userName:form.userName
                });
            if(result.ok){
                const domain = form?.userName?.split("@")[0]?.toLowerCase();
                dispatchCoy(domain);
                dispatchActivePage({name:'', title:"Dashboard"});
                if(domain !== "admin"){
                    await runDispatchClientData({domain, dispatchCOAStructure, dispatchProducts, dispatchChartOfAccounts, dispatchCustomers, dispatchVendors, dispatchTransReady, dispatchTransactions, dispatchTransactionsDetails})
                    .then(()=> goToPage("/"+domain))
                }else{
                    goToPage("/"+domain)
                }
            }else{
                const msgs = result.msg.split("|");
                setAlert({...alert, msgTitle:msgs[0], msg:msgs[1], type:'error', show:true});
                
                const domain = form?.userName?.split("@")[0]?.toLowerCase();
                postActivity({userId:form?.userName, firstname:form?.userName, lastname:'', email:form?.email, companyId:domain}, activities.LOGIN_ATTEMPT, "User login attempted")
                setLoadingBtn({loading:false});
            }
        }
    }else{
        if(findUserRes?.msg){
           const res = findUserRes.msg.split("|");
           setAlert({msgTitle:res[0], msg:res[1], type:'error', show:true});
            setLoadingBtn({loading:false});
        }else{
            setAlert({msgTitle:"Login error!", msg:'', type:'error', show:true});
        setLoadingBtn({loading:false});
        }        
    }
}




export function updateEmailConfirmed(user){
    const url = getLinkPostUser();
    const body = {
        "act":"UPDATE",
        "table":"_users_account",
        "fields":["emailConfirmed", "updatedAt"],
        "values":["1".toString(), dateFmtISO()],  ////Enum is stored as a string, hence type of VARCHAR
        "types":["VARCHAR", "VARCHAR"],
        "whereField":"id",
        "whereValue":user?.id, 
        "whereType":"INT"
      };
    return {url, body}
}   



const  loginHandler99 = async (form, setAlert)=>{
    const res = validateInputs(form, "LOGIN");
    if(!res.error){
       const domain = form.userName.split('@')[0].toLowerCase();
       const urlLink = getLinkLogin({domain, form});
       const user = await getRequest(urlLink).then((res)=> res);
       //return console.log(user)
       if(user?.data?.length){
        const match = await bcrypt.compare(form.password, user.data[0].secret);
        if(match){
            if(user.data[0].emailConfirmed == "0"){
                const {url, body } = updateEmailConfirmed(user.data[0]);
                postRequest(url, body)
                .then((res)=> {
                    //setAlert({...alert, msgTitle:'Email confirmed successfully', type:'success', show:true});
                    //setModalAlert({...alert, msgTitle:'Registration successful', msg:'You will now be redirected to the login page. Check your inbox or spam messages for your login details', type:'success', showLoading:true, loadingMsg:'Redirecting, please wait...', show:true});
                    //setModalAlertCall({showModal:'', act:'REGISTER'});
                    //dispatchResetForm();
                    //console.log('emailConfirmed!', res)
                 });
            }
            setAlert({...alert, msgTitle:'Login successful', msg:'', type:'success', show:true});
        }else{
            setAlert({...alert, msgTitle:'Incorrect password!', msg:'Click forgot password if you have forgotten your password', type:'error', show:true});
        }
       }else{
        setAlert({...alert, msgTitle:'Username not found!', msg:'Please contact your Admin if you have forgotten your username or check your mail for your username login if you registered for a DEMO account', type:'error', show:true});
       }
    }else{
        setAlert({...alert, msg:'Please enter your username and password', type:'error', show:true});
    }
}