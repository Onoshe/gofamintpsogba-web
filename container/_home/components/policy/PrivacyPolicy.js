'use client'
import React from 'react'
import { Header1, Span, Text1, } from './Components'
import { tmc } from './termsAndCond'
import HomeHeader from '../../header/Header'
import Footer from '../Footer'
import { getRequest } from '@/lib/apiRequest/getRequest'
import { getLinkFetchTable } from '@/lib/apiRequest/urlLinks'
import { privPol } from './privPolicy'
import Link from 'next/link'
var url = getLinkFetchTable({table:"_settings", domain:'demo'});


const PrivacyPolicy = () => {
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
        <div className='w-full text-5xl text-white bg-gradient-to-r font-[600] from-[#137dd7] to-[#024884] text-center py-14 px-8'>
          Privacy Policy
        </div>
        <div className='py-10 px-5 sm:px-10 md:px-20 lg:px-[10rem] text-gray-800'>
            <Text1 text={privPol.b1} style={'font-bold pt-8 pb-5'}/>
            <Text1 text={privPol.b2} style={''}/>
            <Text1 text={privPol.b3} style={'pt-2'}/>

            <Header1 text="Information We Collect"/>
            <Text1 text={privPol.c2} style={''}/>
            <p className='font-bold py-2'>{privPol.c3}</p>
            
            
            <Text1 text={privPol.c4} style={'pb-2'}/>
            <Text1 text={privPol.c5} style={''}/>
            <p className='font-bold py-2'>{privPol.d1}</p>
            <Text1 text={privPol.d2} style={''}/>
            <p className='font-bold py-2'>{privPol.e1}</p>
            <Text1 text={privPol.e2} style={''}/>
            <p className='font-bold py-2'>{privPol.f1}</p>
            <Text1 text={privPol.f2} style={''}/>
            
            <Header1 text="How We Use Your Information"/>
            <p className='font-bold py-2'>{privPol.g2}</p>
            <Text1 text={privPol.g3} style={'pb-2'}/>
            <p className='pb-2'>{privPol.g4}</p>
            <Text1 text={privPol.g5} style={'pb-2'}/>
            <p className='pb-2'>{privPol.g6}</p>
            <Text1 text={privPol.g7} style={'pb-2'}/>
            <p className='pb-2'>{privPol.g8}</p>
            
            <Header1 text="Data Sharing and Disclosure"/>
            <Text1 text={privPol.h2} style={'pb-2'}/>
            <p className='pb-2'>
              <span className='font-bold mx-1'>- Service Providers:</span>
              Trusted third-party providers who assist us with hosting, analytics, payment processing, and other services.
            </p>
            <p className='pb-2'>
              <span className='font-bold mx-1'>- Legal Authorities:</span>
               If required by law or in response to valid legal processes.
            </p>
            <p className='pb-2'>
              <span className='font-bold mx-1'>- Business Transfers:</span>
               If we merge, sell, or transfer our business, your information may be transferred to the successor entity.
            </p>

            <Header1 text="Data Security"/>
            <p className='font-bold pb-2'>{privPol.i2}</p>
            <Text1 text={privPol.i3} style={'pb-2'}/>
            <p className='py-2'>{privPol.i4}</p>
            <Text1 text={privPol.i5} style={'pb-2'}/>
            <p className=''>{privPol.i6}</p>
            
            <p className=' py-2'>{privPol.j1}</p>

            <Header1 text="Your Rights and Choices"/>
            <Text1 text={privPol.k2} style={'pb-2'}/>
            <p className='pb-2'>
              <span className='font-bold mx-1'>- Access and Update:</span>
               Review and update your personal information within the App.
            </p>
            <p className='pb-2'>
              <span className='font-bold mx-1'>- Data Portability:</span>
               Request a copy of your data in a portable format.
            </p>
            <p className='pb-2'>
              <span className='font-bold mx-1'>- Deletion:</span>
               Request the deletion of your account and associated data, subject to legal or regulatory requirements.
            </p> 
            <p className='pb-2'>
              <span className='font-bold mx-1'>- Marketing Preferences:</span>
              Opt out of receiving promotional communications at any time.
            </p>

            <Header1 text="Third-Party Links"/>
            <Text1 text={privPol.l2} style={'pb-2'}/>

            <Header1 text="Children’s Privacy"/>
            <Text1 text={privPol.m2} style={'pb-2'}/>
            
            <Header1 text="International Users"/>
            <Text1 text={privPol.n2} style={'pb-2'}/>

            <Header1 text="Changes to This Privacy Policy"/>
            <Text1 text={privPol.o2} style={'pb-2'}/>
            <p className="">•  Update the “Effective Date” at the top of this policy.</p>
            <p className="pt-1">•  Notify you through the App or other appropriate means.</p>
            <p className="pt-1">•  We encourage you to review this policy regularly to stay informed about how we protect your information.</p>

            <Header1 text="Contact Us"/>
            <Text1 text={privPol.p2} style={'pb-1'}/>

            <Header1 text="QuickRecords Bookkeeping & Accounting"/>
            <div className=''>Email: <a href={`mailto:ozitechstudio@gmail.com`}
              className='text-blue-500 hover:text-blue-700'>Send Email</a></div>
            <div className=''>Phone: <a className='text-blue-500 hover:text-blue-700' 
              href={`tel:+2348064205333`}>Call Us</a></div>
            
            <div className=''>
            This Privacy Policy forms an integral part of the QuickRecords Terms of Use, available at 
                <Link href={'/terms-and-conditions'} className='text-blue-500 active:text-blue-500 mx-1 cursor-pointer hover:text-blue-700'> www.quick-records.vercel.app/terms-and-conditions.</Link>
                By using the App, you agree to both the Terms of Use and this Privacy Policy.
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default PrivacyPolicy;

