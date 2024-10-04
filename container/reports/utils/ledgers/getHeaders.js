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
}


export const getHeadersTitle = (keys, report)=>{
   
   return keys?.map((key)=>{
       return {name:key, title:keysList[key]?.title || capitalizeFirstChar(key), }
    })
} 