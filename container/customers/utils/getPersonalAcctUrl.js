const { getLinkFetchTable } = require("@/lib/apiRequest/urlLinks");

export const getPersonalAcctUrl =(user, acct)=>{
    return getLinkFetchTable({table:user.companyId+'_'+acct});
}