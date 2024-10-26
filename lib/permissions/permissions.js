import { getRequest } from "../apiRequest/getRequest";
import { getLinkFetchTable, getLinkFetchTableWithConds } from "../apiRequest/urlLinks";
import { checkTranLock } from "./checkTranLock";

export const pmsActs = {
    "CREATE_PERSONAL_ACCOUNT":"CREATE_PERSONAL_ACCOUNT",
    "EDIT_PERSONAL_ACCOUNT":"EDIT_PERSONAL_ACCOUNT",
    "CREATE_COA":"CREATE_COA",
    "EDIT_COA":"EDIT_COA",
    "CREATE_PRODUCT":"CREATE_PRODUCT",
    "EDIT_PRODUCT":"EDIT_PRODUCT",
    "POST_TRAN":"POST_TRAN",
    "EDIT_TRAN":"EDIT_TRAN",
    "POST_JOURNAL":"POST_JOURNAL",
    "EDIT_JOURNAL":"EDIT_JOURNAL",
    "DO_RECON":"DO_RECON",
    "RECON_EDIT":"RECON_EDIT",
}
const PERMIT_ACTS = Object.keys(pmsActs);
const checkPermissions = PERMIT_ACTS.reduce((acts, act)=>{
    return {...acts, [act]: {
                ADMIN:true, ACCOUNTANT:true, VIEWER:false,}
        };
},{}); // = {"CREATE_PERSONAL_ACCOUNT":{ADMIN:true, ACCOUNTANT:true, VIEWER:false}, "EDIT_PERSONAL_ACCOUNT":{ADMIN:true, ACCOUNTANT:true, VIEWER:false}, ...}


const deniedMessages ={
    CREATE_PERSONAL_ACCOUNT:{msg:"You are not authorised to create personal account"},
    EDIT_PERSONAL_ACCOUNT:{msg:"You are not authorised to edit or delete personal account"},
    CREATE_COA:{msg:"You are not authorised to create chart of account"},
    EDIT_COA:{msg:"You are not authorised to edit or delete chart of account"},
    CREATE_PRODUCT:{msg:"You are not authorised to create product account"},
    EDIT_PRODUCT:{msg:"You are not authorised to edit or delete product account"},
    POST_TRAN:{msg:"You are not authorised to record transaction"},
    EDIT_TRAN:{msg:"You are not authorised to edit or delete transaction"},
    POST_JOURNAL:{msg:"You are not authorised to record journal"},
    EDIT_JOURNAL:{msg:"You are not authorised to edit or delete journal"},
    DO_RECON:{msg:"You are not authorised to perform reconciliation"},
    RECON_EDIT:{msg:"You are not authorised to edit or delete reconciliation report"},
}


export const getPermissions = async ({user, act, form})=>{
    let result = {permit:true, access:"", msg:""};

    const companyId = user.companyId;
    const companyIdLC = user.companyId.toLowerCase();
    if(!user?.role) return result;
    let role = user.role;
    role = role.toUpperCase();
    
    //Check posting lock
    const res = await checkTranLock(act, user, form);
    if(!res.permit){
        return res
    }

    if(companyId.toUpperCase() === "DEMO"){
        const recons = ["DO_RECON"];
        const acts = ["EDIT_PERSONAL_ACCOUNT", "EDIT_COA", "EDIT_PRODUCT", "EDIT_TRAN", "EDIT_JOURNAL", "RECON_EDIT"];
        //Demo User can create accounts/transaction but CANNOT EDIT account/transaction NOT created by them.
        if(acts.includes(act)){
            if(form[0].createdBy != user.userId){
                result.permit = false; 
                result.msg = "You can only edit or delete entries created by you.";
            }
        }
    }else{
        const handlePermissionCheck = (act, role, checkPermissions, deniedMessages) => {
            const permit = checkPermissions[act][role];
            return {
              permit,
              access: permit ? null : "Access Denied!",
              msg: permit ? null : deniedMessages[act]['msg'],
            };
          };
          
          PERMIT_ACTS.forEach((actIn) => {
            if (actIn === act) { // or any other condition you want to check
              Object.assign(result, handlePermissionCheck(act, role, checkPermissions, deniedMessages));
            }
          });
    }
    return result
}


//const res = getPermissions({role:"ADMIN", userId:"DEMO@son.ade"}, "EDIT_PERSONAL_ACCOUNT", "kosofe", {createdBy:"DEMO@son.ade"});
//console.log(res)