'use client'
import useStoreHeader from '@/context/storeHeader';
import { addDaysToDate, getDaysBetweenDates, getDaysDifference } from '@/lib/date/getDaysBetweenDates';
import { sortArrayByDate } from '@/lib/sort/sortArrayByDate';
import React, {useState} from 'react';
import { MdClose, MdShoppingCart } from "react-icons/md";


const NotificationHeaderBar = ({user}) => {
  const {dispatchShowNotificationBar, subscriptions, expiration, generalSettings, dispatchExpiration} = useStoreHeader((state) => state);
  sortArrayByDate(subscriptions, 'expiredDate', 'ASC');
  const companyId = user?.companyId?.toUpperCase();
  const trialPeriod = generalSettings?.find((dt)=> dt.slug === "trial-version-expiration-days")?.number1;
  const regDate = user?.registeredDate; //For Demo User
  let daysToExpire = 20; //Default to hide the bar on mount
  let lastSub = {};

      if(companyId === "DEMO"){
        const today = new Date().toISOString().split("T")[0];
        const stDate = addDaysToDate(regDate?.split("T")[0], trialPeriod);
        daysToExpire = getDaysDifference(stDate, today); //(start, end): start-end
      }else{
        if(subscriptions?.length){
            lastSub = subscriptions[0];
            const today = new Date()?.toISOString().split("T")[0];
            daysToExpire = getDaysDifference(lastSub?.expiredDate, today);
          }
      }
    
 
  const version = "Trial Version";
  const showNotificationBar = daysToExpire < 14; //Show notification bar if TRUE
  let expired = daysToExpire < 1;   //Show notification bar and hide Close icon if TRUE


  React.useEffect(()=>{
    if(user){
      dispatchExpiration({expired, demoRegDate:regDate, daysToExpire, demoTrialPeriod:trialPeriod, lastSub});
      if(daysToExpire){
        dispatchShowNotificationBar(showNotificationBar)
      }
    }
  },[user]);

  const handleBuySubscription =()=>{
    console.log(123)
  }
  const handleCloseExpiration =()=>{
    //Not be able to close when expired
    if(!expired){
      dispatchShowNotificationBar(false)
    }
  }

  return(
    <div className={`bg-[#f56b6b] text-[12px] z-10 fixed w-full py-[2px] px-[5px] ${showNotificationBar? '' : 'hidden'}`}>
        <div className={`w-full bg-white relative ${expired? 'hidden' : ''}`}>
            <MdClose className='text-[14px] absolute right-3 text-white cursor-pointer hover:text-[red] active:text-red-300'
             onClick={handleCloseExpiration}/>
        </div>
        <div className='text-white flex flex-row justify-center items-center'>
          <p className='hidden xsmc:block'>{expired? `Your ${version} has expired!` : `Your ${version} will expire in ${daysToExpire} days`}</p>
          <p className='xsmc:hidden'>{expired? 'Expired!' : `Expires in ${daysToExpire} days`}</p>
          <div className='bg-white hover:bg-green-100 active:bg-white hover:border-[red] border px-3 ml-4 flex cursor-pointer gap-2 flex-row justify-center items-center rounded-md'
            onClick={handleBuySubscription}>
            <MdShoppingCart className=' text-[#f56b6b]'/>
            <p className='text-[#f56b6b]'>Buy <span className='hidden smc:inline'>Subscription</span></p>
          </div>
        </div>
    </div>
  )
}

export default NotificationHeaderBar