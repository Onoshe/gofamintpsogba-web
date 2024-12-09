'use client';
import FastRecordLogo from '@/appLogo/FastRecord'
import React from 'react'
import HeaderUser from './HeaderUser';
import { useRouter } from 'next/navigation';
import useStoreHeader from '@/context/storeHeader';


const HomeHeader = ({session, signOut, style, styleInner, theme, appTextColor}) => {
  //const { data: session, status } = useSession();
  const [userDropdown, setUserDropdown] = React.useState(false);
  const router = useRouter(); 
  const {coy, dispatchCoy } = useStoreHeader((state) => state);
  
  //console.log(coy)
  const handleLogout =()=>{
    signOut({dispatchCoy, user:session?.user});
     //console.log(session)
   }
   const handleBackToDashboard =()=>{
    router.push("/"+coy);
   }

   const handleGoHome =()=>{
      router.push("/")
   }

  return (
    <div className={`fixed w-full top-0 z-50 ${style? style : 'text-white text-center bg-white'}`}>
        <div data-theme={theme || "aqua"} 
          className={`py-1 z-50 px-3 flex items-center justify-between h-[60px] ${styleInner}`}
         >
            <div className='flex flex-col w-fit cursor-pointer'
              onClick={handleGoHome}>
              <FastRecordLogo
                    width={120} height={30}
                    className={'py-2 pl-3 hidden sm:flex bg-[aliceblue]'}
                    dynamicPage={"/"}
                />
              <p className={`text-[10px] md:text-[12px] ${appTextColor || 'text-[yellow]'} italic hidden sm:flex`}>...simplifying your financial records</p>
            </div>
            <div className={`flex flex-col items-end ${session?.user?.userId && coy? '' : 'hidden'}`}>
              <HeaderUser 
                  userEmail={session?.user?.userId}
                  userFullName={`${session?.user?.firstname} ${session?.user?.lastname}`}
                  userDropdown={userDropdown}
                  setUserDropdown={setUserDropdown}
                  handleLogout={ handleLogout}
                  session={session}
                  handleBackToDashboard={handleBackToDashboard}
                /> 
            </div>
        </div>
    </div>
  )
}

export default HomeHeader