import { postRequest } from "@/lib/apiRequest/postRequest";
import { postQuery } from "./requests";
import { validateInputs } from "./validateInputs";
import { getRequest } from "@/lib/apiRequest/getRequest";
import { getLinkUserData } from "@/lib/apiRequest/urlLinks";



//Register a demo account only.
//User registration will be done by the client Admin 
const  registerHandler = async (form, dispatchResetForm, alert, setAlert, setModalAlert, setModalAlertCall)=>{
    const res = validateInputs(form, "REGISTER");
    if(!res.error){
        if(form.confirmPassword === form.password){
            const domain = "demo";
            const {userLink, clientLink} = getLinkUserData({form, domain});
            //return console.log(userLink, clientLink)
            const user = await getRequest(userLink).then((res)=> res);
            const client = await getRequest(clientLink).then((res)=> res);
            
            if(user?.data?.length){
                setAlert({...alert, msgTitle:'Email already exist!', msg:'Login with your login details', type:'error', show:true});
            }else{
                if(client?.data?.length){
                    await postQuery(form, client.data[0])
                    .then(({url, body})=>{postRequest(url, body)
                    .then((res)=> {
                        //setAlert({...alert, msgTitle:'Account created successfully', type:'success', show:true});
                        setModalAlert({...alert, msgTitle:'Registration successful', msg:'You will now be redirected to the login page. Check your inbox or spam messages for your login details', type:'success', showLoading:true, loadingMsg:'Redirecting, please wait...', show:true});
                        setModalAlertCall({showModal:'', act:'REGISTER'});
                        dispatchResetForm();
                  });
                })
              }else{ setAlert({...alert, msg:'Client not found!', type:'error', show:true});}
               
            }
        }else{
            setAlert({...alert, msg:'Your password does not match. Please check', type:'error', show:true});
        }
    }else{
        setAlert({...alert, msg:'Please enter all the fields', type:'error', show:true});
    }
}


export {registerHandler};