import { getLinkPatchRows, getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
import { dateFmtISO } from "@/lib/date/dateFormats";


export const updatePARowsQuery =(whereVal, user, personalAcct) =>{
  const url =     getLinkPostTrans(user.companyId).patch;
  
  const fields = [
    `deleted`, 
    `updatedBy`, 
    `updatedAt`
  ];
  let body = {
    "act":"UPDATE",
      whereField:"id",
      whereValues:whereVal,
      whereType:"INT",
    table:user.companyId+"_"+personalAcct.toLowerCase(),
    fields,
    values :[
        "1", 
        user.userId,
        dateFmtISO()],
    types: ["INT", "VARCHAR", "VARCHAR"]
  };
  return {body, url}
}   


export const updateTransDetailsQuery =(whereRows, user) =>{
  const url =   getLinkPatchRows(user.companyId);
  
  const fields = [
    `deleted`, 
    `updatedBy`, 
    `updatedAt`
  ];
  let body = {
    "act":"UPDATE",
      whereField:["id"],
      whereValues:whereRows,
      whereType:["INT"],
    table:user.companyId+"_transactionsdetails",
    fields,
    values :[
        "1", 
        user.userId,
        dateFmtISO()],
    types: ["INT", "VARCHAR", "VARCHAR"]
  };
  return {body, url}
}   

