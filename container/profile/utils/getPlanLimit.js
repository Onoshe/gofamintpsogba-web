export const getPlanLimit =(subscriptions, generalSettings)=>{
   
  //if(subscriptions?.length && generalSettings?.length)
  //console.log(subscriptions, generalSettings);

  let planLimit = "";
    const subPlan = subscriptions?.find((dt)=> new Date(dt.expiredDate).getTime() > new Date().getTime())?.subscriptionType; 
  if(subPlan){
    const plansObj = generalSettings?.find((dt)=> dt.slug === "no-of-package-users");
    const plans ={
      [plansObj?.smallText1]:plansObj?.number1,
      [plansObj?.smallText2]:plansObj?.number2,
      [plansObj?.smallText3]:plansObj?.number3
    }
    planLimit = plans[subPlan.toUpperCase()];
  }
  //console.log(subPlan)
  return planLimit
}