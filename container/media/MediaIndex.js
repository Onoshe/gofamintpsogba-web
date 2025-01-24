import React from 'react';
import GalleryIndex from './components/_Index';
import ScrollToTopButton from '@/components/scrollToTop/ScrollToTopAuto';
import Image from 'next/image';
import logo from '@/assets/gofamintLogo.png';


const MediaIndex = ({mediaPhotos}) => {
  const header = "text-center md:px-10 text-xl text-[mediumblue] sm:text-4xl font-bold pt-10";
  return (
    <div className="bg-mainColor flex flex-col">
      <div className='justify-center hidden'>
       <Image src={logo} alt="logo" className="w-[80px] xsmc:w-[120px] smc:w-[150px] md:w-[220px]" />
      </div>
      <div className="w-full text-gray-600 flex  justify-center p-10 pt-0 flex-col relative">
          <h2 className={header}>GOFAMINT Pacesetters Ogba Photo Gallery<br/>
          </h2>
      </div>
      <GalleryIndex mediaPhotos={mediaPhotos}/>
      <ScrollToTopButton/>
    </div>
  );
};

export default MediaIndex;

