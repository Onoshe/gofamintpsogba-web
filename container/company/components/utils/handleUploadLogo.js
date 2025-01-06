import { getRequest } from "@/lib/apiRequest/getRequest";
import { patchRequest } from "@/lib/apiRequest/patchRequest";
import { getLinkFetchTable, getLinkPostTrans, getPostImageLink } from "@/lib/apiRequest/urlLinks";

const { postRequest, postRequestFormData } = require("@/lib/apiRequest/postRequest");
const { prepareQuerySettings, updateQuerySettings } = require("./prepareQuerySettings");


export const handleUploadLogo = async ({base64String, user, notify, handleReset, dispatchRefreshSettingsCount, file})=>{
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
            await patchRequest(url, body)
             .then((res)=> {
                if(res?.ok){
                    notify("success", "Logo successfully updated");
                    dispatchRefreshSettingsCount();
                }else{notify("error", res?.error);}
            })
            .then(()=>{
                handleSaveImage(file, notify, domain);
            })
            .then(()=>{
                handleReset();
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


//----------------------- UPLOAD AS A FIL- urlPath
  
    const handleSaveImage = async (file, notify, domain)=>{
        const postUrl = getPostImageLink();
      //console.log(file)
       try {
        const formData = new FormData();
        formData.append('image', file);
        //let newImageName = userId?.split("@");
        let  newImageName = domain.toUpperCase()+"@LOGO";
          formData.append('newImageName', newImageName);
          formData.append('CLIENTLOGO', 'CLIENTLOGO');
        await postRequestFormData(postUrl, formData)
        .then((res)=>{
            //console.log(res, formData)
          if(res.ok){
            //notify("success", res.msg);
            //handleReset();
          }else{
            notify("error", res.msg || res.error);
          }
        });
  
      } catch (error) {
        notify("error", "Error uploading file");
        console.error('Error uploading file:', error);
      }
  
    };
  
  const handleDeletePhoto = async ()=>{
      try {
        const formData = new FormData();
        const userIdFmt = userId.replace('.', '_');
        formData.append('imageDelete', userIdFmt);
        await postRequestFormData(postUrl, formData)
        .then((res)=>{
          if(res.ok){
            notify("success", res.msg);
            //handleReset();
          }else{
            notify("error", res.msg || res.error);
          }
        });
  
      } catch (error) {
        notify("error", "Error deleting file");
        console.error('Error uploading file:', error);
      }
  }


  //------------------------
