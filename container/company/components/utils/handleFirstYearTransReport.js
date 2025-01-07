import { getRequest } from "@/lib/apiRequest/getRequest";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getLinkFetchTable, getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { insertFisrtYearTransReport, updateFisrtYearTransReport, } from "./prepareQuerySettings";



export const handleFirstYearTransReport = async ({user, firstYearTransRecord, notify, dispatchRefreshSettingsCount, slug})=>{
    const domain = user.companyId.toLowerCase();


    let act = "";
    let id = "";
    const urlLink = getLinkFetchTable({table:domain+"_settings", domain});
    const dataRes = await getRequest(urlLink).then((res)=> res);
    if(dataRes?.ok){
        const currentSymObj = dataRes.data.find((dt)=> dt.slug === slug);
        if(currentSymObj?.smallText){
            act = "UPDATE";
            id = currentSymObj.id;
        }else{
            act = "INSERT";
        } 
    }

    if(act === "INSERT"){
        const {url, body} = insertFisrtYearTransReport({user, firstYearTransRecord, id});
            await postRequest(url, body).then((res)=> {
                if(res?.ok){
                    notify("success", "First year record updated successfully");
                    dispatchRefreshSettingsCount();
                }else{notify("error", res?.error);}
            })
    }

    if(id && act === "UPDATE"){
        const {url, body} =  updateFisrtYearTransReport({user, firstYearTransRecord, id})
        await patchRequest(url, body).then((res)=> {
            if(res?.ok){
                notify("success", "First year record updated successfully");
                dispatchRefreshSettingsCount();
            }else{notify("error", res?.error);}
        })
    }
}

