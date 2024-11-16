const { getLinkFetchTable } = require("@/lib/apiRequest/urlLinks");

export const getPersonalAcctUrl =(user, acct)=>{
    const domain = user.companyId.toLowerCase();
    return getLinkFetchTable({table:user.companyId+'_'+acct, domain});
}