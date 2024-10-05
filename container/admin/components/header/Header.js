import FastRecordLogo from '@/appLogo/FastRecord'
import React from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import Contents from './sidedrawer/Contents';



const Header = ({handleMenu, pages, activePage,activeTab, handleSelectedPage, userId}) => {

  return (
    <header className="text-white text-center z-20 bg-white fixed w-full top-0 h-[80px] overflow-hidden">
        <div data-theme="aqua" 
          className='py-2 z-50 px-3 flex items-center justify-between h-full'
         >
            <div className='flex flex-row'
              >
              <BiMenuAltLeft size={28} className='mr-4 cursor-pointer md:hidden'
                onClick={handleMenu}
              />
              <div className='flex-col hidden lg:flex'>
                <FastRecordLogo
                      width={150} height={40}
                      className={'py-2 pl-3 flex bg-[aliceblue]'}
                  />
                <p className='text-[12px] text-[yellow] italic flex'>...simplifying your financial records</p>
              </div>
            </div>
            <div className='flex flex-col '>
              <div className='flex flex-row items-center text-[#93f6f6]'>
                  <p className='pl-2 py-1  font-bold'>{activePage}</p>
                  <span>/</span>
                  <p className=' py-1 font-bold'>{activeTab?.tab?.title}</p>
              </div>
              <p className='text-[12px] text-right md:hidden'>{userId}</p>
            </div>
            <div className={`hidden md:block`}>
               <Contents 
                  pages={pages} 
                  handleSelectedPage={handleSelectedPage}
                  activePage={activePage}
                  styleTitle={`hidden`}
                  styleIcon={`text-[28px]`}
                  iconActiveCol={'text-[#93f6f6]'}
                  iconInactiveCol={'text-white'}
                  styleCont={`py-4 gap-3 flex flex-row -mt-4`}
                  styleLink={`p-2 pr-0  cursor-pointer flex flex-row gap-2 text-white font-bold`}
                  //styleLink={`p-2 px-3 rounded-md hover:border hover:bg-white hover:border-gray-400 hover:text-blue-700 cursor-pointer flex flex-row gap-2 text-blue-700 font-bold`}
               />
               <p className='text-[12px] -mt-4 text-right pr-2'>{userId}</p>
            </div>
        </div>
    </header>
  )
}

export default Header