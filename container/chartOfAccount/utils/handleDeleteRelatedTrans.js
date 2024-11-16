import { putRequest } from "@/lib/apiRequest/putRequest";
import { dateFmtISO } from "@/lib/date/dateFormats";

const { getRequest } = require("@/lib/apiRequest/getRequest");
const { getLinkAffectedTrans, getLinkMultiRowsUpdate } = require("@/lib/apiRequest/urlLinks");


/************** UPDATE TRANSACTIONS UPON DELETE ********************
 * t = type (either m- main account or s-subaccount)
 * c = accountCode
 * 
 * On delete of either chartOfAccount or personal account (Customers, Vendors, Products), a check on 
 * whether the accountCode to be deleted has entry in the transactions table. If it does, the transIds are 
 * fetched via the api getRequest(affectedLinkUrl).
 * 
 * If transIds, the transactions are first deleted (disabled) in the transactions table before being 
 * deleted in the particular table (either chartofaccount or personalAccount table).
 * 
 * Note that without deleting the entries of accountCode to be deleted from transactions table,
 * error will occur in the Trial balance. 
 */

export const handleDeleteAffectedTransactions = async ({user, t, c})=>{
    const fetchedData = await getDeleteAffectedTransactions({user, t, c});

    if(fetchedData?.transIds?.length){
        const multiRowsUpdate = getLinkMultiRowsUpdate(user.companyId);
        const body = {
            "act":"PUT",
            "table":user.companyId+"_transactions",
            "fields":["deleted", "updatedBy","updatedAt"],
            "types":["INT", "VARCHAR", "VARCHAR"],
            "values":["1", user.userId, dateFmtISO()],
            "whereList":fetchedData?.transIds //[]
        };
        const updateRes = putRequest(multiRowsUpdate, body);
        return updateRes;
    }else{
        return fetchedData;
    }
}



export const getDeleteAffectedTransactions = async ({user, t, c})=>{
    const affectedLinkUrl = getLinkAffectedTrans({domain:user.companyId, t, c});
    return await getRequest(affectedLinkUrl);
}