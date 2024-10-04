'use client'
import React from 'react';
import {IoMdClose, IoMdMenu} from 'react-icons/io';
import SideDrawer, { navs } from '../sideDrawer/_SideDrawer';
import FastRecordLogo from '@/appLogo/FastRecord';
import useStoreHeader from '@/context/storeHeader';
import useStoreCompany from '@/context/storeCompany.js';
import useOnScroll from '@/lib/hooks/useOnScroll';
import User from './User';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import HeaderNotification from './HeaderNotification';
import EffectFetchData from './dataManager/EffectFetchData';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
//import { usePathname, useRouter } from 'next/navigation';
/* eslint-disable @next/next/no-img-element */


const Header = ({ssUser}) => {
  const {pageIsOpen, activePage, isOpen, coy, dispatchCoy, dispatchActivePage, dispatchIsOpen, dynamicPage, showLoadingNavPage, dispatchShowLoadingNavPage} = useStoreHeader((state) => state);
  //const { data: session, status } = useSession(); //{status:'', data:{session:''}}; //useSession();
  const { signIn, signOut, session, user, userRendering, status} = useAuthCustom(ssUser);
  const [userDropdown, setUserDropdown] = React.useState(false);
  const [scrollPos] = useOnScroll();
  const pathname = usePathname();
  const router = useRouter();
  const companyId = session?.user?.companyId;
  //const pathname = usePathname();

  let userInit = 'NA';
  

  const handleDropdown =()=>{
    if(userDropdown) setUserDropdown(false)
  }
  const handleLogout =()=>{
    signOut({ callbackUrl: '/' });
     //console.log(session)
   }

   const handleClickCompany=()=>{
    const route = `/${companyId}/company`;
    router.push(route);
   } 
   const handleClickProfile=()=>{
    const route = `/${companyId}/profile`;
    router.push(route);
   }
   
   React.useEffect(()=>{
    //On first mounting, especially during page refresh, this graps the current path and dispatch it as Active Page.
    //This will current Sidedrawer tab agree with the current page.
    let coyId = coy;
    //Set dynamic companyId upon refresh
    if(!coy || coy === ""){
      if(session?.user?.companyId){
        coyId = session.user.companyId.toLowerCase();
        //Causing multiple rendering. Disable for now: 4-Oct
        //dispatchCoy(coyId);
      }
    }

    //const currentActivePage = navs?.find((dt)=> "/"+coyId+"/"+dt.name == pathname);
    //const dashboardPage = "/"+coyId === pathname;
    const pathnameSplits = pathname.split('/');
    const domainAndPage = pathnameSplits.slice(1,3); //E.g ['demo', 'reports']

    const currentActivePage = navs?.find((dt)=> "/"+coyId+"/"+dt.name == "/"+coyId+"/"+domainAndPage[1]);
    const dashboardPage = "/"+coyId === pathname;

    //console.log(currentActivePage, activePage)
    //Causing multiple rendering on scroll
    if(dashboardPage){
      if(activePage.name !=='dashboard'){
        //dispatchActivePage({name:'dashboard', title:"Dashboard"});
      }
    }else if(currentActivePage?.name){
      if(activePage.name !== currentActivePage.name){
       //dispatchActivePage({name:currentActivePage.name, title:currentActivePage.title});
      }
    }
    //console.log([coyId, coy])
  },[coy, session]);



   //{`${scrollPos.scrollY> scrollThreshold? 'fixed' : ''}
  return (
    <div className={`fixed w-full z-50`} onClick={handleDropdown}>
        <EffectFetchData session={session}/>
        <div data-theme="aqua" 
          className='py-2 z-50 px-3 flex items-center justify-between'
         >
          <div className='flex flex-row gap-2 items-center h-[54px]'>
            {!isOpen?
              <IoMdMenu size={24} onClick={()=>dispatchIsOpen(!isOpen)} color='white' className='cursor-pointer lg:hidden'/>
              : <IoMdClose size={24} onClick={()=>dispatchIsOpen(!isOpen)} color='white' className='cursor-pointer lg:hidden'/>
            }
            <div className='flex flex-col w-fit'
              >
              <FastRecordLogo
                    width={150} height={40}
                    className={'py-2 pl-3 hidden sm:flex bg-[aliceblue]'}

                    dynamicPage={dynamicPage}
                    goToDashboard={true}
                    activePage={activePage}
                    dispatchIsOpen={dispatchIsOpen}
                    dispatchActivePage={dispatchActivePage}
                    dispatchShowLoadingNavPage={dispatchShowLoadingNavPage}
                />
              <p className='text-[10px] md:text-[12px] text-[yellow] italic hidden sm:flex'>your on-the-go solution for financial records</p>
            </div>
            
          </div>
          <p className='font-bold hidden smc:block text-lg md:text-xl text-white'>{activePage?.title}</p>
          <div className={`${session?.user? '' : 'hidden'} flex flex-row gap-2`}>
              <HeaderNotification newNotice="New Message"/>
              <User userInit={userInit}
                userEmail={session?.user?.userId}
                userRole={`${session?.user?.role}`}
                userDropdown={userDropdown}
                setUserDropdown={setUserDropdown}
                handleLogout={ handleLogout}
                session={session}
                handleClickCompany={handleClickCompany}
                handleClickProfile={handleClickProfile}
              /> 
          </div>
          
        </div>
        <div className={`${isOpen? 'lg:hidden' : 'hidden'} z-50 animate-slide-In fixed h-full -top-16`}>
         <SideDrawer closeDrawer={()=>dispatchIsOpen(!isOpen)}/>
        </div>
        <div className={`${isOpen? 'lg:hidden' : 'hidden'} w-full h-screen bg-[#ade0f438] fixed top-0 bottom-0`}
         onClick={()=>dispatchIsOpen(false)}>
        </div>
    </div>
  )
}

export default Header;

