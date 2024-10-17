const { getRequest } = require("@/lib/apiRequest/getRequest");
const { getLinkFetchTableWithConds, getLinkAffectedTrans } = require("@/lib/apiRequest/urlLinks");



export const handleDeleteAccountOrTrans = async ({user, t, c})=>{
    const url = getLinkAffectedTrans({domain:user.companyId, t, c});
    const fetchedData = await getRequest(url);
    console.log(fetchedData, url)
}