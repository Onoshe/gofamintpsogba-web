import { getRequest } from "@/lib/apiRequest/getRequest";
import { getLinkRegisterDemoAcct } from "@/lib/apiRequest/urlLinks";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { getRandomNumbers } from "@/lib/radomNos/getRandomNumbers";
import * as bcrypt from "bcryptjs";



async function postQuery(form, client){
    const pwdHarshed =  await bcrypt.hash(form.password, 10);
    let userId = `${form.firstname}.${form.lastname}`.toLocaleLowerCase();
     userId = `${client.companyDomain.toUpperCase()}@${userId}`;
    
    const {postUserLink, getUserLink} = getLinkRegisterDemoAcct(userId);
    const userIdExist = await getRequest(getUserLink).then((res)=> res);
    if(userIdExist?.data?.length){
      const randNo = getRandomNumbers(0, 9, 2)[0];
      userId = `${form.firstname}.${form.lastname}${randNo}`.toLocaleLowerCase();
      userId = `${client.companyDomain.toUpperCase()}@${userId}`;
    }    
    const body = {
        "act":"INSERT",
        "table":"demo_usersaccount",
        "fields":["userId", "firstname","lastname","email", "secret", "gender", "companyId", "companyDomain", "role", "registeredDate", "createdAt", "updatedAt", "appSlug"],
        "values":[[userId, form.firstname,form.lastname, form.email, pwdHarshed, form.password, client.id, 'demo', 'Admin', dateFmtISO(), dateFmtISO(), dateFmtISO(), "QUICKRECORDS"]],
        "types":["VARCHAR", "VARCHAR", "VARCHAR","VARCHAR","VARCHAR","VARCHAR", "INT", "VARCHAR", "VARCHAR", "VARCHAR","VARCHAR","VARCHAR", "VARCHAR"]
      };
    return {url:postUserLink, body}
}   


export { postQuery}