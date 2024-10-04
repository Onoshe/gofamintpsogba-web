import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "./postRequest";

const url = getLinkPostTrans().post;

const fieldsArr =[
  `userId`, 
  `fullName`,
  `email`, 
  `companyDomain`,
  `activity`, 
  `activityDescription`,
  `activityDate`, 
  `createdAt`
];
const typesArr = [
  "VARCHAR",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR",
  "VARCHAR"
];

export const activities = {
   LOGIN:'LOGIN',
   LOGIN_ATTEMPT:'LOGINATTEMPT',
   CREATE:'CREATE',
   RECORD:'RECORD',
   DELETE:'DELETE',
   DOWNLOAD:'DOWNLOAD',
   CHANGEPWD:'CHANGEPWD',
   RESETPWD:'RESETPWD',

}
export const postActivity = (user, activity, activityDesc) =>{ 
  //const userData = {userId, firstname, lastname, email, companyId}
  const vals = [ 
    user.userId,
    `${user.firstname} ${user.lastname}`, 
    user.email,
    user.companyId,
    activity,
    activityDesc,
    dateFmtISO(), 
    dateFmtISO()];

  let body = {
    act: "INSERT",
    table:user.companyId+"_activitylog",
    fields:fieldsArr,
    values : [vals],
    types:typesArr
  };

   postRequest(url, body).then((res)=> console.log('Activity Posted'));
}   