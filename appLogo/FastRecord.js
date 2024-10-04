'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const FastRecordLogo = ({className, width, height, dynamicPage, activePage, goToDashboard, dispatchActivePage, dispatchIsOpen, dispatchShowLoadingNavPage}) => {
  //const href= `/${dynamicPage}`;
  
  const goToDashboardPage =()=>{
    const pg = dynamicPage;
    
    if(goToDashboard) {
      if(pg === activePage.name) return //to prevent error
      dispatchShowLoadingNavPage(true);
      const dashboardPage = {name:dynamicPage, title:"Dashboard"};
      dispatchActivePage(dashboardPage);
      dispatchIsOpen(false)
    }
  }
  

  return (
      <div 
        //onClick={goToDashboardPage}
        >
        <Image src="/countingXpressLogo.png" 
            alt="Placeholder Image"
            //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            width={width? width : 100}
            height={height? height : 40} 
            className={`object-cover ${className}`}
        />
      </div>
  )
}

export default FastRecordLogo