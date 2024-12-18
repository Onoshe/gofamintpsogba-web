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
                  owns and operates this app, 
                  <span className='font-bold mx-1'>QuickRecords Accounting Bookkeeping</span>
                  , along with its related websites, services, and technology. By accessing or using this service, you agree to comply with these Terms of Service. These terms include all policies, operating rules, and procedures referenced herein or published by OziTech Studio.
              </p>
              <p>
                The term <span className='font-bold mr-1'>“User”</span>refers to either:
              </p>
              <p className="py-1">•  You as an individual, or</p>
              <p className="py-1">•  The entity you represent, for which you are authorized to accept these Terms of Service.</p>
              <p className="pt-4"><span className='font-bold mx-1 text-red-900'>If you do not agree to these Terms of Service or are not authorized to accept them, do not download, use, or access any part of the service.</span>
                By using the service, you acknowledge that you accept these terms and agree to be legally bound by them without modification.
              </p>
            <Header1 text="CHANGES TO THE TERMS OF SERVICE" />
              <p>
              <span className='font-bold mr-1'>{company}</span> reserves the right to modify or replace these Terms of Service, in whole or part, at its sole discretion. Changes will become effective upon publication. Continued use of the service after modifications constitutes acceptance of the updated terms.
              </p>
            <Header1 text="ELIGIBILITY" />
              <p>
              <span className='font-bold mr-1'>{company}</span> reserves the right to refuse service to any person and may modify eligibility criteria at any time.
              </p>
            <Header1 text="REGISTRATION" />
              <p>
              While registration is optional, some features or value-added services may require you to create an account. If you choose to register, you are responsible for maintaining the confidentiality of your account information.
              </p>
            <Header1 text="PRIVACY POLICY" />
            <p>
              {"QuickRecords Bookkeeping's Privacy Policy, available at "} 
              <Link href={'/privacy-policy'} className='text-blue-500 active:text-blue-500 mx-1 cursor-pointer hover:text-blue-700'> http://quick-records.vercel.app/privacy-policy</Link>
              governs how we collect, use, and protect your data. By using the service, you consent to the practices described in this policy. OziTech Studio reserves the right to update the Privacy Policy from time to time.
            </p>
            <Header1 text="USER CONDUCT" />
            <Text1 text={tmc.g2} style={''}/>
            <Text1 text={tmc.g3} style={'py-1'}/>
            <Text1 text={tmc.g4} style={'py-1'}/>
            <Text1 text={tmc.g5} style={'py-1'}/>
            <Text1 text={tmc.g6} style={'py-1'}/>
            <Text1 text={tmc.g7} style={'py-1'}/>
            <Text1 text={tmc.g8} style={'py-1'}/>
            <Text1 text={tmc.g9} style={'py-1'}/>

            <Header1 text="PROPRIETARY RIGHTS" />
            <Text1 text={tmc.h2} style={''}/>
            <Text1 text={tmc.h3} style={'py-1'}/>
            <Text1 text={tmc.h4} style={'py-1'}/>
            <Text1 text={tmc.h5} style={'py-1'}/>

            <Header1 text="TERMINATION" />     
            <p>
              <span className='font-bold mr-1'>{company}</span>
              may terminate your access to the service at any time, with or without cause or notice. Upon termination, you must stop using the service immediately. Obligations or liabilities incurred before termination and certain provisions (e.g., intellectual property rights, indemnification) will survive termination.
            </p>



            <Header1 text="DISCLAIMER OF WARRANTIES" />
            <p className=''> 
              The service is provided  
              <span className='font-bold mx-1'>“AS IS”</span>
              and 
              <span className='font-bold mx-1'>“AS AVAILABLE”,</span>
              without any warranties, express or implied, including but not limited to:
            </p>
            <p className="py-1">{tmc.j3}</p>
            <p className="py-1">{tmc.j4}</p>
            <p className="py-1">{tmc.j5}</p>
            <p className="py-1"><span className='font-bold mr-1'>{company}</span> does not guarantee that:</p>
            <p className="py-1">{tmc.j6}</p>
            <p className="py-1">{tmc.j7}</p>
            <p className="py-1">{tmc.j8}</p>
            <p className="py-1">{tmc.j9}</p>
            <p className="py-1">{tmc.j10}</p>

            <Header1 text="LIMITATION OF LIABILITY" />
            <p><span className='font-bold mr-1'>{company}</span> is not liable for:</p>
            <Text1 text={tmc.k3} style={'py-1'}/>
            <Text1 text={tmc.k4} style={'py-1'}/>
            <Text1 text={tmc.k5} style={'py-1'}/>
            <Text1 text={tmc.k6} style={'py-1'}/>


            <Header1 text="INDEMNIFICATION" />
            <Text1 text={tmc.l2} style={'py-1'}/>
            <Text1 text={tmc.l3} style={'py-1'}/>
            <p className={'py-1'}>{tmc.l4}</p>
            <Text1 text={tmc.l5} style={'py-1'}/>
            <p className={'py-2'}><span className='font-bold mr-1'>{company}</span>{tmc.l6}</p>

            <Header1 text={tmc.m1} />
            <Text1 text={tmc.m2} style={'py-1'}/>
            <Text1 text={tmc.m3} style={'py-1'}/>
        </div>
        <Footer/>
    </div>
  )
}

export default TermsAndCondition;

