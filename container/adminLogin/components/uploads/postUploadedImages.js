const authToken = process.env.NEXT_PUBLIC_DBTOKEN;
import { getLinkPost, getUploadLink } from '@/lib/apis/urlLinks';
import { postRequest} from '@/lib/apis/postRequest';


const url = getUploadLink();

export const postUploadedImages = async (files, formValues, setFileUploading) => {
          const formData = new FormData();
          const contentType = 'multipart/form-data';
          let result = {};
          const subDir = formValues.directory;
          let newName = formValues.imagename;
          
          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            newName =files?.length > 1? `${newName}-${index}` : newName;
            const {fileName, fileExt} = fileDetails(file)
            formData.append('image',  file);
            formData.append('newName',  newName);
            formData.append('act',  "IMAGE_UPLOAD");
            formData.append('subDir',  subDir);
            setFileUploading("Uploading image: "+newName);
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                'Content-Type': contentType,
                'Authorization': `Bearer ${authToken}`
                });
            const res = await response.json();
            //console.log(res);
            if(res?.ok){
             setFileUploading("Inserting image data: "+newName);
             result =   await publishPhotos(formValues, newName, fileExt);
             //console.log(result);
             if(!result.ok){
                return result;
             }
            }else{
                return res;
            }
            //Reset newName
            newName = formValues.imagename;  
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


const fields = [
    "name",
    "imgPath",
    "note",     //date
    "note2",    //color
    "details",
    "extention",
    "imgGroup",
    "folder",
    "createdAt"
];
const types = [
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR"
];


export async function publishPhotos(form, slug, fileExt){
    const url = getLinkPost();
    const dateISO = new Date().toISOString();
    const rootDir = "official_website/";

    if(form && slug){
        const {date, event, description, directory} = form;
        
        const post = [
            slug,
            rootDir+form.directory+slug+'.'+fileExt,
            date,
            form?.color || 'dodgerblue',
            description,
            fileExt,
            event,
            directory,
            dateISO
        ];
        
        let body = {
            act:"INSERT",
            table:form?.image_table === "MEDIAPAGE"? "official_site_media_page" : "official_site_images",
            fields,
            values:[post],
            types
        }
        //return {body, ok:true};
       return await postRequest(url, body);
    }
}

