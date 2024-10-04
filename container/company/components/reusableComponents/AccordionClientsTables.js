import React from 'react'

const AccordionClientsTables = ({title, titleStyle, clientTab, contentsStyle, contStyle, table}) => {
  return (
    <div className={`collapse mb-3 collapse-arrow bg-white border border-gray-400 rounded-md ${contStyle}`}>
        <input type="checkbox"/> 
        <div className={`collapse-title bg-[#eee] ${titleStyle}`}>
            {title}
        </div>
        <div className={`collapse-content ${contentsStyle}`}> 
        {clientTab?.map((el, i)=>{
            //const key = Object.keys(el);
            //console.log(key)
            return(
                <div key={`${i}key`} className={`py-1 ${i===0? 'pt-3' :''}`}>
                 {table === "USERS"?
                  <>{i+1}. {el.firstname}  {el.lastname} - {el.userId}</>
                  :<>{i+1}. {el.TABLE_NAME} - {el.TABLE_ROWS}</> 
                 }
                </div>
            )
          })}
        </div>
    </div>
  )
}


export default AccordionClientsTables