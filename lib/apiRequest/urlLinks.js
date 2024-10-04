
export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";
const env = process.env.NODE_ENV;



const baseUrl_Local = "http://localhost/quickrecords_backend";
const baseUrl_Prod = "https://quickrecords.gofamintpsogba.org"; //Folder: quickrecords_backend removed in Production
const db_Prod = "gofamint_quickrecords";

const baseUrl =  baseUrl_Prod; //baseUrl_Local;


export function getLinkClientServer(){
    const server =  `${baseUrl}/clientServer.php`;
    const dev= `${baseUrl}/devQuery.php`;
  return {server, dev}
}

export function getLinkForgotPassword({domain, form, userId}){

    return `${baseUrl}/server.php/api/fetch?t=${domain? domain : form.domain}_usersaccount&c=userId&v=${userId? userId :form?.userName}`
}

export function getLinkLogin({domain, form}){
    return `${baseUrl}/server.php/api/fetch?t=${domain}_usersaccount&c=userId&v=${form.userName}`
}


export function getLinkUserData({form, domain}){
    //For demo account
    const userLink = `${baseUrl}/server.php/api/fetch?t=demo_usersaccount&c=userId,email&v=DEMO,`+form?.email;
    const clientLink = `${baseUrl}/server.php/api/fetch?t=_clients&c=companyDomain&v=`+domain;
    return {userLink, clientLink}
}

export function getLinkResend({form, domain}){
    return `${baseUrl}/server.php/api/fetch?t=${domain}_usersaccount&s=id,userId,email&c=userId&v=${form.userName}`
}

export function getLinkResetPwd({form, domain}){
    return `${baseUrl}/server.php/api/fetch?t=${domain}_usersaccount&s=id,userId,email,emailConfirmed,resetPassword,resetPasswordCode,resetPasswordExpires&c=userId&v=${form.userName}`
}

export function getLinkPostUser(){
    return `${baseUrl}/server.php/api/post-user`; 
}
export function getLinkPostClient(){
    return `${baseUrl}/server.php/api/post-client`
}
export function getLinkPostAccess(){
    return `${baseUrl}/server.php/api/post-access`
}

export function getLinkFetchTable({table}){
    return `${baseUrl}/server.php/api/fetch?t=${table}`;
}
export function getLinkFetchTableWithConds({table, conds, values}){
    return `${baseUrl}/server.php/api/fetch?t=${table}&c=${conds}&v=${values}`; //eg c=userId,phoneNo&v=DEMO@ben.ted,08060000
}

export function getLinksAdmin(){
    const usersAccountUrl = `${baseUrl}/server.php/api/users-account?t=demo_usersaccount`;
    const clientsDataUr = `${baseUrl}/server.php/api/fetch?t=_clients`;
    const accessDataUrl = `${baseUrl}/server.php/api/fetch?t=_access&s=id,name,slug,description`;
    const dbTablesUrl = `${baseUrl}/server.php/api/show?t=_clients&s=dtables&db=quickrecords`; //t must be a valid table in the db
    const accessUrl = `${baseUrl}/server.php/api/fetch?t=_access`;
    
    return {usersAccountUrl, clientsDataUr, accessDataUrl, dbTablesUrl, accessUrl}
}

export function getLinkAdminAccess(value){
    return `${baseUrl}/server.php/api/fetch?t=_access&c=slug&v=`+value
}
export function getLinkAdminCreateClient({form}){
    return `${baseUrl}/server.php/api/fetch?t=_clients&c=companyDomain&v=`+form.companyDomain
}
export function getLinkUsersAccount(){
    return `${baseUrl}/server.php/api/query`
}
export function getLinkPostTrans(){
    return {patch:`${baseUrl}/server.php/api/patch-trans`, post:`${baseUrl}/server.php/api/post-trans`}
}
export function getLinkPostAndRetrieve(){
    return `${baseUrl}/server.php/api/post-and-retrieve`
}
export function getLinkDeleteTran(){
    return `${baseUrl}/server.php/api/delete-trans`
}

export function getLinkCOA({user, accountCode}){
    return `${baseUrl}/server.php/api/fetch?t=${user.companyId+"_chartofaccount"}&c=accountCode&v=${accountCode}`
}

export function getLinkPersoanlAcct({user, personalAcct, accountCodeNew}){
    return `${baseUrl}/server.php/api/fetch?t=${user.companyId+"_"+personalAcct}&c=accountCode&v=${accountCodeNew}`
}

export function getLinkProduct({user, productCode}){
    return `${baseUrl}/server.php/api/fetch?t=${user.companyId+"_products"}&c=productCode&v=${productCode}`

}

export function getLinkPostMultiple({user}){
    return `${baseUrl}/server.php/api/fetch?t=${user.companyId+"_products"}`
}

export function getLinkFindUser({domain, form}){
    return `${baseUrl}/server.php/api/fetch?t=${domain}_usersaccount&c=userId&v=${form.userName}`

}
export function getLinkClientData({domain}){
    return `${baseUrl}/server.php/api/transactions?d=${domain}`
}

//Register demo account url
//const url = "http://localhost/app/server.php/api/post-user";
//getRequest("http://localhost/app/server.php/api/fetch?t=demo_usersaccount&c=userId&v="+userId).then((res)=> res);
export function getLinkRegisterDemoAcct(userId){
    return {
       postUserLink: `${baseUrl}/server.php/api/post-user`,
       getUserLink: `${baseUrl}/server.php/api/fetch?t=demo_usersaccount&c=userId&v="${userId}`
    }
}