'use client'
import useStoreHeader from '@/context/storeHeader';
import { getDaysBetweenDates, getDaysDifference } from '@/lib/date/getDaysBetweenDates';
import { sortArrayByDate } from '@/lib/sort/sortArrayByDate';
import React, {useState} from 'react';
import { MdClose, MdShoppingCart } from "react-icons/md";


const NotificationHeaderBar = () => {
  const {dispatchShowNotificationBar, subscriptions} = useStoreHeader((state) => state);
  sortArrayByDate(subscriptions, 'expiredDate', 'ASC');
  let expireDays = 20; //Default to hide the bar on mount
  if(subscriptions?.length){
    const lastSub = subscriptions[0];
    const today = new Date().toISOString().split("T")[0];
    expireDays = getDaysDifference(lastSub.expiredDate, today);
  }
  const showNotificationBar = expireDays < 15;

  React.useEffect(()=>{
    dispatchShowNotificationBar(showNotificationBar)
  },[showNotificationBar]);

  return(
    <div className={`bg-[#f56b6b] z-20 fixed w-full p-[5px] ${showNotificationBar? '' : 'hidden'}`}>
        <div className="w-full bg-white relative">
            <MdClose className='text-26 absolute right-3 hidden text-white cursor-pointer hover:text-[red] active:text-red-300'
             onClick={()=>dispatchShowNotificationBar(false)}/>
        </div>
        <div className='text-white flex flex-row justify-center items-center text-sm'>
          <p className='hidden smc:block'>Your Trial Period will expire in {expireDays} days</p>
          <div className='bg-white py-[2px] hover:border-[red] border px-3 ml-4 flex cursor-pointer gap-2 flex-row justify-center items-center rounded-md'>
            <MdShoppingCart className='text-26 text-[#f56b6b]'/>
            <p className='text-[#f56b6b]'>Buy Subscription</p>
          </div>
        </div>
    </div>
  )
}

export default NotificationHeaderBar