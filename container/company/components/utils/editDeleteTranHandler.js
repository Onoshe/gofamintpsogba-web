import { getRequest } from "@/lib/apiRequest/getRequest";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getLinkFetchTable } from "@/lib/apiRequest/urlLinks";

const { postRequest } = require("@/lib/apiRequest/postRequest");
const { prepareQuerySettings, updateQuerySettings } = require("./prepareQuerySettings");


export const editDeleteTranHandler = async ({slugName, postFields, postValues, postDetails, user, notify, dispatchRefreshSettingsCount})=>{
    const updateLink = `${user?.companyId+"_settings"}&c=slug&v=${slugName}`;
    const domain = user.companyId.toLowerCase();

    const urlLink = getLinkFetchTable({table:updateLink, domain});
    const dataRes = await getRequest(urlLink).then((res)=> res);

        if(dataRes?.data?.length){ //Update
            const id = dataRes.data[0].id;
             const {url, body} = updateQuerySettings({user, postFields, postValues, id});
            await patchRequest(url, body).then((res)=> {
                if(res?.ok){
                    notify("success", "Update successful");
                    dispatchRefreshSettingsCount();
                }else{notify("error", res?.error);}
            })
        }else{ //Fresh Post
            const {url, body} = prepareQuerySettings({user, postFields:[...postFields,'name', 'description', 'slug'], postValues:[...postValues, postDetails?.name, postDetails?.description, slugName]});
            await postRequest(url, body).then((res)=> {
                if(res?.ok){
                    notify("success", "Posting successful");
                    dispatchRefreshSettingsCount();
                }else{notify("error", res?.error);}
           })
        }
}