'use client'
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { FaUser } from 'react-icons/fa';
import {tabList, tabListBasic, tabListAdmin, tabListGuest, tabListNoneMember} from './tabList';
import {MdClose, MdOutlineArrowBackIos,  MdOutlineArrowForwardIos} from 'react-icons/md';
import { tabsNav } from './headerSchema';




const HeaderBar = ({hideHeader, seltdTab=[], disSeltdTab, userType, loginForm={}, loginUser={}}) => {
    const [hideBTabs, setHideBTabs] = React.useState(false);
    const scrollRef = React.useRef(0);
    const isNotmember = loginForm.checkedMember === "nonmember";

    function tabsHandler(tabs){
      disSeltdTab(tabs)
    }
    React.useEffect(()=>{
      if(isNotmember){
        const aboutHomeTab = tabsNav.RECORDABOUTHOME;
        disSeltdTab(aboutHomeTab)
      }
    },[isNotmember, loginUser.user]);
    const memberType = loginForm.checkedMember === 'member'?  tabListBasic : tabListNoneMember;
    const guestType = loginUser.user === "GUEST"? tabListGuest : memberType;
    
    
    const tabLists = tabList; 

    function handleScroll(scrollOffset){
      
      if(scrollOffset==='LEFT'){
        scrollRef.current.scrollLeft -= 100;
      }else{
        scrollRef.current.scrollLeft += 100;
      }
    }
    
  return (
        <div className={`border-t-2 border-gray-200 border-solid 
            py-0 pl-0 px-0 bg-[#01013c] text-white flex border-b-blue-700 border-b-[3px]
             `}>
              
                <div className={`px-1 sm:px-2 self-end cursor-pointer  ${userType==='USER'? 'hidden' : ''}`}>
                  <MdOutlineArrowBackIos className='text-white active:text-gray-400' size={30}
                    onClick={()=>handleScroll('LEFT')}/>
                </div>
                <div className='overflow-x-auto flex w-[calc(100%-87px)]' ref={scrollRef}>  
                {tabLists?.map((tabs, index)=>{
                  
                  return (
                     
                    <Tabs 
                      key = {`${index}+item`} index={index} 
                      tabNo= {seltdTab[1]}  
                      tabs={tabs?.tabs}
                      selTabs={seltdTab[0]===index? true : false} 
                      tabsHandler={tabsHandler}
                      hideBTabs={hideBTabs}
                      noOfTabs={tabLists.length}>
                      {
                        <div className='flex text-base justify-center px-2'>
                          <FaUser size={22} name={hideHeader? "down" : ''} 
                            className='cursor-pointer ml-1  hover:fill-[black]'
                        />
                        {tabs?.name}
                        </div>
                      }
                    </Tabs>
                    
                    );
                  })
                }
                </div>
                <div className='px-1 sm:px-2 self-end cursor-pointer'>
                  <MdOutlineArrowForwardIos className={`text-white active:text-gray-400 ${userType==='USER'? 'hidden' : ''}`} size={30}
                    onClick={()=>handleScroll('RIGHT')}/>
                </div>
                <div className='px-1 sm:px-2 self-end w-[40px]'>
                  

                    <MdClose
                      className='cursor-pointer  text-white text-[28px]  hover:text-[cyan]'
                      onClick={()=>setHideBTabs(!hideBTabs)}
                  />
                </div> 
        </div>       
  );
};

export default HeaderBar;





const Tabs=({children, hideBTabs, tabs,tabsHandler, tabNo, index, selTabs, noOfTabs})=>{

   const tabscont = `${hideBTabs && 'hidden'} border-t-[#94d0cf] text-black border-solid border-t-[2px] overflow-x-auto c-scrollbar whitespace-nowrap transition-all duration-300 flex flex-row items-center cursor-pointer`;
   const tabStyle= `flex px-2 text-[14px] sm:text-base justify-center items-center flex-1 bg-[#94d0cf] hover:bg-[cyan]`;
  return(
    <div className={`${selTabs? 'bg-[#3f9a98] text-white' : 'bg-[#226a6a] text-black'} z-20 mb-[1px] mr-[3px] py-0  border-2  border-solid 
        ${noOfTabs ===1? 'w-[98%]' :''}`}>

        <div className="block ">
            <div className="flex justify-center">{children}</div>
            <div className={tabscont}>
              {tabs?.map((tab, i)=>{
                return (
                  <h1  key = {`${i}+tab`} 
                    className={`${tabStyle} ${tabNo===i && selTabs? 'bg-[cyan]': 'bg-[#a6dcdc]'} mx-[1.5px] py-[2px]`}
                    onClick={()=>tabsHandler([index, i, tab])} >
                    {tab.name}
                  </h1>
                );
              })}
            </div>
           
        </div>
    </div>
  );
}