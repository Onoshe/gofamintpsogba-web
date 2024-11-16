import { getLinkClientServer, getLinkPostAccess, getLinkPostClient, getLinkPostTrans, getLinkPostUser, getLinkUsersAccount } from "@/lib/apiRequest/urlLinks";
import { dateFmtISO } from "@/lib/date/dateFormats";
import * as bcrypt from "bcryptjs";


export function fetchQuery(form){
    const domain = form.userName.split('@')[0].toLowerCase();
    const url = getLinkUsersAccount(domain);
    const body = {
        "act":"QUERY",
        "table":"users_account",
        "queryType":"FETCH",
        "query":`SELECT firstname, lastname FROM users_account WHERE userId ='${form.userName}' AND email ='${form.email}'`,
      };
    return {url, body}
}
 

async function createAccessQuery(form){
  const url = getLinkPostAccess();
  const pwdHarshed =  await bcrypt.hash(form.column1, 10);
  const {name, description, slug} = form;
  
  let fields = ["name", "description","slug","column1", "updatedAt", "createdAt"];
  let values = [[name, description, slug, pwdHarshed, dateFmtISO(), dateFmtISO()]];
  let types = ["VARCHAR", "VARCHAR", "VARCHAR","VARCHAR","VARCHAR","VARCHAR", "VARCHAR"];
  
  const body = {
      "act":"INSERT",
      "table":"_access",
      fields:[...fields, "column2"],
      values:[[...values[0], form.column2]],
      types:[...types, 'VARCHAR']
    };
    
  return {url, body}
}  


async function updateAccessQuery(form){
  const url = getLinkPostAccess();
  const pwdHarshed =  await bcrypt.hash(form.newAccess, 10);
  
  let fields = ["column1", "updatedAt"];
  let values = [pwdHarshed, dateFmtISO()];
  let types = ["VARCHAR", "VARCHAR"];
  
  const body = {
      "act":"UPDATE",
      "table":"_access",
      fields,
      values,
      types,
      whereField:'slug',
      whereValue:form.slug,
      whereType:'VARCHAR'
    };
    
  return {url, body}
}  


const manageClientQuery =(form, isClient, type) =>{
    const url =  getLinkClientServer(form?.domain)[type? type : 'server']; //type = server || dev
    
    let body = {
      "db":form.db,
      "act":form.actType,
      "domain":form?.domain,
    };
    const returnBody = isClient === 'ISCLIENT'? {...body, "clientId":form.clientId,} : {...body, "tables":form?.tables,};

    return {url, body:returnBody}
}   

const createClientQuery =(form, act) =>{
  const {companyName, companyDomain, address, email, contactPersonFirstName, contactPersonLastName, contactPersonPhoneNo,
          contactPersonTitle, businessType, packagePlan, } = form;
  const companyDomainStr = companyDomain.trim().toLowerCase();
  const urlClt = getLinkClientServer(companyDomainStr).server;
  const url = getLinkPostClient(companyDomainStr);
  let body = {
    act:act? act : "INSERT",
    table:'_clients',
    domain:companyDomainStr,
    fields:[
      "companyName", 
      "companyDomain",
      "inactive", 
      "address", 
      "email", 
      "contactPersonFirstName",
      "contactPersonLastName",  
      "contactPersonPhoneNo", 
      "contactPersonTitle", 
      "businessType", 
      "packagePlan",
      "yearEnd",
      "registeredDate",   
      "updatedAt", 
      "createdAt", 
      "description"
    ],
    values :[[
      companyName, 
      companyDomainStr,
      '1', 
      address, 
      email, 
      contactPersonFirstName, 
      contactPersonLastName,
      contactPersonPhoneNo, 
      contactPersonTitle,
      businessType, 
      packagePlan, 
      "31-December", 
      dateFmtISO(),  
      dateFmtISO(), 
      dateFmtISO(), 
      form?.description || 'NULL', 
      ]],
    types:[
      "VARCHAR",
      "VARCHAR",
      "INT",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR"
    ]
  };
  return {body, url:act? urlClt : url}
}


export const createClientAccountQuery =(form, act) =>{
  const {companyName, companyDomain, address, email, contactPersonFirstName, contactPersonLastName, contactPersonPhoneNo,
          contactPersonTitle, businessType, packagePlan, } = form;
  const companyDomainStr = companyDomain.trim().toLowerCase();
  const url = getLinkPostTrans(companyDomainStr);
  let body = {
    act:act,
    table:'_clients',
    domain:companyDomainStr,
    fields:[
      "companyName", 
      "companyDomain",
      "inactive", 
      "address", 
      "email", 
      "contactPersonFirstName",
      "contactPersonLastName",  
      "contactPersonPhoneNo", 
      "contactPersonTitle", 
      "businessType", 
      "packagePlan",
      "yearEnd",
      "registeredDate",   
      "updatedAt", 
      "createdAt", 
      "description"
    ],
    values :[[
      companyName, 
      companyDomainStr.toUpperCase(),
      '1', 
      address, 
      email, 
      contactPersonFirstName, 
      contactPersonLastName,
      contactPersonPhoneNo, 
      contactPersonTitle,
      businessType, 
      packagePlan, 
      "31-December", 
      dateFmtISO(),  
      dateFmtISO(), 
      dateFmtISO(), 
      form?.description || 'NULL', 
      ]],
    types:[
      "VARCHAR",
      "VARCHAR",
      "INT",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR"
    ]
  };
  return {body, url:url.post}
}


const createUserQuery = async (form) =>{
  const {firstname, lastname, email, domain, companyId, role, inactive} = form;
  const pwdHarshed =  await bcrypt.hash(form.password, 10);
  const url = getLinkPostClient(domain);

  let userId = `${form.firstname}.${form.lastname}`.toLowerCase();
    userId = `${form.domain.toUpperCase()}@${userId}`;

  //Minimum fields
  let body = {
    act:"INSERT",
    table:domain.toLowerCase()+'_usersaccount',
    fields:[
      "companyId",
      "firstname", 
      "lastname",
      "email", 
      "userId",
      "companyDomain", 
      "secret",
      "role",
      "inactive",
      "createdAt",
      "updatedAt"
    ],
    values :[[
      companyId,
      firstname, 
      lastname, 
      email,
      userId,
      domain.toLowerCase(), 
      pwdHarshed,
      role,
      inactive,
      dateFmtISO(),  
      dateFmtISO()]],
    types:[
      "INT",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR",
      "VARCHAR"
    ]
  };
  return {body, url, userId}
}   

export {manageClientQuery, createClientQuery, createAccessQuery, createUserQuery, updateAccessQuery}
//tables = ["COASTRUCTUE", "CHARTOFACCOUNT", "PRODUCTS", "CUSTOMERS", "VENDORS", "TRANSACTIONS"]
