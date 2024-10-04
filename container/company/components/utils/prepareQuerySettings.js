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
    const url =  getLinkPostAndRetrieve();
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
    const url = getLinkPostTrans().patch;
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

