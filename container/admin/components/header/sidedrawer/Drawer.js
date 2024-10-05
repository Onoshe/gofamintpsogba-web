import React from 'react'
import Contents from './Contents'
import FastRecordLogo from '@/appLogo/FastRecord'



const Drawer = ({hideDrawer, setHideDrawer, pages, activePage, handleSelectedPage}) => {

  return (
    <div className={`fixed w-full bg-slate-600/45 h-screen top-0 bottom-0 ${hideDrawer? 'hidden' : ''}`}
      onClick={()=>setHideDrawer(true)} style={{zIndex:'60'}}>
      <div className={`w-[250px] h-screen bg-[#CCCCCC] `}>
        <div className='flex flex-col w-full bg-[#aaa] p-2 items-center'>
          <FastRecordLogo
                width={150} height={40}
                className={'py-2 pl-3 flex bg-[aliceblue]'}
            />
          <p className='text-[12px] text-gray-900 font-bold italic flex'>...simplifying your financial records</p>
        </div>
        <Contents 
            pages={pages} 
            activePage={activePage}
            handleSelectedPage={handleSelectedPage}
            hideTooltip
            styleIcon={`text-[blue] text-[28px]`}
            iconActiveCol={'text-[dodgerblue]'}
            iconInactiveCol={'text-gray-800'}
            styleCont={`py-4 px-2 flex flex-col`}
            //styleLink={`p-2 px-3 cursor-pointer flex flex-row gap-2 text-white font-bold`}
            styleLink={`p-2 px-3 rounded-md hover:border hover:bg-white hover:border-gray-400 hover:text-blue-700 cursor-pointer
                flex flex-row gap-2 text-[#234c7b] items-center`}
          />
      </div>
      <div className='fixed bottom-0 p-3 flex flex-wrap'>
          <p className='text-blue-800'>ozitechstudio@gmail.com</p>
      </div>
    </div>  
  )
}

export default Drawer