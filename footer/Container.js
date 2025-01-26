'use client'
import React from 'react';
import ColumnOne from './ColumnOne';
import ColumnTwo from './ColumnTwo';
import { usePathname } from 'next/navigation';

const Container = ({mapUrl, dataRes}) => {
    const pathname = usePathname();

   
   if(pathname === "/admin-login"){ return }
  
  return (
    <footer className="text-center text-white bg-[#0a4275] mt-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <ColumnOne/>
            <ColumnTwo mapUrl={mapUrl} dataRes={dataRes}/>
        </div>

        <div className="text-center text-xs sm:text-base p-4 py-10" style={{backgroundColor:'rgba(0, 0, 0, 0.2)'}}>
            © {dataRes?.copyWriteData?.textShort1}
        </div>
    </footer>
  )
}

export default Container