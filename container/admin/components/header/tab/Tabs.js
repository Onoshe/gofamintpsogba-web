'use client'
import useContainerDimension from '@/lib/hooks/useContainerDimension';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BiCaretDown } from 'react-icons/bi';


const Tabs = ({ tabs, activeTab, selected, handleSelected, handleHideDropdown }) => {
  const [visibleTabs, setVisibleTabs] = useState([]);
  const [overflowTabs, setOverflowTabs] = useState([]);
  const contRef = useRef();
  const tabRef = useRef();
  const contDimen = useContainerDimension(contRef);


  const updateChildrenVisibility = () => {
    if (contDimen.width) {
      let parentWidth = contDimen.width;
      parentWidth = parentWidth -50;
      const numChildrenFit = Math.floor(parentWidth / 150);
    
      const visibleTabs = [...tabs].slice(0, numChildrenFit);
      const overflowTabs = [...tabs].slice(numChildrenFit);
      setVisibleTabs(visibleTabs);
      setOverflowTabs(overflowTabs);
    }
  };

  React.useEffect(()=>{
    if(activeTab.hideDropdown){
      //handleHideDropdown(false);
    }
  },[activeTab?.hideDropdown]);

  useEffect(() => {
    updateChildrenVisibility();
  }, [contDimen.width]);


  return (
    <div className="flex h-full overflow-hidden whitespace-nowrap" ref={contRef}>
      {visibleTabs.map((tab, index) => (
        <div
          className={`px-4 py-2 text-[#2358A1] flex flex-row justify-center items-center gap-2 hover:text-[dodgerblue] h-fit ${activeTab.index===index? 'bg-white' :'bg-[#ddd]'} mr-[1px] text-[13px] font-bold cursor-pointer  transition-colors duration-300`}
          key={index}
          ref={tabRef}
          onClick={()=>handleSelected(index, tab)}
        >
          {tab.icon}
          {tab.title}
        </div>
      ))}
      {overflowTabs.length > 0 && (
        <div className={`relative group bg-slate-400 flex-1 ${activeTab.index==='-1'? 'bg-white' :'bg-[#dedede]'}`}>
          <div className={`px-2 py-2 inline-block cursor-pointer font-bold h-fit hover:text-[dodgerblue] text-[#2358A1] text-[13px] transition-colors duration-300`}
            onClick={()=>handleSelected('-1', activeTab.tab)}>
            <BiCaretDown className='inline-block'/>
            More
          </div>
    
            <div className="fixed bg-gray-300 shadow-lg group-hover:block hidden">
            {overflowTabs.map((tab, index) => (
              <div className={`px-4 py-2 cursor-pointer whitespace-nowrap hover:bg-gray-100 ${activeTab?.tab?.id === tab.id? 'bg-white' :'bg-[#bebdbd]'} ${activeTab.hideDropdown? 'hidden' :''}`} key={index}
                onClick={()=>handleSelected('-1', tab, true)}>
                {tab.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;