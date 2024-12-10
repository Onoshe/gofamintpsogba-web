'use client'
import React from 'react'
import { Header1, Span, Text1, } from './Components'
import { tmc } from './termsAndCond'
import HomeHeader from '../../header/Header'
import Footer from '../Footer'
import { getRequest } from '@/lib/apiRequest/getRequest'
import { getLinkFetchTable } from '@/lib/apiRequest/urlLinks'
import Link from 'next/link'
var url = getLinkFetchTable({table:"_settings", domain:'demo'});


const TermsAndCondition = () => {
  const [settings, setSettings] = React.useState();

  const fetchAndDispatchSettings =async ()=>{
    await getRequest(url).then((res)=> {
        if(res?.ok)(setSettings(res.data))
    });
  }


  React.useEffect(()=>{
    if(!settings?.length){
        fetchAndDispatchSettings('demo')
    };   
  },[settings]);

  const company = "OziTech Studio"
  return (
    <div className='h-full bg-white w-full mt-10'>
        <HomeHeader styleInner="bg-blue-100" theme="light" appTextColor="text-[dodgerblue] text-sm"/>
        <div className='w-full text-5xl text-white bg-gradient-to-r font-[600] from-[#137dd7] to-[#024884] text-center py-14 px-8'>Terms of Service</div>
        <div className='py-10 px-5 sm:px-10 md:px-20 lg:px-[10rem] text-gray-800'>
            <Header1
                text="ACCEPTANCE OF TERMS."
            />
            <p className=''>
                <span className='font-bold mr-1'>{company}</span>
                owns and operates this app – QuickRecords Accounting Bookkeeping and their related sites, services and technology that are made available.
            </p>
            <p>
              These terms of service govern your access to and use of the Service (“Terms of Service”). The Terms of Service shall be deemed to include all other operating rules, policies and procedures that are referred to herein or that may otherwise be published by <span className='font-bold'>{company}</span> from time to time, including without limitation, the following: For purposes of these Terms of Service “User” shall mean either you as an individual or the entity on whose behalf you are accepting these Terms of Service and who is afforded all rights and bound by all terms hereunder. User represents that he/she/it is authorized to accept these Terms of Service.
            </p>
            <Text1 text={tmc.b1} style={'pt-8 pb-5 font-[600] text-red-900'}/>
            <Header1 text="CHANGES" />
            <Text1 text={tmc.c2} style={''}/>
            <Header1 text="ELIGIBILITY" />
            <p className=''>
                <span className='font-bold mr-1'>{company}</span>
                may refuse to offer or continue offering the Service to any person and may change its eligibility criteria from time to time.
            </p>
            <Header1 text={tmc.e1} />
            <Text1 text={tmc.e2} style={''}/>
            <Header1 text={tmc.f1} />
            <div className=''>
            QuickRecords Bookkeeping’s current Privacy Policy is available at
                <Link href={'/privacy-policy'} className='text-blue-500 active:text-blue-500 mx-1 cursor-pointer hover:text-blue-700'> www.quick-records.vercel.app/privacy-policy</Link>
                which shall apply to any use of the Service, and which may be modified by OziTech Studio in its discretion from time to time pursuant to the procedures set forth therein
                <Link href={'/privacy-policy'} className='text-blue-500 active:text-blue-500 mx-1 cursor-pointer hover:text-blue-700'> www.quick-records.vercel.app/privacy-policy</Link>
                which shall apply to any use of the Service, and which may be modified by 
                <span className='font-bold mx-1'>{company}</span>
                in its discretion from time to time pursuant to the procedures set forth therein.    
            </div>
            <Header1 text="USER CONDUCT" />
            <Text1 text={tmc.g2} style={''}/>
            <Text1 text={tmc.g3} style={''}/>
            <Text1 text={tmc.g4} style={''}/>
            <Text1 text={tmc.g5} style={''}/>
            <Text1 text={tmc.g6} style={''}/>
            <Text1 text={tmc.g7} style={''}/>
            <Text1 text={tmc.g8} style={''}/>
            <Text1 text={tmc.g9} style={''}/> 
            <p className=''>
            • Contains software viruses or any other computer codes, files, or programs that are designed or intended to disrupt, damage, limit or interfere with the proper function of any software, hardware, or network system or to damage or obtain unauthorized access to any system, data, or other information of 
            <span className='font-bold mx-1'>{company}</span>
             or any third party.
            </p>
            <Text1 text={tmc.g11} style={''}/>
            <Text1 text={tmc.g12} style={''}/>
            <p className=''> 
            <span className='font-bold mx-1'>{company}</span>
             may, at its sole discretion, immediately suspend or terminate any User’s access to the Service should its conduct fail (or appear to fail) to strictly conform to any provision of these Terms of Service.
            </p>
            <p className='pt-5'> 
            <span className='font-bold mx-1'>{company}</span>
             may, at any time, monitor, review, remove, retain, or disclose any information as necessary to satisfy any applicable law, regulation, legal process or governmental request or investigation (including law enforcement).
             <span className='font-bold mx-1'>{company}</span>
              is not responsible for any failure or delay in removing any such content.
            </p>
            <p className='py-6'> 
            <span className='font-bold mx-1'>{company}</span>
             is not responsible for any failure or delay in removing any such content.
            </p>

            
            <Header1 text="PROPRIETARY RIGHTS" />
            <Text1 text={tmc.h2} style={''}/>
            <Text1 text={tmc.h3} style={''}/>
            <Text1 text={tmc.h4} style={''}/>


            <Header1 text="TERMINATION" />
            <p className=''> 
              <span className='font-bold mx-1'>{company}</span>
              may terminate any User’s access to all or any part of the Service, with or without cause, with or without notice, effective at any time.
            </p>            
            <Text1 text={tmc.i3} style={''}/>

            <Header1 text="DISCLAIMER OF ALL WARRANTIES" />
            <p className=''> 
              The service is provided  
              <span className='font-bold mx-1'>“AS IS”</span>
              and 
              <span className='font-bold mx-1'>“AS AVAILABLE”.</span>
              The service is provided  
              <span className='font-bold mx-1'>WITHOUT WARRANTY</span>
              of any kind, express or implied, including, but not limited to, the implied warranties of title, non-infringement, integration, merchantability and fitness for a particular purpose, and any warranties implied by any course of performance or usage of trade, all of which are expressly disclaimed. 
              <span className='font-bold mx-1'>{company}</span>
               and its affiliates, licensors and suppliers 
               <span className='font-bold mx-1'>DO NOT </span>
               warrant that:
            </p>
            <p>{tmc.j3}</p>
            <p>{tmc.j4}</p>
            <p>{tmc.j5}</p>
            <p>{tmc.j6}</p>
            <p>{tmc.j7}</p>

            <Header1 text="LIMITATION OF LIABILITY" />
            <Text1 text={tmc.k2} style={''}/>
            <Text1 text={tmc.k3} style={''}/>
            <Text1 text={tmc.k4} style={''}/>
            <Text1 text={tmc.k5} style={''}/>
            <Text1 text={tmc.k6} style={''}/>


            <Header1 text="INDEMNIFICATION" />
            <Text1 text={tmc.l2} style={''}/>
        </div>
        <Footer/>
    </div>
  )
}

export default TermsAndCondition;

