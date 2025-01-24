'use client';
import React, { useEffect } from 'react'
import Header from './Header'
import useScrollDirection from '@/lib/hooks/useScrollDirection';
import usePstCornerMsgStore from '@/context/usePstCornerMsgStore';
import { sortArrayByKey } from "@/lib/sortArrayByKey";
import { usePathname } from 'next/navigation';
import { useAuthCustom } from '@/lib/authActions/useAuthCustom';
import getPastorCornerMessages from '@/assets/data/pastorCorner';


const HeaderContainer = ({pastorCorners, ssUser}) => {
    const {user} = useAuthCustom(ssUser);
    const scrollDirection = useScrollDirection();
    const {pstCornerData, disPstCornerData, pstCornerDataDispatched, disPstCornerDataDispatched} = usePstCornerMsgStore((state)=>state);
    const loginForm = {};
    const showAnnouncement = false;
    const pathname = usePathname();


  useEffect(()=>{
    if(pastorCorners?.data?.length && !pstCornerDataDispatched){
      const initData = getPastorCornerMessages();
      disPstCornerData([...initData, ...pastorCorners.data]);
      disPstCornerDataDispatched(true);
    }
  },[pstCornerData, pastorCorners, pstCornerDataDispatched]);  
  sortArrayByKey(pstCornerData, 'date', 'ASC'); //From latest date


  //if(pathname === "/admin-login"){ return }
  return (
        <div className={`sticky top-0 ${scrollDirection === "down" ? "" : ""} transition-all duration-500 headerShadow z-50 overflow-hidden  ${showAnnouncement? 'hidden' :''}`}>
        <Header scrollDown={scrollDirection === "down"} user={user}/>
        <p className='hidden'>LoginForm- IsOnline:{loginForm.isOnline}, Show:{loginForm.show} AdminPass:{loginForm.adminPas}, 
            UserType:{'userType'}, UserID:{'user.userID'}</p>      
    </div>
  )
}

export default HeaderContainer;


//sticky top-0 bg-base-100 z-50 shadow-md