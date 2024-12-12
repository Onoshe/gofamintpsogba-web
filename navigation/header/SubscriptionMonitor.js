'use client'
import useStoreHeader from '@/context/storeHeader';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { getLinkFetchTableWithConds, getLinksAdmin } from '@/lib/apiRequest/urlLinks';
import { addDaysToDate, getDaysBetweenDates, getDaysDifference } from '@/lib/date/getDaysBetweenDates';
import { sortArrayByDate } from '@/lib/sort/sortArrayByDate';
import React, {useState} from 'react';
import { MdClose, MdShoppingCart } from "react-icons/md";
import { usePathname, useRouter } from 'next/navigation';
import { getUserRegDate } from './utils/getUserRegDate';

const SubscriptionMonitor = ({user}) => {
  const {dispatchShowNotificationBar, subscriptions, expiration, generalSettings, dispatchExpiration, expirationMsg, dispatchExpirationMsg} = useStoreHeader((state) => state);
  sortArrayByDate(subscriptions, 'expiredDate', 'ASC');
  //DEMO account
  const companyId = user?.companyId?.toUpperCase();
  const companyIdLc = user?.companyId?.toLowerCase();
  const trialPeriod = generalSettings?.find((dt)=> dt.slug === "trial-version-expiration-days")?.number1;
  const [regDate, setRegDate] = React.useState({date:user?.registeredDate, def:true}); // //For Demo User
  let daysToExpire = 20; //Default to hide the bar on mount
  let lastSub = {};
  const router = useRouter();
  const pathname = usePathname();
  
  //console.log(regDate)
  async function getRegDate(){
    await getUserRegDate({user, secDate:user?.registeredDate}).then((res)=> setRegDate({date:res, def:false}))
  };

  React.useEffect(()=>{
     if(regDate.def){
        getRegDate();
     }
  },[user, regDate.def]);

  let version = "Trial Version";  //For Demo account
  if(companyId === "DEMO"){
    const today = new Date().toISOString().split("T")[0];
    const stDate = addDaysToDate(regDate.date?.split("T")[0], trialPeriod);
    daysToExpire = getDaysDifference(stDate, today); //(start, end): start-end
    //console.log(daysToExpire, regDate, trialPeriod)
  }else{
    if(subscriptions?.length){
      if(subscriptions?.length){
        lastSub = subscriptions[0];
        const today = new Date()?.toISOString().split("T")[0];
        daysToExpire = getDaysDifference(lastSub?.expiredDate, today);
        version = "Subscription";
      }
    }
  }


  const showNotificationBar = daysToExpire < 7; //Show notification bar if TRUE
  let expired = daysToExpire < 1;   //Show notification bar and hide Close icon if TRUE

  React.useEffect(()=>{
    if(user){
      dispatchExpiration({expired, demoRegDate:regDate.date, daysToExpire, demoTrialPeriod:trialPeriod, lastSub});
      if(daysToExpire){
        dispatchShowNotificationBar(showNotificationBar)
      }
    }
  },[user, expired, showNotificationBar]);

  
  let daysInfo = parseInt(daysToExpire)>= 2? 'days' : 'day';
  let expiredMsg =  `Your ${version} has expired!`;
  let notExpiredMsg =  `Your ${version} will expire in ${daysToExpire} ${daysInfo}`;
  let expiredMsgMini = 'Expired!';
  let notExpiredMsgMini =  `Expires in ${daysToExpire} ${daysInfo}`;
  
  React.useEffect(()=>{
    dispatchExpirationMsg({expiredMsg, notExpiredMsg, expiredMsgMini, notExpiredMsgMini, showNotificationBar, expired});
  },[version, daysToExpire]);


  

  React.useEffect(()=>{
    //Return to Dashboard if expired
    if(expired){
      const route = `/${companyIdLc}`;
      router.push(route);
    }
  },[expired, companyIdLc, pathname]);

  return(
    <></>
  )
}

export default SubscriptionMonitor