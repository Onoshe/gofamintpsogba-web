
export const getSubscriptionHistory =({subscriptions})=>{
    if(!subscriptions.length) return;

    let subHistory = [...subscriptions]; 
    let subActive = false;
    let lastSub = {};
    if(subHistory?.length){
        subHistory.sort((a, b) => {
            return new Date(b.subscriptionDate) - new Date(a.subscriptionDate);
          });
          subHistory = subHistory?.map((dt, i)=> {
            const todayDate = new Date();
            const todayTime = todayDate.getTime();
            const subDate = new Date(dt.subscriptionDate);
            const subDateStr = subDate.toDateString();
            //const subDueDate = new Date(dt.subscriptionDate);
            //    subDueDate.setDate(subDate.getDate() + 366);
            //const subDueDateStr = new Date(subDueDate).toDateString();
            const subDueDateObj = new Date(dt.subscriptionDate);
            const nextSubDueYr = subDueDateObj.getFullYear() + 1;
            const subDueDateSplit = dt?.subscriptionDate?.split("-");
            const subDueDateFmt = `${nextSubDueYr}-${subDueDateSplit[1]}-${subDueDateSplit[2]}`;
            const subDueDate = new Date(subDueDateFmt);
            const subDueDateStr = new Date(subDueDate).toDateString();
            const subDueDateTime = subDueDate.getTime();
            const active = subDueDateTime > todayTime;
            if(i===0){subActive = active; lastSub={...dt, subDateStr, subDueDateStr, active}}
            return {...dt, subDateStr, subDueDateStr, active}
        });
    }
    return {subHistory, lastSub}
}

export const getPackagePlans =(generalSettings)=>{
    let varPlans = {};
    if(generalSettings?.length){
        const plansObj = generalSettings.find((dt)=>dt.slug === "no-of-package-users");
        if(plansObj){
           varPlans[plansObj[['smallText1']]] = plansObj['number1'];
           varPlans[plansObj[['smallText2']]] = plansObj['number2'];
           varPlans[plansObj[['smallText3']]] = plansObj['number3'];     
        }
    }
    return varPlans
}

export const getCompanyLogo =(settings)=>{
    let companyLogo = {type:'', file:""};

    if(settings?.data?.length){
        const coyLogoFound = settings.data.find((dt)=> dt.slug === "company-logo");
        if(coyLogoFound?.largeText){
            companyLogo= {type:'base64', file:coyLogoFound.largeText}
        }
    }
    return companyLogo
}