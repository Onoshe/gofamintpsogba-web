'use client'
import React, { useEffect, useRef, useState } from "react";
import FiveStarScroll from "./FiveStarScroll";
import InfiniteHorizontalScroll from "./InfiniteScroll";
//https://www.builder.io/blog/scrolling-logo-animation-tailwindcss
/* eslint-disable @next/next/no-img-element */


const LogoCarousel = ({photos}) => {
  const logosRef = useRef(null);

  useEffect(() => {
    const ul = logosRef.current;

    // Duplicate the list for infinite scrolling effect
    if (ul) {
      const clone = ul.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      ul.parentNode.appendChild(clone);
    }
  }, []);

 // <div className='bg-center bg-cover rounded-t-lg h-[170px] smc:h-[200px] lg:h-[230px] flex justify-center items-center'
 // style={{backgroundImage:`url(${photo.src})`}}>

  return (
    <div className="">
      <div className='p-5 mx-0 w-full  bg-purple-900'>
          <h1 className='text-[white] font-meriendOne text-bold text-base xsmc:text-lg smc:text-xl md:text-2xl lg:text-4xl 
              flex justify-center text-bold text-center'>
              We are Positioned to Raise A Five Star Church
          </h1>
      </div>

        <div className="flex overflow-hidden space-x-16 relative group"
        style={{backgroundImage:`url(${'/bgroundHome.jpg'})`}}>
          <div className="flex space-x-10 py-10 animate-loop-scroll group-hover:paused">
            {
              [...photos, ...photos, ...photos]?.map((el, i)=>{
                const bounceNo = i%5;
                return(
                  <img key={`key${i}`} loading="lazy" src={el} className={`max-w-none h-[60vh] animate-bounceCard${bounceNo} cursor-pointer hover:animate-scaleCard shadow-[0_0_10px_#a1f4de]`} alt={el.alt}/>
                )
              })
            }
          </div>
          <div className="flex space-x-10 py-10 animate-loop-scroll group-hover:paused" aria-hidden="true">
          {
              [...photos, ...photos, ...photos]?.map((el, i)=>{
                const bounceNo = i%5;
                return(
                  <img key={`key2${i}`} loading="lazy" src={el} className={`max-w-none h-[60vh] animate-bounceCard${bounceNo} cursor-pointer hover:animate-scaleCard shadow-[0_0_10px_#a1f4de]`} alt={el.alt}/>
                )
              })
            }
          </div>
      </div>
    </div>
  );
};

const Banner = () => {
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    bannerOpen && (
      <div className="fixed bottom-0 right-0 w-full md:bottom-6 md:right-12 md:w-auto z-50">
        <div className="bg-slate-800 text-sm p-3 md:rounded shadow flex justify-between">
          <div className="text-slate-500 inline-flex">
            <a
              className="font-medium hover:underline text-slate-300"
              href="https://cruip.com/create-an-infinite-horizontal-scroll-animation-with-tailwind-css/"
              target="_blank"
              rel="noreferrer"
            >
              Read Tutorial
            </a>
            <span className="italic px-1.5">or</span>
            <a
              className="font-medium hover:underline text-indigo-500 flex items-center"
              href="https://github.com/cruip/cruip-tutorials/blob/main/logo-carousel/index.html"
              target="_blank"
              rel="noreferrer"
            >
              <span>Download</span>
              <svg
                className="fill-indigo-400 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="9"
              >
                <path d="m1.649 8.514-.91-.915 5.514-5.523H2.027l.01-1.258h6.388v6.394H7.158l.01-4.226z" />
              </svg>
            </a>
          </div>
          <button
            className="text-slate-500 hover:text-slate-400 pl-2 ml-3 border-l border-slate-700"
            onClick={() => setBannerOpen(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-4 h-4 shrink-0 fill-current"
              viewBox="0 0 16 16"
            >
              <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
            </svg>
          </button>
        </div>
      </div>
    )
  );
};

export default LogoCarousel;


/*
<div className="flex space-x-16 animate-loop-scroll group-hover:paused">
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ee9f161-df19-4fa7-a2a6-edf9acf0e0d6?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 1" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/80480f8a-69ad-4c30-88ba-f4e7ee08fc51?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 2" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/140d376c-13f2-4823-b397-b3de733bf560?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 3" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ae217f1-b695-4661-bd3d-6440eebc2c5c?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 4" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/67017079-51e1-4245-9bf1-b5957eb66c74?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 5" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/515313ac-7ec9-4c6e-95db-80dac2f8b960?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 6" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c513fc32-3ab9-4cca-911e-0b2642ac7206?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 7" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5731a5a7-689f-49ae-abf1-6e6dc00c2043?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 8" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb51d286-530f-42be-9e91-9c850522f127?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 9" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/44ba8437-f6fd-4a51-bfd3-262d7528f7a4?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 10" />
  </div>
  <div className="flex space-x-16 animate-loop-scroll group-hover:paused" aria-hidden="true">
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ee9f161-df19-4fa7-a2a6-edf9acf0e0d6?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 1" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/80480f8a-69ad-4c30-88ba-f4e7ee08fc51?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 2" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/140d376c-13f2-4823-b397-b3de733bf560?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 3" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ae217f1-b695-4661-bd3d-6440eebc2c5c?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 4" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/67017079-51e1-4245-9bf1-b5957eb66c74?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 5" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/515313ac-7ec9-4c6e-95db-80dac2f8b960?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 6" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c513fc32-3ab9-4cca-911e-0b2642ac7206?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 7" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5731a5a7-689f-49ae-abf1-6e6dc00c2043?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 8" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb51d286-530f-42be-9e91-9c850522f127?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 9" />
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/44ba8437-f6fd-4a51-bfd3-262d7528f7a4?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&" className="max-w-none" alt="Image 10" />
  </div>
*/