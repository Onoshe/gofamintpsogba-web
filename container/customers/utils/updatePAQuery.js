import { dateFmtISO } from "@/lib/date/dateFormats";
import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";


export const updatePAQuery =(form, user, personalAcct) =>{
  const url = getLinkPostTrans(user.companyId).patch;
  const {id, 
    type, 
    title, 
    accountCode,
    firstname, 
    lastname, 
    othernames, 
    dob, 
    email, 
    phoneNo, 
    residentialAddress, 
    formNo, 
    position, 
    occupation,
    nextContactPersonName, 
    nextContactPersonPhoneNo, 
    nextContactPersonEmail, 
    companyName, 
    companyEmail, 
    companyPhoneNo, 
    companyAddress, 
    businessType, 
    region, 
    country, 
    state, 
    zip, 
    info, 
    updatedBy, } = form;


    let accountCodeNew = personalAcct==="vendors"? "V-"+parseInt(accountCode).toString().padStart(6,0) : "C-"+parseInt(accountCode).toString().padStart(6,0);
    let accountCodePaded = accountCode.toString().includes("V") || accountCode.toString().includes("C")? accountCode : accountCodeNew; 

  const fields = [
    `type`, 
    `title`, 
    `accountCode`, 
    `firstname`, 
    `lastname`, 
    `othernames`, 
    `dob`, 
    `email`, 
    `phoneNo`, 
    `residentialAddress`, 
    `formNo`, 
    `position`, 
    `occupation`, 
    `nextContactPersonName`, 
    `nextContactPersonPhoneNo`, 
    `nextContactPersonEmail`, 
    `companyName`, 
    `companyEmail`, 
    `companyPhoneNo`, 
    `companyAddress`, 
    `businessType`, 
    `region`, 
    `country`, 
    `state`, 
    `zip`,  
    `info`,
    `accountGroup`,
    `registeredDate`, 
    `updatedBy`, 
    `updatedAt`
  ];
  let body = {
    "act":"UPDATE",
      whereField:'id',
      whereValue:id,
      whereType:'INT',
    table:user.companyId+"_"+personalAcct,
    fields,
    values :[
        type, 
        title, 
        accountCodePaded, 
        firstname, 
        lastname, 
        othernames, 
        dob, 
        email, 
        phoneNo, 
        residentialAddress, 
        formNo, 
        position,
        occupation, 
        nextContactPersonName, 
        nextContactPersonPhoneNo, 
        nextContactPersonEmail, 
        companyName, 
        companyEmail, 
        companyPhoneNo, 
        companyAddress, 
        businessType, 
        region, 
        country, 
        state, 
        zip, 
        info,
        form?.accountGroup? form?.accountGroup.toUpperCase() : "GENERAL", 
        dateFmtISO(), 
        updatedBy || user.userId,
        dateFmtISO()],
    types: [...fields].fill("VARCHAR")
  };
  return {body, url}
}   

