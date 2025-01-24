const authToken = process.env.NEXT_PUBLIC_DBTOKEN;
import { getLinkPost, getUploadLink } from '@/lib/apis/urlLinks';
import { postRequest} from '@/lib/apis/postRequest';


const url = getUploadLink();

export const postUploadedResources = async (files, formValues,  setFileUploading) => {
          const formData = new FormData();
          const contentType = 'multipart/form-data';
        let result = {};

          for (let index = 0; index < files.length; index++) {
            const file = files[index];

            const {newName, fileName, fileExt} = fileDetails(file)
            formData.append('file',  file);
            formData.append('newName',  newName);
            formData.append('act',  "FILE_UPLOAD");
            setFileUploading("Uploading file: "+fileName);
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                'Content-Type': contentType,
                'Authorization': `Bearer ${authToken}`
                });
            const res = await response.json();
            if(res?.ok){
             setFileUploading("Inserting file data: "+fileName);
             result =   await publishResources(formValues, newName, fileExt);
            //console.log(result);
                if(!result.ok){
                    return result;
                }
            }else{
                return res;
            }  
          }
          return result;
}

function fileDetails(file) {
    // Remove the extension
    let nameWithoutExtension = file?.name?.substring(0, file?.name?.lastIndexOf(".")) || file;

    // Remove special characters and replace spaces with underscores
    let sanitizedName = nameWithoutExtension
        .replace(/[\'\"\:;|,.\?\*<>-]/g, "") // Remove special characters
        .replace(/\s+/g, "_");           // Replace spaces with underscores

    const fileName = file.name;
    const fileExt = file.name.split('.').pop();
    return {fileName, newName: sanitizedName, fileExt}
}


const resourcesFields = [
    "materialTopic",
    "materialDate",
    "description",
    "docType",
    "slug",
    "createdAt"
];
const resourcesTypes = [
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR"
];


export async function publishResources(form, slug, fileExt){
    const url = getLinkPost();
    const dateISO = new Date().toISOString();

    if(form && slug){
        const {date, description, documenttype,topic} = form;
        
        const post = [
            topic,
            date,
            description,
            fileExt,
            slug,
            dateISO
        ];
        
        let body = {
            act:"INSERT",
            table:"official_site_resources",
            fields:resourcesFields,
            values:[post],
            types:resourcesTypes
        }
       return await postRequest(url, body);
    }
}

