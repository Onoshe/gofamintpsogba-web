'use client'
import React from 'react'
import logo from '@/assets/gofamintLogo.png';
import ScrollToTopButton from '@/components/scrollToTop/ScrollToTopAuto';
import Image from 'next/image';



const Contactus = ({dataRes}) => {
  const header = "text-center md:px-10 md:text-left text-xl text-[mediumblue] sm:text-4xl font-bold pt-10";
  const headerSub = "text-center md:px-10 md:text-left text-lg text-[mediumblue] sm:text-2xl font-bold pt-10 pb-5";
  const headerSub2 = "text-center md:px-10 md:text-left text-lg text-gray-600 sm:text-2xl font-bold pt-5 pb-5";
  const headerSub_Cus = "text-center md:px-10 md:text-left text-lg text-[mediumblue] sm:text-2xl font-bold pt-10";
  const headerSub2_Cus = "text-center md:px-10 md:text-left text-lg text-gray-600 sm:text-2xl font-bold pt-2 pb-2";
  const paraf = "text-lg md:text-2xl  p-[0] pb-3 md:px-10";
  const paraf2 = "text-lg md:text-2xl pb-3 md:px-10 ml-5 flex justify-center md:justify-start";
  

  const contactUsData = dataRes?.contactUsData;
  const telArr = contactUsData?.textShort1?.split('|');
  const emailArr = contactUsData?.textShort2?.split('|');

  React.useEffect(()=>{
    //Auto scroll to top on load
      window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
      });
  },[]);
  
  return (
    <div className="bg-mainColor flex flex-col"
      >
      <Image src={""} alt="backgroundImage" className="w-full h-screen fixed" style={{opacity:0.03}}/>
      <div className='flex justify-center'>
       <Image src={logo} alt="logo" className="w-[80px] xsmc:w-[120px] smc:w-[150px] md:w-[220px]" />
      </div>
      <div className="w-full text-gray-600 flex justify-center p-10 pt-0 flex-col relative bg-contain bg-no-repeat bg-top bg-opacity-10"
        >
          <h2 className={header}>GOFAMINT Pacesetters Ogba<br/>
              <span className="text-lg text-gray-600 sm:text-2xl">(District Headquaters)</span>
          </h2>
          <h2 className={headerSub}>Church Address</h2>
 
          <div className='flex justify-center items-center md:items-start flex-col'>
              {addressPSA.map((text, i)=>{
                  return <h2 className={paraf} key={`${i}+key`}>{text}</h2>
              })}
              {
                telArr?.map((dt, i)=>{
                  return(
                    <a key={`key${i}`} href={`tel:+${dt}`} target="_blank" rel="noopener noreferrer"
                        className={`${paraf} underline text-blue-600 hover:text-[mediumblue]`}>
                          Tel: +{dt}
                    </a>
                  )
                })
              }
              {
                emailArr?.map((dt, i)=>{
                  return(
                    <a key={`key${i}`} href={`mailto:${dt}`} target="_blank" rel="noopener noreferrer"
                        className={`${paraf} underline text-blue-600 hover:text-[mediumblue]`}>
                          E-mail: {dt}
                    </a>
                  )
                })
              }
              
              <a href="https://gofamintpsogba.org" target="_blank" rel="noopener noreferrer"
                    className={`${paraf} underline text-blue-600 hover:text-[mediumblue]`}
                    >
                      www.gofamintpsogba.org
                </a>
          </div> 
          <h2 className={headerSub}>Our Services</h2>
            <h2 className={headerSub2} style={{paddingTop:0}}>1. Sunday Service</h2>
              <h2 className={paraf2}>Sunday Bible School: Time: 8:00am</h2>
              <h2 className={paraf2}>Sunday Worship Service: Time: 9:00am</h2>
            <h2 className={headerSub2}>2. Hour of Breakthrough</h2>
              <h2 className={paraf2}>Mondays: Time: 6:00am</h2>
            <h2 className={headerSub2}>3. Bible Study</h2>
              <h2 className={paraf2}>Tuesdays: Time: 6:00pm</h2>
            <h2 className={headerSub2}>4. Prevailing Prayers</h2>
              <h2 className={paraf2}>Thursdays: Time: 6:00pm</h2>
            <h2 className={'hidden'}>5. The Answer Programme</h2>
              <h2 className={paraf2}>Every First Saturday of the month: Time: 7:00am</h2>

            <h2 className={headerSub_Cus}>Give unto the Lord your tithes and offerings</h2>
            <h2 className={headerSub2_Cus}>Bank details:</h2>
              <h2 className={paraf2}>{"The Gospel Faith Mission Int'l"}</h2>
              <h2 className={paraf2}>Access Bank- 0019824192</h2>
            
            <h2 className={headerSub}>National Headquarters</h2>
            <div className='flex justify-center items-center md:items-start flex-col'>
                {addressHqt.map((text, i)=>{
                    return <h2 className={paraf} key={`${i}+key`}>{text}</h2>
                })}
                <a href="mailto:forms@gofamint.org" target="_blank" rel="noopener noreferrer"
                    className={`${paraf} underline text-blue-600 hover:text-[mediumblue]`}
                    style={{paddingBottom:0, marginBottom:'5px'}}>
                      forms@gofamint.org
                </a>
                <a href="https://www.gofamint.org/" target="_blank" rel="noopener noreferrer"
                    className={`${paraf} underline text-blue-600 hover:text-[mediumblue]`}
                    >
                      www.gofamint.org
                </a>
            </div>

            <h2 className={headerSub}>International Headquarters</h2>
            <div className='flex justify-center items-center md:items-start flex-col'>
                {addressInt.map((text, i)=>{
                    return <h2 className={paraf} key={`${i}+key`}>{text}</h2>
                })}
                <a href="mailto:feedback@gofamint.org" target="_blank" rel="noopener noreferrer"
                    className={`${paraf} underline text-blue-600 hover:text-[mediumblue]`}>
                      E-mail: feedback@gofamint.org
                </a>;
            </div> 
      </div>
      <ScrollToTopButton/>
    </div>
  )
}

export default Contactus;



const addressPSA=[
  "7 Odekunle Street",
  "Off Oluyemi Erinoso Street",
  "Behind County Hospital",
  "Aguda Ogba, Ikeja Lagos",
];

const addressHqt=[
  "International Gospel Center",
  "U.I.P.O Box 20956 Ojoo – Ibadan.",
  "Tel: +2348062748028, +2347028386653",
];

const addressInt=[
  "Gospel city,",
  "Km 40 Lagos – Ibadan expressway,",
  "Aseese, Ogun State.",
  "P.O Box 921, Redemption Camp, Ogun State.",
  "E-mail: feedback@gofamint.org",
];

