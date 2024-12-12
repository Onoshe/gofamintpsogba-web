'use client'
import React from 'react'
import { BsFillGearFill } from 'react-icons/bs';
import { MdOutlineHistory } from 'react-icons/md';

const tabsArr = [{name:'home', title:'Company Settings', icon:<BsFillGearFill size={19} color='teal'/>}, 
    {name:'subscriptions', title:'Subscriptions', icon:<MdOutlineHistory size={22} color='teal'/>}];

export const HeaderTab = ({tabs, setTabs}) => {

 const handleSelectedTab = (tab)=>{
    setTabs({...tabs, activeTab:tab})
 }

  return (
    <div className='w-full z-10 bg-blue-50 flex flex-row fixed  lg:w-[calc(100vw-220px)] shadow-md'>
        {
            tabsArr.map((dt, i)=>{
                return (
                <div key={`${i}key`} className={`flex flex-1 active:translate-y-[1px] justify-center cursor-pointer py-1 sm:py-2 items-center text-gray-700 border border-white
                    ${tabs.activeTab.name === dt.name? 'bg-teal-200' : 'bg-gray-300'}`}
                    onClick={()=>handleSelectedTab(dt)}>
                    {dt.icon} <p className='ml-2 text-center text-sm sm:text-base'>{dt.title}</p>
                </div>)
            })
        }
    </div>
  )
}
