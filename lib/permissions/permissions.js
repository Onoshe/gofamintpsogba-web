export const pmsActs = {
    "EDIT_PERSONAL_ACCOUNT":"EDIT_PERSONAL_ACCOUNT",    
}


export const getPermissions =({user, act, companyId, form})=>{
    let result = {permit:false, msg:"User Role error!"};
    if(!user?.role) return result;
    let role = user.role;
    role = role.toUpperCase();

    const checkPermissions ={
        EDIT_PERSONAL_ACCOUNT:{
            ADMIN:true, ACCOUNTANT:true, VIEWER:false,
        },
        
    };

    const messages ={
        EDIT_PERSONAL_ACCOUNT:{
            permit:"Granted",
            denied:"You are not authorised to edit personal account",

        },
        
    }


    if(companyId.toUpperCase() === "DEMO"){
        const acts = ["EDIT_PERSONAL_ACCOUNT"];
        if(acts.includes(act)){
            if(form.createdBy === user.userId){
                result.permit = true; result.msg = "Granted";
            }else{result.permit = false; result.msg = "You can only edit entries created by you.";}
        }
    }else{
        switch (act) {
            case "EDIT_PERSONAL_ACCOUNT":
                  const permit = checkPermissions[act][role];
                  result.permit = permit;
                  result.msg = messages[act][permit? 'permit' : 'denied']
                break;
        
            default:
                break;
        }
    }
    return result
}


//const res = getPermissions({role:"ADMIN", userId:"DEMO@son.ade"}, "EDIT_PERSONAL_ACCOUNT", "kosofe", {createdBy:"DEMO@son.ade"});
//console.log(res)