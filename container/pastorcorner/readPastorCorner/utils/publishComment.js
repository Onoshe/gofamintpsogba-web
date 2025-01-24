import { postRequest } from "@/lib/apis/postRequest";
import { getLinkPost } from "@/lib/apis/urlLinks";


const commentFields = [
    "messageId",
    "name",
    "email",
    "phoneNo",
    "note",
    "comment",
    "date",
    //"note",
    //"info",
    //"createdBy",
    "createdAt"
];
const commentFieldsTypes = [
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR"
];


export async function publishComment(form, pstMsg){
    const url = getLinkPost();
    const dateGMT = new Date().toUTCString();
    const dateISO = new Date().toISOString();

    if(form.user && form.message && form.email && form.phoneNo && pstMsg.id){
        const {user, message, email, phoneNo, postDate} = form;
        const {id} = pstMsg;
        
        const post = [
            String(id),
            user,
            email,
            phoneNo,
            pstMsg?.title?.toString(),
            message,
            postDate,
            dateISO
        ];
        
        let body = {
            act:"INSERT",
            table:"official_site_comments",
            fields:commentFields,
            values:[post],
            types:commentFieldsTypes
        }
       return await postRequest(url, body);
    }
}


