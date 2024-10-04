import Link from 'next/link';
import React from 'react';


const Contents = ({pages, styleLink, styleCont, styleIcon, iconActiveCol, hideTooltip, iconInactiveCol, styleTitle,handleSelectedPage, activePage}) => {
 
  
 return (
      <div className={styleCont}>
        {pages.map((page, i)=>{
          return(
            <Link href={page.name==="LOGOUT"? '/' :page.route} key={`${i}pages`} 
              className={`${styleLink} ${hideTooltip? '' : 'tooltip tooltip-left'}`}
                data-tip={page.title}
                onClick={()=>handleSelectedPage(page)}>
                <p className={`${page.route===activePage? iconActiveCol : iconInactiveCol} ${styleIcon}`}>{page.icon}</p>
                <p className={`${page.route===activePage? iconActiveCol : iconInactiveCol} ${styleTitle}`}>{page.title}</p>
            </Link>
          )
        })}
      </div>
  )
}

export default Contents;
