import { getRequest } from "@/lib/apiRequest/getRequest";

const { getLinkFetchTableWithConds } = require("@/lib/apiRequest/urlLinks");


export const getUserRegDate = async ({user, secDate})=>{
  let result = secDate;
  const domain = user?.companyId?.split('@')[0]?.toLowerCase();
  const userLink = getLinkFetchTableWithConds({table:domain+'_usersaccount', conds:'userId', values:user?.userId+'&s=createdAt,updatedAt'});
  const res = await getRequest(userLink);
  if(res?.ok && res?.data?.length){
    result = res.data[0].createdAt;
  }
  return result
}