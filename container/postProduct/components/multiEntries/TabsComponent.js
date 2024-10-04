import React from 'react'

const TabsComponent = ({activeTab, setActiveTab, transSheetReset}) => {

    const activeStyle = `bg-[cyan] active:translate-y-[1px] text-[blue] active:bg-cyan-300 py-1 border-2 border-white cursor-pointer`;
    const inactiveStyle = `bg-sky-100 py-1 cursor-pointer border-2 border-[silver]`;

    const handleTabsNav =(tab)=>{
        setActiveTab(tab);
        transSheetReset(tab);
    }

return (
    <div className='p-1 mx-2 text-[12px] smc:text-sm smc:mx-8 mt-2 text-[#b1afaf] flex flex-row gap-2 bg-gray-300 w-fit'>
        <p className={`w-[80px] smc:w-[100px] text-center ${activeTab === 'TAB1'? activeStyle : inactiveStyle}`}
            onClick={()=>handleTabsNav('TAB1')}>Purchase</p>
        
        <p className={`w-[80px] smc:w-[100px] text-center ${activeTab === 'TAB2'? activeStyle : inactiveStyle}`}
            onClick={()=>handleTabsNav('TAB2')}>Sale</p>
        
        <p className={`w-[80px] smc:w-[100px] text-center ${activeTab === 'TAB3'? activeStyle : inactiveStyle}`}
            onClick={()=>handleTabsNav('TAB3')}>Adjustment</p>
    </div>
  )
}

export  {TabsComponent}