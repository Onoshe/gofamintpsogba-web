import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
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
const url = getLinkPostTrans().post;
const urlPatch = getLinkPostTrans().patch;


export const insertQueryRecon =(form, name, reportSlug) =>{
  const {user, reportDetails, reportKeys, rows} = form;
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
    title+" "+accountTitle+" "+asAt,
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



export const updateQueryRecon =(form, user) =>{
  const {id,
    productName,
    productCode, 
    description,
    category,
    newCategory,
    //inactive,
    createdBy, 
    createdAt, 
    updatedBy 
  } = form;

  const vals = [ 
    productName,
    productCode, 
    description,
    category? category : newCategory,
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
    table:user.companyId+"_reconciliation",
    fields:fieldsArr,
    values :vals,
    types:typesArr
  };

  return {body, url:urlPatch}
}   