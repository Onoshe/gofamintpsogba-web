import React from 'react';
import {BsCloudDownload, BsFillPinAngleFill} from 'react-icons/bs';
import Image from 'next/image';



const UpcomingPrograms = ({showFlyer, showVideoClip, videoClipUrl, bgImageUrl, muted, featured, inviteText,  flyerUrl }) => {

  return (
        <div className='w-full h-full bg-gradient-to-r from-[mediumblue]/80 to-[red]/80 backdrop-blur-[2px]'>
          <div className={`my-3 ml-3 w-fit font-bold flex flex-row  pr-10  py-2 bg-slate-200 text-blue-700 text-center text-lg
                ${featured? '' :'invisible'}`}>
            <BsFillPinAngleFill size={32} color="#e23c9a" className='mr-5 ml-5'/>  
            <h1 className='text-lg md:text-3xl'>{featured}</h1>
          </div>
          <div className={`${showVideoClip? 'lg:grid-cols-2' : ''} grid grid-cols-1 gap-2 
            `}>
              <div className={`${showFlyer? 'flex' : 'hidden'} flex-1 relative justify-center`}>
                  <Image 
                      src={flyerUrl} 
                      width={500}
                      height={500}
                      alt="Upcoming program flyer" 
                      className='flex max-h-[80vh] md:max-h-[90vh]'/>
                  <div className='absolute hidden bottom-12 right-16 bg-gray-500 p-3 rounded-full active:bg-gray-200 hover:bg-blue-700'>
                      <a className='' 
                          href={`#`}
                          download
                          onClick={e=>e.stopPropagation()}>
                          <BsCloudDownload size={20} color="white"
                              className='cursor-pointer'/>
                      </a>
                  </div>
              </div>
              <div className={`${showVideoClip? 'flex' : 'hidden'} flex-1 relative mt-3 md:mt-0 
                  bg-center bg-contain`}
                  style={{backgroundImage:`url(${bgImageUrl})`}}>
                  <div className='bg-[rgb(120,100,150,0.9)] w-full h-full flex justify-center'
                    >
                    <video
                        src={videoClipUrl}
                        type="video/mp4"
                        loop
                        controls
                        muted={muted}
                        autoPlay
                        className=" max-h-[80vh] object-contain"
                    />
                  </div>
                  <div className='hidden absolute bottom-12 right-16 bg-gray-500 p-3 rounded-full active:bg-gray-200 hover:bg-blue-700'>
                      <a className='' 
                          href={`#`}
                          download
                          onClick={e=>e.stopPropagation()}>
                          <BsCloudDownload size={20} color="white"
                              className='cursor-pointer'/>
                      </a>
                  </div>
              </div>
          </div>
          <h1 className='flex italic pr-6 justify-end text-white text-lg pt-5 pb-4'>
              {inviteText || '...kindly make it a date with us!'}
          </h1>
        </div>
  )
}

export default UpcomingPrograms


























