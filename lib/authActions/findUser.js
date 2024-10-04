// lib/user.js
import bcrypt from 'bcryptjs';
import { validateInputs } from '../validation/validateInput';
import { getRequest } from '../apiRequest/getRequest';
import { updateEmailConfirmed } from '@/container/_home/utils/loginHandler';
import { postRequest } from '../apiRequest/postRequest';
import { getLinkFindUser } from '../apiRequest/urlLinks';


//This is for signIn auth as used in auth.js script. It uses throw new Error
export async function findUser(form) {
    let result = {ok:false};

    const res = validateInputs(form, "LOGIN");
    if(!res.error){
       const domain = form.userName.split('@')[0].toLowerCase();
       const urlLink = getLinkFindUser({domain, form});
      
       const user = await getRequest(urlLink).then((res)=> res);
       //  console.log(user)
       if(!user?.data?.length){
            //throw new Error('Username not found!|Check your mail for your username or contact admin.');
           result =  {ok:false, msg:"Username not found!|Check your mail for your username or contact admin."} 
        }else{
        
            const match = await bcrypt.compare(form.password, user?.data[0]?.secret);
            if(!match){
                result =  {ok:false, msg:"Invalid password!|Click forgot password to reset your password"};
                //throw new Error('Invalid password!|Click forgot password to reset your password');   
            }else{
                if(user.data[0].emailConfirmed == "0"){
                    const {url, body } = updateEmailConfirmed(user.data[0]);
                    await postRequest(url, body)
                }

                // Return user without password field for security reasons
                const { password: _, ...userWithoutPassword } = user.data[0];
                result = userWithoutPassword;
            }
        }
        return result
    }
}



export async function findLoginUser(form) {
    let result = {ok:true, error:'', msg:''};
    
    const res = validateInputs(form, "LOGIN");
    if(!res.error){
       const domain = form.userName.split('@')[0].toLowerCase();
       const urlLink = getLinkFindUser({domain, form});
       //console.log(form, urlLink)
       const user = await getRequest(urlLink).then((res)=> res);
       
       if(!user?.data?.length){
            result.msg = 'Username not found!|Check your mail for your username or contact admin.';
            result.ok = false;
        }else{
            const match = await bcrypt.compare(form.password, user?.data[0]?.secret);
            if(!match){
                result.msg = 'Invalid password!|Click forgot password to reset your password'; 
                result.ok = false;  
            }
            if(user.data[0].emailConfirmed == "0"){
                const {url, body } = updateEmailConfirmed(user.data[0]);
            await postRequest(url, body)
            }
            const { secret:_, ...userWithoutPassword } = user.data[0];
            result = {...result, ...userWithoutPassword}
        }
    }
    return  result;
}