'use client'
import React from 'react'
import logo from '@/assets/gofamintLogo.png';
import { gofamintPS, gofamintChurch, gofamintAim, gofamintAimBibleRef, bibleVerses, gofamintStmtOfPurpose } from '@/assets/data/data'; 
import { memberCovenants, memberCovenantHeader, memberCovenant1, memberCovenant2,
  memberCovenant3, memberCovenant4, memberCovenant5 } from '@/assets/data/data2';
import { TooltipCustomised } from '@/components/toolTip/ToolTipCustomised';
import ScrollToTopButton from '@/components/scrollToTop/ScrollToTopAuto';
import Image from 'next/image';


const AboutIndex = ({dataRes}) => {
  const header = "text-center md:px-10 md:text-left text-xl text-[mediumblue] sm:text-4xl font-bold pt-10";
  const headerSub = "text-center md:px-10 md:text-left text-lg text-gray-600 sm:text-2xl font-bold pt-5";
  const paraf = "text-justify text-lg sm:text-2xl  p-[0] py-5 md:px-10";
  
  React.useEffect(()=>{
    //Auto scroll to top on load
      window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
      });
  },[]);

  return (
    <div className="bg-mainColor flex flex-col">
      <Image src={''} alt="backgroundImage" className="w-full h-screen fixed" style={{opacity:0.03}}/>
      <div className='flex justify-center'>
       <Image src={logo} alt="logo" className="w-[80px] xsmc:w-[120px] smc:w-[150px] md:w-[220px]" />
      </div>
      <div className="w-full text-gray-600 flex justify-center py-10 px-3 sm:px-5 pt-0 flex-col relative">
          <h2 className={header}>GOFAMINT Pacesetters Ogba<br/>
              <span className="text-lg text-gray-600 sm:text-2xl">(District Headquaters)</span>
          </h2>
          <h2 className={paraf}>{dataRes?.aboutData?.textShort1}</h2>
          <h2 className={paraf}>{dataRes?.aboutData?.textMedium1}</h2>
          <h2 className={paraf}>{dataRes?.aboutData?.textShort2}</h2>

          <h2 className={header}>GOFAMINT Worldwide</h2>
          {gofamintChurch.map((text, i)=>{

            return <h2 className={paraf} key={`${i}+key`}>{text}</h2>
          })} 
          
          <h2 className={header}>Our Statement of Purpose</h2>
          <h2 className={paraf}>{gofamintStmtOfPurpose}</h2>

          <h2 className={header}>Our Membership Covenant</h2>
            <h2 className={paraf}>{memberCovenantHeader}</h2>

            <h2 className={headerSub}>{memberCovenants[0]}</h2>
              {memberCovenant1.map((text, i)=>{
                  return (
                        <h2 className={paraf} key={`${i}+keys`}>
                          {text}
                        </h2>                
                  );
                  })} 
              <h2 className={headerSub}>{memberCovenants[1]}</h2>
                {memberCovenant2.map((text, i)=>{
                    return (
                          <h2 className={paraf} key={`${i}+keys`}>
                            {text}
                          </h2>                
                    );
                    })} 
                <h2 className={headerSub}>{memberCovenants[2]}</h2>
                  {memberCovenant3.map((text, i)=>{
                      return (
                            <h2 className={paraf} key={`${i}+keys`}>
                              {text}
                            </h2>                
                      );
                      })} 
                    <h2 className={headerSub}>{memberCovenants[3]}</h2>
                    {memberCovenant4.map((text, i)=>{
                        return (
                              <h2 className={paraf} key={`${i}+keys`}>
                                {text}
                              </h2>                
                        );
                        })} 

                      <h2 className={headerSub}>{memberCovenants[4]}</h2>
                      {memberCovenant5.map((text, i)=>{
                          return (
                                <h2 className={paraf} key={`${i}+keys`}>
                                  {text}
                                </h2>                
                          );
                          })} 
            

          <h2 className={header}>Our AIM</h2>
          {gofamintAim.map((text, i)=>{

            return (
              
                <TooltipCustomised
                  key={`${i}+key`}
                  textmain={text}
                  texthover= {gofamintAimBibleRef[i]}
                  hovertext={bibleVerses[i]}
                />
              
            );
          })}       
      </div>
      <ScrollToTopButton/>
    </div>
  )
}

export default AboutIndex
