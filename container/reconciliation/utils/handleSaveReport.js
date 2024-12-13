import { getRequest } from "@/lib/apiRequest/getRequest";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getLinkFetchTable, getLinkFetchTableWithConds } from "@/lib/apiRequest/urlLinks";
import { insertQueryRecon, updateQueryRecon } from "./reconQuery";
import { getSlug } from "@/lib/string/getSlug";

const { postRequest } = require("@/lib/apiRequest/postRequest");



export const handleSaveReport = async ({form, name, notify, dispatchRefreshSettingsCount, REPLACE, setShowConfirm})=>{
    const {user} = form;
    const slugName = getSlug(name);  //Name is the saved name
    const domain = user.companyId.toLowerCase();
    //const updateLink = domain+"_reconciliation&c=slug&v="+slugName;
    

    const urlLink = getLinkFetchTable({table:domain+"_reconciliation",domain});
    const reconReports = await getRequest(urlLink);
    const dataRes = reconReports?.data?.length? 
        reconReports.data.find((dt)=> dt.slug === slugName) : {};
        //console.log(dataRes, form, name, urlLink);
        if(dataRes){ //Update
             //const id = dataRes.data[0].id;
             if(REPLACE){
                const {url, body} = updateQueryRecon(form,  dataRes);
                //return console.log(body, form);
                await patchRequest(url, body).then((res)=> {
                    if(res?.ok){
                        notify("success", "Update successful");
                        dispatchRefreshSettingsCount();
                        setShowConfirm({show:false});
                        return {success:true}
                    }else{notify("error", res?.error); return {success:false}}
                })
             }else{ return {exist:true, msg:"", data:dataRes}}
             
        }else{ //Fresh Post
            const {url, body} = insertQueryRecon(form, name, slugName);
            await postRequest(url, body).then((res)=> {
                if(res?.ok){
                    notify("success", "Posting successful");
                    dispatchRefreshSettingsCount();
                    return {success:true}
                }else{notify("error", res?.error);}
           })
        }
}