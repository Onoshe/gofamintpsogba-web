import React from 'react'

const Accordion = ({title, titleStyle, contents, contentsStyle, contStyle}) => {
  return (
    <div className={`collapse collapse-arrow bg-white border border-gray-400 rounded-md ${contStyle}`}>
        <input type="radio" name="my-accordion-2" defaultChecked /> 
        <div className={`collapse-title bg-[#eee] ${titleStyle}`}>
            {title}
        </div>
        <div className={`collapse-content ${contentsStyle}`}> 
            {contents}
        </div>
    </div>
  )
}


export default Accordion