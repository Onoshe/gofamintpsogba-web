import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
import { dateFmtISO } from "@/lib/date/dateFormats";


const fieldsArr =[
  `productName`, 
  `productCode`,  
  `description`,
  `category`,
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
  //"INT",
  //"INT",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR"
];



export const productInsertQuery =(form, user) =>{
  const url = getLinkPostTrans(user.companyId).post;
  const {
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
    act: "INSERT",
    table:user.companyId+"_products",
    fields:fieldsArr,
    values : [vals],
    types:typesArr
  };

  return {body, url}
}   



export const productUpdateQuery =(form, user) =>{
  const urlPatch = getLinkPostTrans(user.companyId).patch;

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
    table:user.companyId+"_products",
    fields:fieldsArr,
    values :vals,
    types:typesArr
  };

  return {body, url:urlPatch}
}   