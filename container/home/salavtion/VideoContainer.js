'use client'
import React from 'react';
import VideoPlayer from './VideoPlayer';



const VideoContainer = ({salVideoUrl}) => {

  return (
    <div className='flex items-center justify-center flex-col mx-1 sm:mx-5 2xl:mr-0'
        >
        <VideoPlayer salVideoUrl={salVideoUrl}/>
    </div>
  )
}

export default VideoContainer;

