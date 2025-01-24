'use client'
import React from 'react';


const CustomizeModal = ({children, show,}) => {
    
    return (
        <div className={`bg-blackOverlay h-screen w-full fixed top-0 bottom-0
        ${show? '' :'hidden'} z-3 flex justify-center items-center content-center`}
            id="CustomModal">
            <div>
                {children}
            </div>
        </div>
        );
}


export default CustomizeModal