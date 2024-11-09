
export const getUsers =(usersAll, genSettings)=>{
    const devEmailsObj = genSettings?.find((dt)=> dt.slug === "developer-emails");
    let devEmails = [];
    let users = usersAll;
    if(devEmailsObj){
        users = [];
        devEmails = devEmailsObj.medText1.split(",");
        usersAll.forEach(user => {
            if(!devEmails.includes(user.email)){
                users.push(user)
            }
        });
    }
    return users
}