// if(!form.firstname || !form.lastname || !form.email || !form.password || !form.confirmPassword){

function validateInputs(form, type){
    const res = {error:false, invalidField:''};

    if(type === "LOGIN"){
        if(!form?.userName){
            res.invalidField = 'userName';
            res.error = true
        }
        if(!form?.password){
            res.invalidField = 'password';
            res.error = true
        }
    }else if(type === "REGISTER"){
        if(!form.firstname || !form.lastname || !form.email || !form.password || !form.confirmPassword){
            res.invalidField = '';
            res.error = true
        }
    }else if(type === "FORGORPWD"){
        if(!form?.userName || !form?.email){
            res.invalidField = '';
            res.error = true
        }
    }else if(type === "RESETPWD"){
        if(!form?.password || !form?.otp){
            res.invalidField = '';
            res.error = true
        }
    }
    return res
}


export {validateInputs}