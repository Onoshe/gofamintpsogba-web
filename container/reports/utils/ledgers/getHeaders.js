import { capitalizeFirstChar } from "@/lib/capitalize/capitalizeString"

export const keysList = {
    date:{name:'date', title:'Date', },
    transactionDate:{name:'transactionDate', title:'Transaction Date'},
    description:{name:'description', title:'Description'},
    transactionNo:{name:'transactionNo', title:'Transaction No'},
    documentNo:{name:'documentNo', title:'Document No'},
    reference:{name:'reference', title:'Transaction Ref' },
    amount:{name:'amount', title:'Amount'},
    debit:{name:'debit', title:'Debit'},
    credit:{name:'credit', title:'Credit'},
    name:{name:'name', title:'Name'},
    balance:{name:'balance', title:'Balance'},
    accountCode:{name:'accountCode', title:'Account Code'},
    accountCodeSub:{name:'accountCodeSub', title:'Personal Account'},
    quantity:{name:'quantity', title:'Quantity'},
    quantBalance:{name:'quantBalance', title:'Product balance'},
    postingPlat:{name:'postingPlat', title:'Type'},
    accountCodeDr:{name:'accountCodeDr', title:'Debit Acct Code'},
    accountCodeCr:{name:'accountCodeCr', title:'Credit Acct Code'},
    accountNameDr:{name:'accountNameDr', title:'Debit Acct Name'},
    accountNameCr:{name:'accountNameCr', title:'Credit Acct Name'},
    offsetAccountCode:{name:'offsetAccountCode', title:'Offset Accct Code'},
    offsetAccountName:{name:'offsetAccountName', title:'Offset Accct Name'},
    debitAccount:{name:'debitAccount', title:'Debit Account'},
    creditAccount:{name:'creditAccount', title:'Credit Account'},
    accountGroup:{name:'accountGroup', title:'Group'},
    lastname:{name:'lastname', title:'Last Name'},
    firstname:{name:'firstname', title:'First Name'},
    othernames:{name:'othernames', title:'Other Names'},
    phoneNo:{name:'phoneNo', title:'Phone Number'},
    formNo:{name:'formNo', title:'Form No'},
    companyName:{name:'companyName', title:'Company Name'},
    companyPhoneNo:{name:'companyPhoneNo', title:'Company Contact'},
    companyAddress:{name:'companyAddress', title:'Company Address'},
    companyEmail:{name:'companyEmail', title:'Company Email'},
    registeredDate:{name:'registeredDate', title:'Registered Date'},
    accountSub:{name:'accountSub', title:'Sub Account'},
    postedBy:{name:'postedBy', title:'Posted by'},
    postedDate:{name:'postedDate', title:'Posetd date'},
    createdBy:{name:'createdBy', title:'Created by'},
    createDate:{name:'createdDate', title:'Created date'},
    createAt:{name:'createdAt', title:'Created date'},
    entryType:{name:'entryType', title:'Entry'},

    businessType:{name:'businessType', title:'Business Type'},
    country:{name:'country', title:'Country'},
    dob:{name:'dob', title:'Birthday'},
    info:{name:'info', title:'More Information'},
    nextContactPersonName:{name:'nextContactPersonName', title:'Next Contact PersonName'},
    nextContactPersonEmail:{name:'nextContactPersonEmail', title:'NextContact Person Email'},
    nextContactPersonPhoneNo:{name:'nextContactPersonPhoneNo', title:'NextContact Person Phone No'},
    residentialAddress:{name:'Residential Address', title:'Residential Address'},
    region:{name:'region', title:'Region'},
    state:{name:'state', title:'State'},
    title:{name:'title', title:'Title'},
    zip:{name:'zip', title:'Zip Code'},
    type:{name:'type', title:'Type'},
    position:{name:'position', title:'Position'},
    sn:{name:'sn', title:'SN'},

    acctType:{name:'acctType', title:'Group'},
}


export const getHeadersTitle = (keys, report)=>{
   
   return keys?.map((key)=>{
       return {name:key, title:keysList[key]?.title || formatLabel(key), }
    })
} 


export function formatLabel(label) {
    return label
        // Insert a space before each capital letter (that is not at the start)
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // Capitalize the first letter of the entire string
        .replace(/^./, str => str.toUpperCase());
  }
  