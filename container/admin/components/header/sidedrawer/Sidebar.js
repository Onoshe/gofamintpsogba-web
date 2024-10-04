import React from 'react'
import Contents from './Contents'


const Sidebar = ({pages, activePage}) => {

  return (
    <div className={`fixed z-50 h-screen border border-r-2 border-gray-500 top-0 hidden w-[220px] md:block`}>
        <Contents pages={pages} activePage={activePage}/>
    </div>  
  )
}

export default Sidebar