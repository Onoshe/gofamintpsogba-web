import { postRequest } from "@/lib/apiRequest/postRequest";
import { postQuery } from "./requests";
import { validateInputs } from "./validateInputs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { getLinkClientServer, getLinkUserData, isProduction } from "@/lib/apiRequest/urlLinks";
import getRegisterUserEmailBody from "@/components/htmlEmail/registerUserEmail";
import { generatePassword } from "@/lib/generator";


export const platformDomain = 'https://quick-records.vercel.app/login'; //isProduction? 'https://quick-records.vercel.app/login':"http://localhost:3000/login";

//Register a demo account only.
//User registration will be done by the client Admin 

const  registerHandler = async (form, dispatchResetForm, alert, setAlert, setModalAlert, setModalAlertCall)=>{
    const password = generatePassword(7);
    form.password = password;
    form.confirmPassword = password;

    const res = validateInputs(form, "REGISTER");
    
    if(!res.error){
        if(form.confirmPassword === form.password){
            const domain = "demo";
            setModalAlert({...alert, showLoading:true, loadingMsg:'Loading, please wait...', show:true});
            const {verifyEmailLink, clientLink} = getLinkUserData({form, domain});
            const user = await getRequest(verifyEmailLink).then((res)=> res);
            const client = await getRequest(clientLink).then((res)=> res);
            if(user?.data?.length){
                setModalAlert({...alert, showLoading:false, loadingMsg:'', show:false});
                setAlert({...alert, msgTitle:'Email already exist!', msg:'Login with your login details', type:'error', show:true});
            }else{
                if(client?.data?.length){
                  const {url, body, loginDetails}=  await postQuery(form, client.data[0], domain);
                  setModalAlert({...alert, showLoading:true, loadingMsg:'Sending mail, please wait...', show:true});

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

                  const res = await postRequest(url, body);
                  if(res.ok){
                    await postRequest(sendMailLink, mailBody)
                    .then(()=>{
                        setModalAlert({...alert, msgTitle:'Registration successful', msg:'You will now be redirected to the login page. Check your inbox or spam messages for your login details', type:'success', showLoading:true, loadingMsg:'Redirecting, please wait...', show:true});
                        setModalAlertCall({showModal:'', act:'REGISTER'});
                        dispatchResetForm();
                    })
                  }else{
                    setModalAlert({...alert, showLoading:false, loadingMsg:'', show:false});
                    setModalAlert({...alert, msgTitle:'Registration error!', msg:'Please, try again', type:'error', show:true});
                  }
                 
              }else{ 
                setModalAlert({...alert, showLoading:false, loadingMsg:'', show:false});
                setAlert({...alert, msg:'Client not found!', type:'error', show:true});}
               
            }
        }else{
            setAlert({...alert, msg:'Your password does not match. Please check', type:'error', show:true});
        }
    }else{
        setAlert({...alert, msg:'Please enter all the fields', type:'error', show:true});
    }
}


export {registerHandler};