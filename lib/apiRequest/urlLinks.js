
export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";
const env = process.env.NODE_ENV;



const baseUrl_Local = "http://localhost/quickrecords_backend";
const baseUrl_Prod = "https://quickrecords.gofamintpsogba.org"; //Folder: quickrecords_backend removed in Production
const db_ = "gofamint_quickrecords";

const baseUrl = isDevelopment? baseUrl_Local : baseUrl_Prod; //baseUrl_Local;


export function getLinkClientServer(domain){
    const server =  `${baseUrl}/clientServer.php?db=`+domain.toLowerCase();
    const dev= `${baseUrl}/devQuery.php?db=`+domain.toLowerCase();
  return {server, dev}
}

export function getLinkForgotPassword({domain, form, userId}){
    return `${baseUrl}/server.php/api/fetch?db=${domain? domain.toLowerCase() : form.domain.toLowerCase()}&t=${domain? domain : form.domain}_usersaccount&c=userId&v=${userId? userId :form?.userName}`
}

export function getLinkLogin({domain, form}){
    return `${baseUrl}/server.php/api/fetch?db=${domain.toLowerCase()}&t=${domain.toLowerCase()}_usersaccount&c=userId&v=${form.userName}`
}


export function getLinkUserData({form}){
    //All tables are in demo database
    const domain = "demo";
    const verifyUserIdLink = `${baseUrl}/server.php/api/fetch?db=${domain}&t=demo_usersaccount&c=userId&v=`+form?.userId;
    const verifyEmailLink = `${baseUrl}/server.php/api/fetch?db=${domain}&t=demo_usersaccount&c=email&v=`+form?.email;
    const clientLink = `${baseUrl}/server.php/api/fetch?db=${domain}&t=_clients&c=companyDomain&v=`+domain;
    return {verifyEmailLink, verifyUserIdLink, clientLink}
}

export function getLinkResend({form, domain}){
    return `${baseUrl}/server.php/api/fetch?db=${domain}&t=${domain}_usersaccount&s=id,userId,email&c=userId&v=${form.userName}`
}

export function getLinkResetPwd({form, domain}){
    return `${baseUrl}/server.php/api/fetch?db=${domain}&t=${domain}_usersaccount&s=id,userId,email,emailConfirmed,resetPassword,resetPasswordCode,resetPasswordExpires&c=userId&v=${form.userName}`
}

export function getLinkPostUser(domain){
    return `${baseUrl}/server.php/api/post-user?db=${domain}`; 
}
export function getLinkPostClient(domain){
    return `${baseUrl}/server.php/api/post-client?db=${domain}`
}
export function getLinkPostAccess(){  //Query from Admin Page
    return `${baseUrl}/server.php/api/post-access?db=demo`
}

export function getLinkFetchTable({table, domain, select}){
    return select? `${baseUrl}/server.php/api/fetch?db=${domain}&t=${table}&s=${select}` : `${baseUrl}/server.php/api/fetch?db=${domain}&t=${table}`;
}

export function getLinkFetchTableWithConds({table, conds, values}){
    let domainNomal = table?.split("_")[0];
    domainNomal = domainNomal?.toLowerCase();
    const domainGen = "demo";
    const domain = table === "_access" || table === "_settings" || table === "_subscriptions" || table === "_clients"? domainGen : domainNomal;
    return `${baseUrl}/server.php/api/fetch?db=${domain}&t=${table}&c=${conds}&v=${values}`; //eg c=userId,phoneNo&v=DEMO@ben.ted,08060000
}

export function getLinksAdmin(domain){
    const db = "demo";
    const usersAccountUrl = `${baseUrl}/server.php/api/users-account?db=${db}&t=demo_usersaccount`;
    const clientsDataUr = `${baseUrl}/server.php/api/fetch?db=${db}&t=_clients`;
    const accessDataUrl = `${baseUrl}/server.php/api/fetch?db=${db}&t=_access&s=id,name,slug,description`;
    const dbTablesUrl = `${baseUrl}/server.php/api/show?db=${db}&t=_clients&s=dtables&db=${db}`; //t must be a valid table in the db
    const accessUrl = `${baseUrl}/server.php/api/fetch?db=${db}&t=_access`;
    const settingsUrl = `${baseUrl}/server.php/api/fetch?db=${db}&t=_settings`;
    const subscriptionsUrl = `${baseUrl}/server.php/api/fetch?db=${db}&t=_subscriptions`;
    const backupUrl = `${baseUrl_Prod}/devQuery.php?db=${db}`; //While backup csv works on both localhost and online, backup msl only works on online
    const backupUrlBase = `${baseUrl}/devQuery.php?db=${db}`; //While backup csv works on both localhost and online, backup msl only works on online
    const databasesUrl = `${baseUrl}/server.php/api/fetch-databases?db=demo&d=demo&t=_clients`;
    return {usersAccountUrl, clientsDataUr, accessDataUrl, dbTablesUrl, accessUrl, subscriptionsUrl, settingsUrl, backupUrl, databasesUrl, backupUrlBase}
}

export function getLinkAdminAccess(value){
    const domain = "demo";
    return `${baseUrl}/server.php/api/fetch?db=${domain}&t=_access&c=slug&v=`+value
}
export function getLinkAdminCreateClient({form, domain}){
    return `${baseUrl}/server.php/api/fetch?db=${'demo'}&t=_clients&c=companyDomain&v=`+form.companyDomain
}
export function getLinkUsersAccount(domain){
    return `${baseUrl}/server.php/api/query?db=${domain}`
}
export function getLinkPostTrans(domain){
    return {
        patch:`${baseUrl}/server.php/api/patch-trans?db=${domain}`, 
        post:`${baseUrl}/server.php/api/post-trans?db=${domain}`
    }
}

export function getLinkPostAndRetrieve(domain){
    return `${baseUrl}/server.php/api/post-and-retrieve?db=${domain}`
}
export function getLinkDeleteTran(domain){
    return `${baseUrl}/server.php/api/delete-trans?db=${domain}`
}

export function getLinkCOA({user, accountCode}){
    return `${baseUrl}/server.php/api/fetch?db=${user.companyId}&t=${user.companyId+"_chartofaccount"}&c=accountCode&v=${accountCode}`
}

export function getLinkPersoanlAcct({user, personalAcct, accountCodeNew}){
    return `${baseUrl}/server.php/api/fetch?db=${user.companyId}&t=${user.companyId+"_"+personalAcct}&c=accountCode&v=${accountCodeNew}`
}

export function getLinkProduct({user, productCode}){
    return `${baseUrl}/server.php/api/fetch?db=${user.companyId}&t=${user.companyId+"_products"}&c=productCode&v=${productCode}`
}

export function getLinkPostMultiple({user}){
    return `${baseUrl}/server.php/api/fetch?db=${user.companyId}&t=${user.companyId+"_products"}`
}

export function getLinkFindUser({domain,db, form}){
    return `${baseUrl}/server.php/api/fetch?db=${db}&t=${domain}_usersaccount&c=userId&v=${form.userName}`

}
export function getLinkClientData({domain}){
    return `${baseUrl}/server.php/api/transactions?db=${domain}&d=${domain}`
}

//Cache-Busting Query Parameter: The random query string (timestamp) tricks the browser making it think it's new request- no cache
export function getImageLink(img){
    return `${baseUrl_Prod}/image_server.php?image=${img}&timestamp=${Date.now()}`
}
export function getImageCheckLink(img){
    //db & t params are not necessary but just to prevent error
    return `${baseUrl_Prod}/server.php/api/check-photo?db=demo&t=demo_coastructure&img=${img}`
}

export function getPostImageLink(){
    return `${baseUrl_Prod}/image_uploader.php`
    //"https://quickrecords.gofamintpsogba.org/image_uploader.php";
}

export function getLinkPatchRows(domain){
    return `${baseUrl}/server.php/api/patch-rows?db=${domain}`
}
export function getLinkAffectedTrans({domain, t, c}){
    return `${baseUrl}/server.php/api/affected-trans?db=${domain}&d=${domain}&t=${t}&c=${c}` //affected-trans?d=demo&t=s&c=V-000007
}
export function getLinkMultiRowsUpdate(domain){
    return `${baseUrl}/server.php/api/multi-rows-update?db=${domain}`
}

//http://localhost/quickrecords_backend/server.php/api/affected-trans?d=demo&t=m&c=530220
//https://quickrecords.gofamintpsogba.org/image_server.php?image=quickrecords-logo

//Register demo account url
//const url = "http://localhost/app/server.php/api/post-user";
//getRequest("http://localhost/app/server.php/api/fetch?t=demo_usersaccount&c=userId&v="+userId).then((res)=> res);
export function getLinkRegisterDemoAcct(userId, domain){
    return {
       postUserLink: `${baseUrl}/server.php/api/post-user?db=${domain}`,
       getUserLink: `${baseUrl}/server.php/api/fetch?db=${domain}&t=demo_usersaccount&c=userId&v="${userId}`
    }
}