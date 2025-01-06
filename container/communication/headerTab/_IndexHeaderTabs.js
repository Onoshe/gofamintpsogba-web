'use client'
import React from 'react';


const IndexHeaderTabs = ({headersArr,headerTab, selectedTab, setSelectedTab}) => {
  

  return (
    <div className={`flex flex-row bg-[#373c46]`}>
        <div className={`flex flex-row gap-2 overflow-x-auto mx-2 my-1`}>
            {
                headersArr?.map((tab, i)=>{
                    const myTab = headerTab[tab];
                    return(
                        <div key={`${i}+key`}
                         className={`cursor-pointer ${selectedTab.name === myTab.name? 'bg-[cyan] text-black border-white' : 'bg-[steelblue] text-gray-300 border-blue-900'} border px-4 py-1 whitespace-nowrap`}
                         onClick={()=>setSelectedTab(myTab)}>
                            {myTab.tabName}
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default IndexHeaderTabs