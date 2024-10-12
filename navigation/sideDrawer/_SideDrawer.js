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
import useStoreCompany from '@/context/storeCompany';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
//import ZEffectFetchData from './ZEffectFetchData';
//import ZEffectReportGeneral from '../reports/ZEffectReportGeneral';
//import { generateTB } from '../reportsModule/trialBalance/_generateTBIndex';
//import { generateGenLedger } from '../reportsModule/generalLedger/_IndexGenerateGenLedger';
//import { GrResources } from "react-icons/gr";

const SideDrawer = ({closeDrawer, ssUser, params}) => {
  const router = useRouter();
  const [localStorageValue, setLocalStorageValue] = useLocalStorage("FASTRECORD", {});
  const {activePage, dispatchActivePage, dispatchIsOpen, showSidebarTitle, coy,  dispatchCoy, dispatchPageLoading} = useStoreHeader((state) => state);
  const pathname = usePathname();
  const {signOut, session, user, userRendering, status} = useAuthCustom(ssUser);
  
  //const currentActivePage = navs?.find((dt)=> "/"+coy+"/"+dt.name == pathname);
  const pathnameSplits = pathname.split('/');
  const domainAndPage = pathnameSplits.slice(1,3); //E.g ['demo', 'reports']

  const currentActivePage = navs?.find((dt)=> "/"+coy+"/"+dt.name == "/"+coy+"/"+domainAndPage[1]);
  const isDashboardPage = "/"+coy === pathname;

  const handleLogout =()=>{
    dispatchActivePage({name:"", title:'Dashboard'});
    setLocalStorageValue({});
    signOut({dispatchCoy});
    router.push('/');
  };


  /*
  React.useEffect(()=>{
    if(coy){
      if(!pathname.includes(coy))
        router.push('/')
    }else{
        router.push('/')}
  },[coy, pathname, router]);
  */


  const handleNav =(navs)=>{
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
 
  return (
    <div className={`h-full z-50 min-h-screen mt-[60px] ${showSidebarTitle? 'w-[250px]': 'w-[70px]'} transition-width duration-500 bg-[aliceblue] lg:bg-[#c5dcf0] shadow-[gray_1px_0px_8px_0px]`}>
          <div className='bg-[#192d51] px-3 pt-2 relative flex flex-col w-full  lg:bg-transparent'>
            <AiOutlineClose className='font-bold right-2 absolute cursor-pointer text-white lg:hidden text-[25px] hover:text-[28px] animate-text'
            onClick={closeDrawer}/>
            <CountiXpressLogo
                width={149} 
                height={50}
                includeClass
                className={'p-2 bg-sky-300 mt-3 lg:hidden'}
              />
              <p className='text-[10px] mb-[5px] text-[yellow] lg:hidden'>...simplifying your financial records</p>
          </div>
          <div className={``}>
            <div className='pb-5 px-2 mt-3 h-[75vh] overflow-y-auto'>
              <Link href={`/${coy}`} 
                className={`${!showSidebarTitle && 'tooltip'} z-50 tooltip-right mb-1 text-sm  flex flex-row hover:text-[blue] ${isDashboardPage? "bg-sky-300 text-[blue]" : "text-gray-700"} hover:bg-[#97d9f4] rounded-md p-2 gap-1 items-center`}
                onClick={()=>handleNav({name:coy, title:'Dashboard'})}
                data-tip={'Dashboard'}>
                <AiOutlineDashboard  size={24} className='mr-4'/>
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
                      {showSidebarTitle && <span>{dt.title}</span>}
                    </Link>
                  )
                })
              }
            </div>
            <div
              className={`${showSidebarTitle? 'w-[250px] tooltip': 'w-[70px]'} fixed bottom-0 z-50 hover:text-white tooltip-right py-2 flex flex-row text-black bg-blue-300   p-2 gap-1 items-center`}
              onClick={()=>handleLogout()}
              data-tip={'Logout'}>
              <BiLogOutCircle color='red' className='rotate-180 text-[24px] mr-4  cursor-pointer'/> 
              {showSidebarTitle && <span className=" cursor-pointer">Logout</span>}
            </div> 
        </div>
    </div>
  )
}

export default SideDrawer;


export var icons = {
  dashboard:<AiOutlineDashboard  size={24} className='mr-4'/>,
  reports:<BsGraphUpArrow  size={24} className='mr-4'/>,
  chartOfAccount:<MdOutlineAccountTree  size={24} className='mr-4'/>,
  customer:<BsCart  size={24} className='mr-4'/>,
  vendor:<BiShoppingBag  size={24} className='mr-4'/>,
  recordTransaction:<GrMoney  size={24} className='mr-4'/>,
  recordProduct:<MdInventory  size={24} className='mr-4'/>,
  recordJournal:<BsJournalPlus  size={24} className='mr-4'/>,
  auditTrail:<RiMenuSearchLine  size={24} className='mr-4'/>,
  guide:<GrResources  size={24} className='mr-4'/>,
  profile:<BsFillPersonVcardFill  className='text-[22px] mr-4'/>,
  products:<MdInventory  className='text-[22px] mr-4'/>,
  company:<MdSettings  className='text-[22px] mr-4'/>,
  reconciliation:<MdAccountTree  className='text-[22px] mr-4'/>
};

export var navs = [
  {name:'customers', title:"Customers", icon:icons.customer},
  {name:'vendors', title:"Vendors", icon:icons.vendor},
  {name:'record-transaction', title:"Record Transaction", icon:icons.recordTransaction},
  {name:'record-product', title:"Record Product", icon:icons.recordProduct},
  {name:'record-journal', title:"Record Journal", icon:icons.recordJournal},
  {name:'reports', title:"Reports", icon:icons.reports},
  {name:'chart-of-account', title:"Chart of Account", icon:icons.chartOfAccount},
  {name:'products', title:"Products", icon:icons.products},
  {name:'reconciliation', title:"Reconciliation", icon:icons.reconciliation},
  {name:'audit-trail', title:"Audit Trail", icon:icons.auditTrail},
  //{name:'guide', title:"Guide", icon:icons.guide},
  {name:'profile', title:"Profile", icon:icons.profile},
  {name:'company', title:"Company", icon:icons.company}
];