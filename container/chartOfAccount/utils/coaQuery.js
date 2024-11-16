import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
import { dateFmtISO } from "@/lib/date/dateFormats";


const fieldsArr =[
  `accountName`, 
  `accountCode`,  
  `description`,
  `typeCode`,
  `typeName`,
  `addToDashboard`, 
  `accountType`,
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
  "INT",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR",
  //"INT",
  //"INT",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR"
];

export const coaCreateQuery =(form, user, table) =>{
  const url = getLinkPostTrans(user.companyId).post;
  const {
    accountName,
    accountCode, 
    description,
    typeCode,
    typeName,
    addToDashboard,
    accountType,
    //inactive,
    createdBy, 
    createdAt, 
    updatedBy, 
  } = form;

  const vals = [ 
    accountName,
    accountCode, 
    description,
    typeCode,
    typeName,
    addToDashboard,
    accountType,
    //inactive || '0', //INSERT=> INSERT new Chart of account 
    //deleted || '0', 
    createdBy || user.userId, 
    updatedBy || user.userId,
    createdAt || dateFmtISO(),  
    dateFmtISO()];

  let body = {
    act: "INSERT",
    table:user.companyId+"_"+table,
    fields:fieldsArr,
    values :[vals],
    types:typesArr
  };

  return {body, url}
}   



export const coaUpdateQuery =(form, user, table) =>{
  const url = getLinkPostTrans(user.companyId).patch;
  const {id,
    accountName,
    accountCode, 
    description,
    typeCode,
    typeName,
    addToDashboard,
    accountType,
    //inactive,
    createdBy, 
    createdAt, 
    updatedBy, 
  } = form;

  const vals = [ 
    accountName,
    accountCode, 
    description,
    typeCode,
    typeName,
    addToDashboard,
    accountType,
    //inactive || '0', //INSERT=> INSERT new Chart of account 
    //deleted || '0', 
    createdBy || user.userId, 
    updatedBy || user.userId,
    createdAt || dateFmtISO(),  
    dateFmtISO()];

  let body = {
    act: "UPDATE",
    whereField:"id",
    whereValue:id,
    whereType: "INT",
    table:user.companyId+"_"+table,
    fields:fieldsArr,
    values :vals,
    types:typesArr
  };

  return {body, url}
}   