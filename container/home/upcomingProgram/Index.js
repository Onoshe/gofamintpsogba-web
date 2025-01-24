'use client'
import React from 'react';
import pairKeyValue from '@/lib/pairKeyValue';
import { useInView } from "framer-motion";
import UpcomingPrograms from './components/_Container';
import useDevStore from '@/context/useDevStore';



const UpcomingProgramsIndex = ({upcomingProgSettings, upcomingPrograme}) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref);
  
    const publishProgram = upcomingProgSettings?.group;
    const showFlyer = upcomingProgSettings?.groupSub;
    const showVideoClip = upcomingProgSettings?.textShort1;
    const contStyle = upcomingProgSettings?.textShort2;
    const muted = upcomingProgSettings?.textShort3? true : false;
    const inviteText = upcomingProgSettings?.textMedium1;
    const featured = upcomingProgSettings?.textMedium2;
    const flyerUrl = upcomingPrograme?.imgPath;
    const videoClipUrl = upcomingPrograme?.videoClipPath;

  
  return (
    <div className={`${publishProgram? 'flex' : 'hidden'} mt-10 flex-col bg-center bg-cover
        ${contStyle}`}
        style={{backgroundImage:`url(${flyerUrl})`,
            transform: isInView ? "none" : "translateY(400px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
        }}
        ref={ref}>
          <UpcomingPrograms
            showFlyer={showFlyer} 
            flyerUrl={flyerUrl}
            showVideoClip={showVideoClip}
            videoClipUrl={videoClipUrl}
            bgImageUrl={''}
            muted={muted}
            inviteText={inviteText}
            featured={featured}
          />
    </div>
  )
}

export default UpcomingProgramsIndex