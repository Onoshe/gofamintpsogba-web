'use client'
import React from 'react';
import TypeAnimationComponent from './TextAnimation';


const Declaration = ({sequence, anchorBgImages, anchorSequence}) => {
  const contRef = React.useRef('');
  const [anim, setAnim] = React.useState(false);
  const imageBase = "";

  return (
    <div className="mt-8 mb-2">
        <div className='mb-10 w-full flex justify-center items-center'
        >
          <div className='w-full h-full bg-transparent flex justify-center items-center bg-center bg-contain 
              bg-no-repeat hover:bg-repeat px-5 sm:px-14 md:px-28 pb-5'
            style={{backgroundImage:`url(${imageBase})`,
              //clipPath:"polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
             }}
            ref={contRef}
            onMouseEnter={()=>setAnim(true)}
            onMouseLeave={()=>setAnim(false)}>

            <div className='font-meriendOne textShadowGoldWhite flex justify-center items-center font-bold text-2xl md:text-4xl text-center'>
            <TypeAnimationComponent
              sequence={anchorSequence}
             />
            </div>     
          </div>
      </div>
    </div>
  )
}

export default Declaration;

