'use client'
import React from 'react'

const tabsArr = [{name:'home', title:'Home'}, {name:'subscriptions', title:'Subscriptions'}];

export const HeaderTab = ({tabs, setTabs}) => {

 const handleSelectedTab = (tab)=>{
    setTabs({...tabs, activeTab:tab})
 }

  return (
    <div className='w-full bg-blue-50 flex flex-row fixed z-50 lg:w-[calc(100vw-220px)] shadow-md'>
        {
            tabsArr.map((dt, i)=>{
                return (
                <div key={`${i}key`} className={`flex flex-1 active:translate-y-[1px] justify-center cursor-pointer py-1 sm:py-2 items-center text-gray-700 border border-white
                    ${tabs.activeTab.name === dt.name? 'bg-teal-200' : 'bg-gray-300'}`}
                    onClick={()=>handleSelectedTab(dt)}>
                    <p>{dt.title}</p>
                </div>)
            })
        }
    </div>
  )
}
