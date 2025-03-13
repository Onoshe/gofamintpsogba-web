import React from 'react';
import { facebook, x, whatsapp, linkedin, telegram } from './mediaIcons';



export default function ShareButton({size=64, networkName, borderRadius=0, className, handleOnClick }) {
    
    const icons = {
        facebook,
        x,
        whatsapp,
        linkedin,
        telegram
    };
   
   let media = icons[networkName];

    return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={`cursor-pointer hover:opacity-80 active:opacity-100 ${className}`}
     onClick={()=>handleOnClick(media.networkName)}>
      {media?.round ? (
        <circle cx="32" cy="32" r="32" fill={media?.color} //style={bgStyle} 
        />
      ) : (
        <rect
          width="64"
          height="64"
          rx={borderRadius}
          ry={borderRadius}
          fill={media?.color}
          //style={bgStyle}
        />
      )}

      <path d={media?.path} fill="white" />
    </svg>
  );
};


