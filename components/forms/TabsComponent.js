import React from 'react'

const TabsComponent = ({activeTab, setActiveTab, tab1Name, tab2Name, tab1Title, tab2Title}) => {

    const activeStyle = `bg-[cyan] active:translate-y-[1px] text-[blue] active:bg-cyan-300 py-1 px-4 border-2 border-white cursor-pointer`;
    const inactiveStyle = `bg-sky-100 py-1 px-4 cursor-pointer border-2 border-[silver]`;

return (
    <div className='p-1 mx-8 mt-2 text-[#b1afaf] flex flex-row gap-2 bg-gray-300 w-fit'>
        <p className={`${activeTab === tab1Name? activeStyle : inactiveStyle}`}
            onClick={()=>setActiveTab(tab1Name)}>{tab1Title}</p>
        <p className={`${activeTab === tab2Name? activeStyle : inactiveStyle}`}
            onClick={()=>setActiveTab(tab2Name)}>{tab2Title}</p>
    </div>
  )
}

export  {TabsComponent}