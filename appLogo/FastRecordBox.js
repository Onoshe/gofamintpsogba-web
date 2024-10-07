import React from 'react';
import Image from 'next/image';



const FastRecordBox = ({className, width, height,}) => {
 
  
  return (
      <div
        className='animate-spin'
        >
        <Image src="/QuickRecordsLogoTN.png" alt="FastRecord Logo"
            width={width? width : 100}
            height={height? height : 40} 
            priority={true}
            className={`object-cover ${className}`}
        />
      </div>
  )
}

export default FastRecordBox