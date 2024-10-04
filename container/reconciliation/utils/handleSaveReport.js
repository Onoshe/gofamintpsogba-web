import { getRequest } from "@/lib/apiRequest/getRequest";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getLinkFetchTable } from "@/lib/apiRequest/urlLinks";
import { insertQueryRecon, updateQueryRecon } from "./reconQuery";
import { getSlug } from "@/lib/string/getSlug";

const { postRequest } = require("@/lib/apiRequest/postRequest");



export const handleSaveReport = async ({form, name, notify, dispatchRefreshSettingsCount})=>{
    const {user} = form;
    const slugName = getSlug(name);
    const updateLink = `${user?.companyId+"_reconciliation"}&c=slug&v=${slugName}`;

    const urlLink = getLinkFetchTable({table:updateLink});
    const dataRes = await getRequest(urlLink).then((res)=> res);
        
    //return console.log(dataRes);
        if(dataRes?.data?.length){ //Update
            const id = dataRes.data[0].id;
             const {url, body} = updateQueryRecon(form, name, slugName);
             return console.log(body);
            await patchRequest(url, body).then((res)=> {
                if(res?.ok){
                    notify("success", "Update successful");
                    dispatchRefreshSettingsCount();
                }else{notify("error", res?.error);}
            })
        }else{ //Fresh Post
            const {url, body} = insertQueryRecon(form, name, slugName);
            await postRequest(url, body).then((res)=> {
                if(res?.ok){
                    notify("success", "Posting successful");
                    dispatchRefreshSettingsCount();
                }else{notify("error", res?.error);}
           })
        }
}