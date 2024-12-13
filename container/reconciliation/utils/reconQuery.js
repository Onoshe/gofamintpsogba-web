import { getLinkDeleteTran, getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
import { dateFmtISO } from "@/lib/date/dateFormats";


const fieldsArr =[   
  `name`,
  `slug`,
  `description`,
  `reconDate`,
  `text1`,
  //`inactive`,
  //`deleted`,
  `createdBy`, 
  `updatedBy`, 
  `createdAt`, 
  `updatedAt`
];
const typesArr = [
  "VARCHAR",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR",
  "TEXT",
  //"INT",
  //"INT",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR"
];



export const insertQueryRecon =(form, name, reportSlug) =>{
  const {user, reportDetails, reportKeys, rows} = form;
  const url = getLinkPostTrans(user.companyId).post;
  const {
    accountTitle,
    asAt, 
    companyName,
    ledgerCode,
    title
  } = reportDetails;
  
  const reportStr = JSON.stringify({reportDetails, reportKeys, rows});
  const vals = [ 
    name,
    reportSlug, 
    title+" "+accountTitle+" as at "+asAt,
    new Date().toISOString().split("T")[0],
    reportStr,

    user.userId, 
    user.userId,
    dateFmtISO(),  
    dateFmtISO()];

  let body = {
    act: "INSERT",
    table:user.companyId+"_reconciliation",
    fields:fieldsArr,
    values : [vals],
    types:typesArr
  };

  return {body, url}
}   



export const updateQueryRecon =(form, fetchedForm) =>{
  const urlPatch = getLinkPostTrans(form.user.companyId).patch;

  const {
    user, reportDetails, reportKeys, rows
  } = form;

  const reportStr = JSON.stringify({reportDetails, reportKeys, rows});
  const vals = [ 
    "Updated report by "+user.userId+ " on "+dateFmtISO(),
    new Date().toISOString().split("T")[0],
    reportStr,
    user.userId, 
    dateFmtISO()];
    
  let body = {
    act: "UPDATE",
    whereField:"id",
    whereValue:fetchedForm.id,
    whereType: "INT",
    table:user.companyId+"_reconciliation",
    fields:[`description`,  `reconDate`, `text1`, `updatedBy`, `updatedAt`],
    values :vals,
    types:[ "VARCHAR", "VARCHAR", "TEXT", "VARCHAR", "VARCHAR"]
  };

  return {body, url:urlPatch}
}   

export const deleteQueryRecon =(fetchedForm, user) =>{
  const urlDelete = getLinkDeleteTran(user.companyId);
    
  let body = {
    act: "DELETE",
    whereField:"id",
    whereValue:fetchedForm.id,
    whereType: "INT",
    table:user.companyId+"_reconciliation",
  };

  return {body, url:urlDelete}
}

