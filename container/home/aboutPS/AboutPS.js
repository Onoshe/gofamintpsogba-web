'use client'
import React from "react";
import Image from "next/image";
import Anchor from "../anchorDeclaration/anchor/Anchor";
import Declaration from "../anchorDeclaration/declaration/Declaration";
import { useRouter } from "next/navigation";
import './anchorStyle.css';
/* eslint-disable @next/next/no-img-element */

  
const AboutPS =({backgroundImg, anchor, sequence, anchorBgImages,dataRes, latestAnchorAndFaith})=>{
    const router = useRouter();
    const aboutPageHandler = ()=>{
        router.push('/about')
    };
    //console.log(latestAnchorAndFaith)
    
    return(
        <div className="w-full text-gray-600 flex justify-center py-10 px-5 flex-col relative overflow-x-hidden">
           {anchor && <Anchor text={anchor}/>}
            {/*<Image src={backgroundImg} 
                alt="backgroundImage" 
                className="w-[100%] h-[90%] absolute mt-10" 
                style={{opacity:0.03, zIndex:0}}
                width={100}
                height={24}
                />*/}
            <div className='flex flex-col xl:flex-row'>
              <div className='xl:w-[50%] z-20'>
                <h2 className="text-center text-xl text-[tomato] sm:text-4xl font-bold pt-10">GOFAMINT Pacesetters Ogba<br/>
                    <span className="text-lg text-gray-600 sm:text-2xl">(District Headquaters)</span>
                </h2>
                <h2 className='text-justify text-lg sm:text-2xl sm:text-left p-[0] py-5 md:px-10'>{dataRes?.aboutData?.textShort1}</h2>
                <h2 className='text-justify text-lg sm:text-2xl sm:text-left p-[0] py-5 md:px-10'>{dataRes?.aboutData?.textMedium1}</h2>
                <h2 className='text-justify text-lg sm:text-2xl sm:text-left p-[0] py-5 md:px-10'>{dataRes?.aboutData?.textShort2}</h2>
                <h2 className='text-lg sm:text-2xl text-blue-700 text-bold text-left p-[0] py-5 md:px-10 z-10'>
                  <span className='cursor-pointer hover:text-[mediumblue] '
                  onClick={aboutPageHandler}>Read more...</span>
                </h2>
              </div>
              
              <div className='relative flex h-[40vh] justify-center items-center xl:flex-1'>
              <p className="w-full text-center pt-3 text-4xl font-meriendOne font-bold text-[goldenrod] text-flicker-out-glow absolute top-0">
                Year {latestAnchorAndFaith?.textShort1}
              </p>
              <img src={anchorBgImages} alt="Gofamint Anchor" className="hidden animista1 absolute w-auto h-[40vh] xl:mt-40" style={{opacity:0.3, zIndex:0}}/>
              <div
                  className="animista1 absolute w-full h-[40vh] xl:mt-40"
                  style={{
                    backgroundImage: `url(${anchorBgImages})`,
                  }}
                />
                {dataRes?.anchorSequence?.length? 
                  <Declaration
                    sequence={sequence}
                    anchorBgImages={anchorBgImages}
                    anchorSequence={dataRes?.anchorSequence}
                    latestAnchorAndFaith={latestAnchorAndFaith}
                  />
                :
                <></>
                }
              </div>
            </div>
        </div>
    );
  }
  

  export default AboutPS;

  const gofamintPS=[
    "Pacesetters Assembly (PS), is an assembly church of The Gospel Faith Mission International (GOFAMINT).",
    "It is the District Headquarters church (Ogba District) under Region 12. The present residing pastor of the church is Pastor Kehinde Ogundare (Chief Magistarte of the Lagos State Government) and the current District Pastor of Ogba District is Pastor (Engr.) Francis Omoniyi",
    "The church is located at Ogba in Ikeja LGA of Lagos State.",
  ];
  
  
  const queryBgImage = `*[ _type == 'upcomingPrograme' && name=="BulletinCover" ][0]{
    "imageUrl": flyer.asset->url 
    }
  `;
  
  const text = {
    anchor:'Anchor 2023: Yes, the LORD will give what is good; And our land will yield its increase. Psalm 85:12'
  }

  
  //<div style={{backgroundSize:'100% 100%',height:'500px',width:'600px',  backgroundPosition:'center', objectFit:'cover', backgroundRepeat:'no-repeat', backgroundColor:'red',  backgroundImage:`url(${bgImage})`}}></div>
  /*
  *[ _type == 'upcomingPrograme' && name=="BulletinCover" ] | order(_createdAt desc){
    flyer{asset->{url}},
    "imageUrl": flyer.asset->url
  }*/