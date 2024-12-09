import { getRequest } from "@/lib/apiRequest/getRequest";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getLinkFetchTable, getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
import { postRequest } from "@/lib/apiRequest/postRequest";
import { insertQueryCurrencySymbol, updateQueryCurrencySymbol } from "./prepareQuerySettings";



export const handleCurrencySymbolUpdate = async ({user, currencySymbolNew, notify, dispatchRefreshSettingsCount})=>{
    const domain = user.companyId.toLowerCase();

    let act = "";
    let id = "";
    const urlLink = getLinkFetchTable({table:domain+"_settings", domain});
    const dataRes = await getRequest(urlLink).then((res)=> res);
    if(dataRes?.ok){
        const currentSymObj = dataRes.data.find((dt)=> dt.slug === "currency-symbol");
        if(currentSymObj?.smallText){
            act = "UPDATE";
            id = currentSymObj.id;
        }else{
            act = "INSERT";
        } 
    }

    if(act === "INSERT"){
        const {url, body} = insertQueryCurrencySymbol({user, currencySymbol:currencySymbolNew, id});
            await postRequest(url, body).then((res)=> {
                if(res?.ok){
                    notify("success", "Currency symbol updated successfully");
                    dispatchRefreshSettingsCount();
                }else{notify("error", res?.error);}
            })
    }

    if(id && act === "UPDATE"){
        const {url, body} =  updateQueryCurrencySymbol({user, currencySymbol:currencySymbolNew, id})
        await patchRequest(url, body).then((res)=> {
            if(res?.ok){
                notify("success", "Currency symbol updated successfully");
                dispatchRefreshSettingsCount();
            }else{notify("error", res?.error);}
        })
    }
}

