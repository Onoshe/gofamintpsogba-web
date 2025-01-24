import { postRequest } from "@/lib/apis/postRequest";
import { getLinkPost } from "@/lib/apis/urlLinks";


const pastorCornerFields = [
    //"sn",
    "title",
    "make",
    "date",
    "messageBy",
    "prayer",
    "bibleRef",
    "message",
    "message_html",
    "createdAt",
     //"sn",
    //"slug",
    //"note",
    //"info"
];
const pastorCornerTypes = [
    //"INT",
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


export async function publishPastorCorner(form, messagePlain, messageHtml){
    const url = getLinkPost();
    const dateISO = new Date().toISOString().split('T')[0];
    
    if(form.topic && form.date && form.messageBy && messagePlain && messageHtml){
        const {date, messageBy,topic} = form;
        const make = form?.make? form.make : "HTML";

        const post = [
            topic,
            make,
            date,
            messageBy,
            form?.prayer || "",
            form?.bibleRef || "",
            messagePlain,
            messageHtml,
            dateISO
        ];
        
        let body = {
            act:"INSERT",
            table:"official_site_pastorcorner",
            fields:pastorCornerFields,
            values:[post],
            types:pastorCornerTypes
        }
       return await postRequest(url, body);
    }
}


