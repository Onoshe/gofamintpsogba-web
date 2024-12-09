import { getLinkPostAndRetrieve, getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
import { dateFmtISO } from "@/lib/date/dateFormats";


const postFields = [
    "name",
    "description",
    "slug",
    "largeText",
    "createdBy",
    "createdAt"
];





export function prepareQuerySettings({user, postFields, postValues}) {
    const postFieldsFmt = [...postFields, "createdBy", "createdAt"];
    const postValuesFmt = [...postValues,  user.userId, dateFmtISO()];
    const url =  getLinkPostAndRetrieve(user.companyId);
    const postTypes = postFieldsFmt.map((dt)=> "VARCHAR");
    
    let body = {
        act:"INSERT",
        table:user.companyId+"_settings",
        fields:postFieldsFmt,
        values:[postValuesFmt],
        types:postTypes
    }
    return {body, url}
}

export function updateQuerySettings({user, postFields, postValues, id}) {
    const postFieldsFmt = [...postFields, "createdBy", "createdAt"];
    const postValuesFmt = [...postValues,  user.userId, dateFmtISO()];
    const url = getLinkPostTrans(user.companyId).patch;
    const postTypes = postFieldsFmt.map((dt)=> "VARCHAR");
    
    let body = {
        act: "UPDATE",
        whereField:"id",
        whereValue:id,
        whereType: "INT",
        table:user.companyId+"_settings",
        fields:postFieldsFmt,
        values :postValuesFmt,
        types:postTypes
      };
    return {body, url}
}


/**************   CURRENCY SYMBOL ************ */
export function insertQueryCurrencySymbol({user, currencySymbol}) {
    const postFieldsFmt = ["name", "description", "slug", "smallText", "createdBy", "createdAt"];
    const postValuesFmt = ["Currency Symbol", "Currency Symbol to be displayed on report. Default if not set is $",  
            "currency-symbol", currencySymbol,  user.userId, dateFmtISO()];
    const url =  getLinkPostAndRetrieve(user.companyId);
    const postTypes = postFieldsFmt.map((dt)=> "VARCHAR");
    
    let body = {
        act:"INSERT",
        table:user.companyId+"_settings",
        fields:postFieldsFmt,
        values:[postValuesFmt],
        types:postTypes
    }
    return {body, url}
}

export function updateQueryCurrencySymbol({user, currencySymbol, id}) {
    const postFieldsFmt = ["smallText", "createdBy", "createdAt"];
    const postValuesFmt = [currencySymbol,  user.userId, dateFmtISO()];
    const url = getLinkPostTrans(user.companyId).patch;
    const postTypes = postFieldsFmt.map((dt)=> "VARCHAR");
    
    let body = {
        act: "UPDATE",
        whereField:"id",
        whereValue:id,
        whereType: "INT",
        table:user.companyId+"_settings",
        fields:postFieldsFmt,
        values :postValuesFmt,
        types:postTypes
      };
    return {body, url}
}

