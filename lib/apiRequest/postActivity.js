import { getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
import { dateFmtISO } from "@/lib/date/dateFormats";
import { postRequest } from "./postRequest";


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
   LOGIN_ATTEMPT:'LOGIN ATTEMPT',
   LOGOUT:'LOGOUT',
   CREATE:'CREATE',
   UPDATE:'UPDATE',
   RECORD:'RECORD',
   DELETE:'DELETE',
   DOWNLOAD:'DOWNLOAD',
   CHANGEPWD:'CHANGED PASSWORD',
   RESETPWD:'RESET PASSWORD',
   MAILSENT:'MAIL SENT',
}
const getActivityDescriptions = (activity, repOrAct)=>{
  const activities = {
    LOGIN:'User login',
    LOGIN_ATTEMPT:'User login attempt',
    LOGOUT:'User logout',
    CREATE: repOrAct+' was created by User',
    UPDATE: repOrAct+' was updated by User',
    RECORD:repOrAct+' recorded by User',
    DELETE:repOrAct,
    DOWNLOAD:repOrAct+' downloaded by User',
    CHANGEPWD:repOrAct+' password changed by User',
    RESETPWD:'User initiated password reset on '+repOrAct,
 }
 return activities[activity]? activities[activity] : repOrAct;
};

export const postActivity = (user, activity, repOrAct) =>{ 
  //const userData = {userId, firstname, lastname, email, companyId}
  const url = getLinkPostTrans(user?.companyId).post;
  const activityDescription = getActivityDescriptions(activity, repOrAct);
  const vals = [ 
    user?.userId,
    `${user?.firstname} ${user?.lastname}`, 
    user?.email,
    user?.companyId,
    activity,
    activityDescription,
    dateFmtISO().split("T")[0], 
    dateFmtISO()];

  let body = {
    act: "INSERT",
    table:user?.companyId+"_activitylog",
    fields:fieldsArr,
    values : [vals],
    types:typesArr
  };
   postRequest(url, body).then((res)=> console.log('Activity Posted'));
}   