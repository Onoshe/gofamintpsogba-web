import { getLinkPostAccess, getLinkPostClient } from "@/lib/apiRequest/urlLinks";
import { dateFmtISO } from "@/lib/date/dateFormats";



export function handlePostMail(form){
    const url = getLinkPostClient('demo')
    const {userName, phoneNo,email, message} = form;
    
    let fields = ["userName", "phoneNo","email", "message", "sentDate", "updatedAt", "createdAt"];
    let values = [userName, phoneNo, email, message, dateFmtISO(), dateFmtISO(), dateFmtISO()];
    let types = ["VARCHAR", "VARCHAR", "VARCHAR","VARCHAR","VARCHAR","VARCHAR", "VARCHAR"];
    
    const body = {
        "act":"INSERT",
        "table":"_mails",
        fields,
        values:[values],
        types
      };
      
    return {url, body}
  }  
  