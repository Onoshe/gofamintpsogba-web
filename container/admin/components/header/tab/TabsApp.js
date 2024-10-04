
import React from 'react';
import Tabs from './Tabs';


const TabsApp = ({activePage,tabContStyle, selected, handleSelected, tabsArr, activeTab,handleHideDropdown, pages}) => {
  
  return (
    <div className={`bg-white w-full ${tabContStyle}`}>
      {tabsArr?.length &&
        <>
        <h1 className='hidden'>Responsive Tabs Example</h1>
        <Tabs tabs={tabsArr} 
          selected={selected}
          handleSelected={handleSelected}
          activeTab={activeTab}
          handleHideDropdown={handleHideDropdown}
        />
        <div className='flex-row items-center hidden'>
          <p className='pl-2 py-1 text-[#2358A1] font-bold'>{activePage}</p>
          <span>/</span>
          <p className=' py-1 text-[#2358A1] font-bold'>{activeTab?.tab?.title}</p>
        </div>
      </>}
    </div>
  );
};

export default TabsApp;