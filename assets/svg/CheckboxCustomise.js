import React from 'react';


const CheckboxCustomise = ({size, checked, setChecked, className,}) => {

    return (
        <>
            <div className="border-solid border-[#acacac] border-[1px] w-fit h-fit rounded-sm cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    width={size? size : 16} 
                    height={size? size : 16}
                    viewBox="0 0 16 16" 
                    className={className}
                    onClick={setChecked} 
                    >
                <path 
                    style={{fill:checked? '#2f7bf5' : 'white'}}
                    d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/>
                <path 
                    style={{fill:'white'}}
                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                </svg>
            </div>
        </>
  )
}

export default CheckboxCustomise;
