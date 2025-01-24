'use client'
import React from 'react';
import SalvationCard from './SalvationCards';
import VideoContainer from './VideoContainer';


const Index = ({salavtionPhotos, salVideoUrl}) => {
  const contRef = React.useRef('');
  
  //http://localhost/psogbaasset/official_website/videos/PassionOfChristTrillerConverted.mp4
  //http://localhost/psogbaasset/official_website/videos/PassionOfChristTrillerConverted.mp4

  return (
        <div className='w-full  bg-transparent flex justify-center items-center bg-center bg-cover 
              bg-no-repeat hover:bg-repeat  my-8'
            style={{backgroundImage:`url(${salavtionPhotos[2]})`}}
            >
            <div className='w-full h-full bg-[rgba(129,54,134,0.8)] pb-5 pt-10 lg:pt-14'
                ref={contRef}
            >
            <p className='text-3xl md:text-5xl text-white text-center px-5 font-permanent_Marker
                    lg:pb-5 mb-7 lg:mb-0'>
                Have you been saved?
            </p>
            <p className='text-lg hidden lg:block md:text-3xl text-yellow-300 text-center  pb-8 font-archivo'>
                Steps to Salvation
            </p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0'>   
               
                <VideoContainer salVideoUrl={salVideoUrl}/>
                <p className='text-lg lg:hidden md:text-2xl text-yellow-300 text-center py-5 font-archivo'>
                    Steps to Salvation
                </p>
                <div className='flex flex-col'>
                    <SalvationCard
                        photo={salavtionPhotos[7]}
                        steps='Step 1'
                        topic="Acknowledge your sins. Romans 3:23"
                        bibleRef={bibleRefs.ref1}
                        styles
                        item
                        transform={"translateX(-200px)"}
                        transition={"all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"}/>
                    <SalvationCard
                        photo={salavtionPhotos[8]}
                        steps='Step 2'
                        topic="Confess your sins and repent of them. Gal.5:19-21; Acts 3:19"
                        bibleRef={bibleRefs.ref2}
                        styles
                        item
                        transform={"translateX(-200px)"}
                        transition={"all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.10s"}/>
                    <SalvationCard
                        photo={salavtionPhotos[9]}
                        steps='Step 3'
                        topic="Believe on the Lord Jesus Christ as your Lord and Saviour. Romans 10:9-10"
                        bibleRef={bibleRefs.ref3}
                        styles
                        item
                        transform={"translateX(-200px)"}
                        transition={"all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.15s"}/>
                    <SalvationCard
                        photo={salavtionPhotos[4]}
                        steps='Step 4'
                        topic="Join a Bible believing Church. Hebrew 10:25"
                        bibleRef={bibleRefs.ref4}
                        styles
                        item
                        transform={"translateX(-200px)"}
                        transition={"all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.20s"}/>
                    <SalvationCard
                        photo={salavtionPhotos[0]}
                        steps='STEP5'
                        topic="Connect with use for more"
                        styles
                        item
                        transform={"translateX(-200px)"}
                        transition={"all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.30s"}/>
                    
                </div>
                </div>
            </div>     
        </div>
  )
}

export default Index;

const bibleRefs = {
    ref1:'For all have sinned, and come short of the glory of God. Romans 3:23',
    ref2:"Now the works of the flesh are manifest, which are these; Adultery, fornication, uncleanness, lasciviousness,  Idolatry, witchcraft, hatred, variance, emulations, wrath, strife, seditions, heresies, Envyings, murders, drunkenness, revellings, and such like: of the which I tell you before, as I have also told you in time past, that they which do such things shall not inherit the kingdom of God. Gal.5:19-21",
    ref3:"That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved. For with the heart man believeth unto righteousness; and with the mouth confession is made unto salvation. Romans 10:9-10",
    ref4:"Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another: and so much the more, as ye see the day approaching. Heb.10:25",
}