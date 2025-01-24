import React from 'react'


const Spinner = ({size, show}) => {
  
  
  return (
          
    <div class={`items-center justify-center ${show? 'flex' : 'hidden'}`}>
      <div 
        className="rounded-full animate-spin"
        style={{height: size? `${size}px` : '20px', width: size? `${size}px` : '20px',
         borderTopColor:'#297799', borderWidth:'3px', 
         borderLeftColor:'#7dc8e8', borderBottomColor:'#c6e7f5'}}
        >
      </div>
    </div>
  )
}


export default Spinner