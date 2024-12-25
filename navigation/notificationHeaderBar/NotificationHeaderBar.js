'use client'
import useStoreHeader from '@/context/storeHeader';
import { getLinkFetchTableWithConds } from '@/lib/apiRequest/urlLinks';
import { MdClose, MdShoppingCart } from "react-icons/md";



const NotificationHeaderBar = ({user, expirationMsg}) => {
  const {dispatchShowNotificationBar, dispatchExpirationMsg} = useStoreHeader((state) => state);
  const {expiredMsg, notExpiredMsg, expiredMsgMini, notExpiredMsgMini, showNotificationBar, expired} = expirationMsg;
  
  const handleBuySubscription =()=>{
    //console.log(123)
  }
  const handleCloseExpiration =()=>{
    //Not be able to close when expired
    if(!expired){
      //dispatchShowNotificationBar(false)
      dispatchExpirationMsg({...expirationMsg, showNotificationBar:false});
    }
  }
  
 
  return(
    <div className={`bg-[#f56b6b] text-[12px] z-10 fixed w-full py-[2px] px-[5px] ${showNotificationBar? '' : 'hidden'}`}>
        <div className={`w-full bg-white relative ${expired? 'hidden' : ''}`}>
            <MdClose className='text-[14px] absolute right-3 text-white cursor-pointer hover:text-[red] active:text-red-300'
             onClick={handleCloseExpiration}/>
        </div>
        <div className='text-white flex flex-row justify-center items-center'>
          <p className='hidden smc:block'>{expired? expiredMsg : notExpiredMsg}</p>
          <p className='smc:hidden'>{expired? expiredMsgMini: notExpiredMsgMini}</p>
          <div className='bg-white hover:bg-green-100 active:bg-white hover:border-[red] border px-3 ml-4 flex cursor-pointer gap-2 flex-row justify-center items-center rounded-md'
            onClick={handleBuySubscription}>
            <MdShoppingCart className=' text-[#f56b6b]'/>
            <p className='text-[#f56b6b]'><a href={`tel:+2348064205333`}>Buy Subscription</a></p>
          </div>
        </div>
    </div>
  )
}

export default NotificationHeaderBar