import { getRequest } from "@/lib/apis/getRequest";
import { postRequest } from "@/lib/apis/postRequest";
import { getDataLink, getLinkPost } from "@/lib/apis/urlLinks";


const likeFields = [
    "messageId",
    "email",
    "phoneNo",
    "note",
    "date",
    "slug",
    //"note",
    //"info",
    //"createdBy",
    "createdAt"
];
const likeFieldsTypes = [
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR"
];


export async function publishLike(pstMsg, form, user){
    const url = getLinkPost();
    const dateGMT = new Date().toUTCString();
    const dateISO = new Date().toISOString();
    if(pstMsg.id){
        //const {user, message, email, phoneNo, postDate} = form;
        const {id} = pstMsg;
        
        const post = [
            String(id),
            form?.email || "",
            form?.phoneNo || "",
            pstMsg?.title?.toString(),
            dateISO,
            user?.id,
            dateISO
        ];
        
        let body = {
            act:"INSERT",
            table:"official_site_likes",
            fields:likeFields,
            values:[post],
            types:likeFieldsTypes
        };
        const urlLike = getDataLink({table:'official_site_likes', s:'id, messageId, slug'});
        const userLikes = await getRequest(urlLike);
        if(userLikes?.ok){
            const userIdFound = userLikes?.data?.find((dt)=>{return (dt.slug == user?.id) && (dt.messageId == id)})
            if(!userIdFound){
                return await postRequest(url, body);
            }else{
                return {ok:false, msg:'User like found'}
            }
        }
    }
}


