import React from 'react'

const SvgImagebackground = ({childen}) => {
  
  
return (
     <div //style={{position: 'relative', height:'400px', width:'6', backgroundColor:'red'}}
        className='relative h-340 w-[100%] bg-red-600'>
        Hello There, how are you?
        <svg
            //width={450}
            //height={200}
            //style={{width:'100%', height:'100%', position:'absolute'}}
            className="absolute top-0 left-0 bottom-0"
            viewBox="0 0 476.24999 264.58334"
            version="1.1"
            id="svg5"
            xmlns="http://www.w3.org/2000/svg"
            >
                <path
                style={{fill:'#ffacac', fillOpacity:0.993007, strokeWidth:0.335967, opacity:0.5}}
                d="M 0,1.5000765 H 475.52426 V 225.01148 l -236.26205,40.50206 v 0 0 L 0,225.01148 Z"
                />
                <path
                style={{fill:'#acacac', fillOpacity:0.993007, strokeWidth:0.335967}}
                d="M 0,1.5000765 H 475.52426 V 211.04201 L 239.26221,249.0127 v 0 0 L 0,211.04201 Z"
                />
        </svg>
        
    </div>
  )
}

export default SvgImagebackground


