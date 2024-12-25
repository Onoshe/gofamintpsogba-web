'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useStoreHeader from '@/context/storeHeader';
import CountiXpressLogo from '@/appLogo/FastRecord';
import {RiMenuSearchLine} from 'react-icons/ri';
import {AiOutlineClose, AiOutlineDashboard} from 'react-icons/ai';
import {BiLogOutCircle, BiMailSend, BiShoppingBag,} from 'react-icons/bi';
import {MdOutlineAccountTree, MdInventory, MdSettings, MdAccountTree} from 'react-icons/md';
import {GrMoney, GrResources} from 'react-icons/gr';
import { BsGraphUpArrow, BsJournalPlus, BsFillPersonVcardFill, BsGearFill, BsCart} from 'react-icons/bs';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
//import ZEffectFetchData from './ZEffectFetchData';
//import ZEffectReportGeneral from '../reports/ZEffectReportGeneral';
//import { generateTB } from '../reportsModule/trialBalance/_generateTBIndex';
//import { generateGenLedger } from '../reportsModule/generalLedger/_IndexGenerateGenLedger';
//import { GrResources } from "react-icons/gr";

const SideDrawer = ({closeDrawer, ssUser}) => {
  const router = useRouter();
  const [localStorageValue, setLocalStorageValue] = useLocalStorage("FASTRECORD", {});
  const {activePage, dispatchActivePage, isOpen, dispatchIsOpen, showSidebarTitle, coy, dispatchCoy, expirationMsg, dispatchPageLoading} = useStoreHeader((state) => state);
  const { expired} = expirationMsg;
  const pathname = usePathname();
  const {signOut, session, user, userRendering, status} = useAuthCustom(ssUser);
  
  const hasExpired = expired;
  //const currentActivePage = navs?.find((dt)=> "/"+coy+"/"+dt.name == pathname);
  const pathnameSplits = pathname.split('/');
  const domainAndPage = pathnameSplits.slice(1,3); //E.g ['demo', 'reports']
  const showCompanyPage = coy?.toUpperCase() !== "DEMO";

  const currentActivePage = [...navs, nav_auditTrail, nav_profile, nav_Coy]?.find((dt)=> "/"+coy+"/"+dt.name == "/"+coy+"/"+domainAndPage[1]);
  const isDashboardPage = "/"+coy === pathname;


  

  const handleLogout =()=>{
    dispatchActivePage({name:"", title:'Dashboard'});
    setLocalStorageValue({});
    signOut({dispatchCoy, user});
    router.push('/');
  };
  //console.log(currentActivePage);

  /*
  React.useEffect(()=>{
    if(coy){
      if(!pathname.includes(coy))
        router.push('/')
    }else{
        router.push('/')}
  },[coy, pathname, router]);
  */
  //console.log(coy)
  const handleNav =(navs)=>{
    //console.log(navs, currentActivePage)
    if(navs.name === activePage.name) return //to prevent error
      dispatchPageLoading(true);  
      dispatchActivePage(navs);
      dispatchIsOpen(false)
  }

  
  /*React.useEffect(()=>{
    //This graps the current path and dispatch it as Active Page in order to align the active current tab agree with the current page
    const currentActivePage = navs?.find((dt)=> "/"+coy+"/"+dt.name == pathname);
    const dashboardPage = "/"+coy === pathname;
    if(dashboardPage){
      dispatchActivePage({name:'dashboard', title:"Dashboard"});
    }else if(currentActivePage?.name){
      dispatchActivePage({name:currentActivePage.name, title:currentActivePage.title});
    }
  },[]);*/

  //<div className={`h-full z-50 min-h-screen mt-[60px] ${showSidebarTitle? 'w-[220px]': 'w-[70px]'} transition-width duration-500 bg-[aliceblue] lg:bg-[#c5dcf0] shadow-[gray_1px_0px_8px_0px]`}>

  //console.log(currentActivePage)
  return (
    <div className={`h-full relative z-50 min-h-screen mt-[55px] ${showSidebarTitle? 'w-[200px]': 'w-[70px]'} transition-width duration-500 bg-[aliceblue] lg:bg-[#c5dcf0] shadow-[gray_1px_0px_8px_0px]`}>
          <div className={`absolute top-0 bottom-0 w-full bg-red-100/60 ${hasExpired? '' : 'hidden'}`}></div>
          <div className='bg-[#192d51] px-3 pt-2 relative flex flex-col w-full  lg:bg-transparent'>
            <AiOutlineClose className='font-bold right-2 mt-2 absolute cursor-pointer text-white lg:hidden text-[20px] hover:text-[red] animate-text'
            onClick={closeDrawer}/>
            <CountiXpressLogo
                width={120} 
                height={40}
                includeClass
                className={'p-2 mt-3 lg:hidden'}
              />
              <p className='text-[10px] mb-[5px] text-[yellow] lg:hidden'>...simplifying your financial records</p>
          </div>
          <div className={``}>
            <div className='pb-5 px-2 mt-3 h-[75vh] overflow-y-auto'>
              <Link href={`/${coy}`} 
                className={`${!showSidebarTitle && 'tooltip'} z-50 tooltip-right mb-1 text-sm  flex flex-row hover:text-[blue] ${isDashboardPage? "bg-sky-300 text-[blue]" : "text-gray-700"} hover:bg-[#97d9f4] rounded-md p-2 gap-1 items-center`}
                onClick={()=>handleNav({name:coy, title:'Dashboard'})}
                data-tip={'Dashboard'}>
                <AiOutlineDashboard  size={20} className='mr-2'/>
                {showSidebarTitle && <span>Dashboard</span>}
              </Link>
              {
                navs.map((dt, i)=>{
                  return(
                    <Link key={`${i}key`} href={`/${coy}/${dt.name}`} 
                      className={`${!showSidebarTitle && 'tooltip'} z-50 tooltip-right mb-1 text-sm flex-nowrap flex flex-row hover:text-[blue] ${currentActivePage?.name===dt.name? "bg-sky-300 text-[blue] " : "text-gray-700"} hover:bg-[#97d9f4] rounded-md p-2 gap-1 items-center`}
                      data-tip={dt.title}
                      onClick={()=>handleNav({name:dt.name, title:dt.title})}>
                      {dt.icon}
                      {showSidebarTitle && <span className='text-[12px]'>{dt.title}</span>}
                    </Link>
                  )
                })
              }
              {showCompanyPage? 
                <Link href={`${'/'+coy+'/audit-trail'}`} 
                  className={`${!showSidebarTitle && 'tooltip'} z-50 tooltip-right mb-1 text-sm flex-nowrap flex flex-row hover:text-[blue] ${currentActivePage?.name==='audit-trail'? "bg-sky-300 text-[blue] " : "text-gray-700"} hover:bg-[#97d9f4] rounded-md p-2 gap-1 items-center`}
                  data-tip={'Audit Trail'}
                  onClick={()=>handleNav({name:'audit-trail', title:'Audit Trail'})}>
                  {icons.auditTrail}
                  {showSidebarTitle && <span className='text-[12px]'>{'Audit Trail'}</span>}
                </Link>
                :<div  
                  className={`${!showSidebarTitle && 'tooltip'} z-50 tooltip-right mb-1 text-sm flex-nowrap flex flex-row  bg-gray-200 text-gray-700 rounded-md p-2 gap-1 items-center`}
                  data-tip={'Audit Trail'}
                  >
                  {icons.auditTrail}
                  {showSidebarTitle && <span className='text-[12px]'>{'Audit Trail'}</span>}
                </div>
              }
              <Link href={`${'/'+coy+'/profile'}`} 
                  className={`${!showSidebarTitle && 'tooltip'} z-50 tooltip-right mb-1 text-sm flex-nowrap flex flex-row hover:text-[blue] ${currentActivePage?.name==='profile'? "bg-sky-300 text-[blue] " : "text-gray-700"} hover:bg-[#97d9f4] rounded-md p-2 gap-1 items-center`}
                  data-tip={'Profile'}
                  onClick={()=>handleNav({name:'profile', title:'Profile'})}>
                  {icons.profile}
                  {showSidebarTitle && <span className='text-[12px]'>{'Profile'}</span>}
                </Link>
              {showCompanyPage? 
                <Link href={`${'/'+coy+'/company'}`} 
                  className={`${!showSidebarTitle && 'tooltip'} z-50 tooltip-right mb-1 text-sm flex-nowrap flex flex-row hover:text-[blue] ${currentActivePage?.name==='company'? "bg-sky-300 text-[blue] " : "text-gray-700"} hover:bg-[#97d9f4] rounded-md p-2 gap-1 items-center`}
                  data-tip={'Company'}
                  onClick={()=>handleNav({name:'company', title:'Company'})}>
                  {icons.company}
                  {showSidebarTitle && <span className='text-[12px]'>{'Company'}</span>}
                </Link>
                :<div  
                  className={`${!showSidebarTitle && 'tooltip'} z-50 tooltip-right mb-1 text-sm flex-nowrap flex flex-row  bg-gray-200 text-gray-700 rounded-md p-2 gap-1 items-center`}
                  data-tip={'Company'}
                  >
                  {icons.company}
                  {showSidebarTitle && <span className='text-[12px]'>{'Company'}</span>}
                </div>
              }
            </div>
            <div
              className={`${showSidebarTitle? 'w-[200px] tooltip': 'w-[70px]'} fixed bottom-0 z-50 hover:text-white tooltip-right py-2 flex flex-row text-[#e2dddd] bg-[gray]   p-2 gap-1 items-center`}
              onClick={()=>handleLogout()}
              data-tip={'Logout'}>
              <BiLogOutCircle color='red' className='rotate-180 text-[20px] mr-2  cursor-pointer'/> 
              {showSidebarTitle && <span className=" cursor-pointer">Logout</span>}
            </div> 
        </div>
          
    </div>
  )
}

export default SideDrawer;


export var icons = {
  dashboard:<AiOutlineDashboard  size={18} className='mr-2'/>,
  reports:<BsGraphUpArrow  size={18} className='mr-2'/>,
  chartOfAccount:<MdOutlineAccountTree  size={18} className='mr-2'/>,
  customer:<BsCart  size={18} className='mr-2'/>,
  vendor:<BiShoppingBag  size={18} className='mr-2'/>,
  products:<MdInventory  className='text-[18px] mr-2'/>,
  recordTransaction:<GrMoney  size={18} className='mr-2'/>,
  recordProduct:<MdInventory  size={18} className='mr-2'/>,
  recordJournal:<BsJournalPlus  size={18} className='mr-2'/>,
  auditTrail:<RiMenuSearchLine  size={18} className='mr-2'/>,
  guide:<GrResources  size={18} className='mr-2'/>,
  profile:<BsFillPersonVcardFill  className='text-[22px] mr-2'/>,
  company:<MdSettings  className='text-[18px] mr-2'/>,
  reconciliation:<MdAccountTree  className='text-[18px] mr-2'/>
};

export var navs = [
  {name:'customers', title:"Customers", icon:icons.customer},
  {name:'vendors', title:"Vendors", icon:icons.vendor},
  {name:'products', title:"Products", icon:icons.products},
  {name:'record-transaction', title:"Record Transaction", icon:icons.recordTransaction},
  {name:'record-product', title:"Record Product", icon:icons.recordProduct},
  {name:'record-journal', title:"Record Journal", icon:icons.recordJournal},
  {name:'reports', title:"Reports", icon:icons.reports},
  {name:'chart-of-account', title:"Chart of Account", icon:icons.chartOfAccount},
  {name:'reconciliation', title:"Reconciliation", icon:icons.reconciliation},
  //{name:'audit-trail', title:"Audit Trail", icon:icons.auditTrail},
  //{name:'guide', title:"Guide", icon:icons.guide},
  //{name:'profile', title:"Profile", icon:icons.profile},
  //{name:'company', title:"Company", icon:icons.company}
];

export var nav_auditTrail = {name:'audit-trail', title:"Audit Trail", icon:icons.auditTrail};
export var nav_profile =  {name:'profile', title:"Profile", icon:icons.profile};
export var nav_Coy = {name:'company', title:"Company", icon:icons.company};