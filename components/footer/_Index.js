'use client'
import React from 'react';
import ColumnOne from './ColumnOne';
import ColumnTwo from './ColumnTwo';



const FooterIndex = ({mapUrl}) => {
  return (
    <footer className="text-center text-white bg-[#0a4275] mt-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <ColumnOne/>
            <ColumnTwo mapUrl={mapUrl}/>
        </div>

        <div className="text-center text-xs sm:text-base p-4 py-10" style={{backgroundColor:'rgba(0, 0, 0, 0.2)'}}>
            © 2023 GOFAMINT PS Ogba Media
        </div>
    </footer>
  )
}

export default FooterIndex