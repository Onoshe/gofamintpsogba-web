'use client'
import React from 'react';
import { BsPlusLg } from 'react-icons/bs';



const TabWrapper = ({children, classNameCont, activeTab, handleActiveTab, tab1Name, tab2Name, tab1Title, tab2Title, subTitle, hideIcon}) => {
  

  let activeTabTitle = activeTab=== tab1Name? tab1Title : tab2Title; 
  if(subTitle){ 
    activeTabTitle += " "+subTitle; 
  }   
  
  return (
      <div className={classNameCont}>
          <div className='p-4 flex flex-col bg-[aliceblue] border border-b-[#e4f1fd] smc:flex-row smc:items-center justify-between'>
            <p className='text-lg font-bold text-blue-700'>{activeTabTitle}</p>
            <div className='flex self-end gap-3 flex-col xsmc:flex-row'>
                <button className={`btn btn-sm smc:btn-md ${activeTab === tab1Name?  'btn-accent text-white' : 'bg-gray-300 text-black hover:bg-gray-300'}`}
                  onClick={()=>handleActiveTab(tab1Name)}>
                  {tab1Title}
                </button>
                <button className={`btn btn-sm smc:btn-md ${activeTab === tab2Name? 'btn-info text-white' :'bg-gray-300 text-black hover:bg-gray-300'} `} 
                  onClick={()=>handleActiveTab(tab2Name)}>{hideIcon? '' :<BsPlusLg size={23}/>} 
                  {tab2Title}
                </button>            
            </div>
          </div>
          {children}
      </div>
  )
}

export default TabWrapper