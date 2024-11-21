import { getRequest } from "@/lib/apiRequest/getRequest";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getLinkFetchTable, getLinkPostTrans } from "@/lib/apiRequest/urlLinks";

const { postRequest } = require("@/lib/apiRequest/postRequest");
const { prepareQuerySettings, updateQuerySettings } = require("./prepareQuerySettings");


export const handleUploadLogo = async ({base64String, user, notify, handleReset, dispatchRefreshSettingsCount})=>{
    const logoLink = `${user?.companyId+"_settings"}&c=slug&v=company-logo`;
    const domain = user.companyId.toLowerCase();

    const urlLink = getLinkFetchTable({table:logoLink, domain});
    const dataRes = await getRequest(urlLink).then((res)=> res);
    //console.log(dataRes, base64String, user);
    //return
   
    if(base64String?.type === "base64" && base64String?.file){
        const imgBlob = base64String.file;
        const {fileName, fileSize} = base64String; 
        if(dataRes?.data?.length){ //Update
            const postFields = ["smallText", "medText", "largeText"];
            const postValues = [fileSize, fileName, imgBlob];
            const id = dataRes.data[0].id;
             const {url, body} = updateQuerySettings({user, postFields, postValues, id});
            //return  console.log(url, body)
            await patchRequest(url, body).then((res)=> {
                if(res?.ok){
                    notify("success", "Logo successfully updated");
                    handleReset();
                    dispatchRefreshSettingsCount();
                }else{notify("error", res?.error);}
            })
        }else{ //Fresh Post
            const postFields = ["name", "slug", "description", "smallText","medText", "largeText"];
            const postValues = ["Company logo", "company-logo", "Company logo uploaded", fileSize, fileName, imgBlob];
            const {url, body} = prepareQuerySettings({user, postFields, postValues});
            await postRequest(url, body).then((res)=> {
                if(res?.ok){
                    notify("success", "Logo successfully uploaded");
                    handleReset();
                    dispatchRefreshSettingsCount();
                }else{notify("error", res?.error);}
           })
        }
       
    }   
}


export const handleUploadQuickRecordsLogo = async ({base64String, notify, handleReset, dispatchRefreshSettingsCount})=>{
    //const logoLink = `_settings&c=slug&v=quickrecords-logo`;

        //Update
        const url = getLinkPostTrans('demo').patch; 
        const imgBlob = base64String.file;           
        let body = {
            act: "UPDATE",
            whereField:"id",
            whereValue:2,
            whereType: "INT",
            table:"_settings",
            fields: ["largeText1"],
            values:[imgBlob],
            types:["VARCHAR"]
        };
        await patchRequest(url, body).then((res)=> {
            if(res?.ok){
                notify("success", "Quick Records Logo successfully updated");
                handleReset();
                dispatchRefreshSettingsCount();
            }else{notify("error", res?.error);}
        })
}