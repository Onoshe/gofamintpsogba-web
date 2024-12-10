'use client'
import useStoreHeader from '@/context/storeHeader';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { getLinkFetchTableWithConds } from '@/lib/apiRequest/urlLinks';
import { addDaysToDate, getDaysBetweenDates, getDaysDifference } from '@/lib/date/getDaysBetweenDates';
import { sortArrayByDate } from '@/lib/sort/sortArrayByDate';
import React, {useState} from 'react';
import { MdClose, MdShoppingCart } from "react-icons/md";
import { usePathname, useRouter } from 'next/navigation';

const SubscriptionMonitor = ({user}) => {
  const {dispatchShowNotificationBar, subscriptions, expiration, generalSettings, dispatchExpiration, expirationMsg, dispatchExpirationMsg} = useStoreHeader((state) => state);
  sortArrayByDate(subscriptions, 'expiredDate', 'ASC');
  //DEMO account
  const companyId = user?.companyId?.toUpperCase();
  const companyIdLc = user?.companyId?.toLowerCase();
  const trialPeriod = generalSettings?.find((dt)=> dt.slug === "trial-version-expiration-days")?.number1;
  const regDate = user?.registeredDate; //For Demo User
  let daysToExpire = 20; //Default to hide the bar on mount
  let lastSub = {};
  const router = useRouter();
  const pathname = usePathname();

  //console.log(expiration, subscriptions)

  let version = "Trial Version";  //For Demo account
  if(companyId === "DEMO"){
    const today = new Date().toISOString().split("T")[0];
    const stDate = addDaysToDate(regDate?.split("T")[0], trialPeriod);
    daysToExpire = getDaysDifference(stDate, today); //(start, end): start-end
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
      dispatchExpiration({expired, demoRegDate:regDate, daysToExpire, demoTrialPeriod:trialPeriod, lastSub});
      if(daysToExpire){
        dispatchShowNotificationBar(showNotificationBar)
      }
    }
  },[user, expired, showNotificationBar]);

  

  let expiredMsg =  `Your ${version} has expired!`;
  let notExpiredMsg =  `Your ${version} will expire in ${daysToExpire} days`;
  let expiredMsgMini = 'Expired!';
  let notExpiredMsgMini =  `Expires in ${daysToExpire} days`;
  
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