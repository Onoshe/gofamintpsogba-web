import { getRequest } from "../apiRequest/getRequest";
import { getLinkFetchTable } from "../apiRequest/urlLinks";

const lockableActs =  ["POST_TRAN", "EDIT_TRAN", "POST_JOURNAL", "EDIT_JOURNAL"];

async function checkTranLock(act, user, form) {
    const table = user.companyId.toLowerCase()+'_settings';
    let result = {permit:true, access:"", msg:""};
    const domain = user.companyId.toLowerCase();

    if(lockableActs.includes(act)){
        const url = getLinkFetchTable({table, domain});
        const settings = await getRequest(url);
        const settingsData = settings?.data;
        const tranLock = settingsData?.find((dt)=> dt.slug == "transaction-lock-date");
        const postingLock = settingsData?.find((dt)=> dt.slug == "transaction-posting-lock");
        
        
        if(tranLock?.smallText){
            const lockDateVal = new Date(tranLock.smallText).getTime();
            form.forEach(fm => {
                if(fm?.date){
                    const fmDate = new Date(fm.date);
                    const fmDateVal = fmDate.getTime();
                    //console.log([fmDate, lockDateVal], [fm.date, tranLock.smallText], lockDateVal >= fmDate)
                    if(lockDateVal >= fmDateVal){
                        result.permit = false;
                        result.access = "Posting Date Lock";
                        result.msg = "Transaction date, "+fmDate?.toLocaleDateString()+" and earlier dates have been locked for transaction recording or update";
                    }
                }
            });
        }
        if(postingLock?.smallText){
            if(postingLock.smallText === "ON"){
                result.permit = false;
                result.access = "Posting Lock";
                result.msg = "Transaction recording/update has been locked! Please, contact the Admin";
            }
        }
        
    }
    //console.log(result)
    //return {permit:false, msg:'Testing'}
    return result
}



export {checkTranLock}