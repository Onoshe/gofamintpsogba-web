'use client'
import React, { useEffect, useState } from 'react'
import { useSWRFetcher } from '@/lib/hooks/useSWRFetcher';
import Image from 'next/image';
import { CompanyLogoUpload } from '../CompanyLogoUpload';
import { TextInput, TextTitle } from '../../_IndexCompany';
import { handleExportReceipt } from '../utils/handleExportReceipt';
import { handleExportStatement } from '../utils/handleExportStatement';

 //<FileUploadCustom file={file} setFile={setFile} session={session} 
  //                className={'hidden'} notify={notify} userId={userId} userPhotoCheck={userPhotoCheck} isLogo="CLIENTLOGO"/>

 // const userPhotoRender = (userPhotoCheck?.data?.ok?
  //<Image width={100} height={100} src={userPhoto} alt='photo' className='size-[100px]'/>
 // :<BsPerson color='seagreen' className='text-[100px] text-center'/>);


const UpperDashboard = ({base64Image, setBase64Image, coyLogo, notify, user, dispatchRefreshSettingsCount, clientAccount, subscriptions, coyLogoUrl, dispatchSubscriptions}) => {
    
    //console.log(clientAccount);
    
    let subHistory = [...subscriptions]; let subActive = false;
    if(subHistory?.length){
        subHistory.sort((a, b) => {
            return new Date(b.subscriptionDate) - new Date(a.subscriptionDate);
          });
          subHistory = subHistory?.map((dt, i)=> {
            const todayDate = new Date();
            const todayTime = todayDate.getTime();
            const subDate = new Date(dt.subscriptionDate);
            const subDateStr = subDate.toDateString();
            const subDueDate = new Date(dt.subscriptionDate);
                subDueDate.setDate(subDate.getDate() + 366);
            const subDueDateStr = new Date(subDueDate).toDateString();
            const subDueDateTime = subDueDate.getTime();
            const active = subDueDateTime > todayTime;
            if(i===0){subActive = active}
            return {...dt, subDateStr, subDueDateStr, active}
        });
    }
    const handlePrintReceipt =(act, i)=>{
        if(i == 1){
            handleExportReceipt({coyLogo});
        }else{
            handleExportStatement({imgObj:coyLogo});
        }
        
    }
    //console.log(coyLogoUrl);

    return (
    <div className='flex flex-row gap-3 flex-wrap justify-evenly p-3'>
            <div className='w-full flex flex-col pb-3 items-center shadow-lg max-w-[350px] max-h-[250px] rounded-md '>
                <p className='w-full bg-blue-300 text-gray-600 text-center p-2 mb-2 font-bold rounded-t-lg'>Company Logo</p>
                <Image
                        src={coyLogoUrl}
                        //src={coyLogo.type==="base64"? `data:image/png;base64,${coyLogo.file}` : coyLogo.file}
                        width={100}
                        height={100}
                        alt='Company logo'
                        className='flex flex-1 w-full bg-red-50 max-h-[100px] max-w-[150px] mb-5'
                    />
                <CompanyLogoUpload 
                    base64String={base64Image}
                    setBase64String={setBase64Image}
                    notify={notify}
                    user={user}
                    dispatchRefreshSettingsCount={dispatchRefreshSettingsCount}/>
            </div>
            <div className='hidden w-full flex-col pb-3 items-center shadow-lg max-w-[350px] max-h-[250px] rounded-md '>
                <p className='w-full bg-blue-300 text-gray-600 text-center p-2 mb-2 font-bold rounded-t-lg'>Company Logo</p>
                <Image
                        src={coyLogoUrl}
                        //src={coyLogo.type==="base64"? `data:image/png;base64,${coyLogo.file}` : coyLogo.file}
                        width={100}
                        height={100}
                        alt='Company logo'
                        className='flex flex-1 w-full bg-red-50 max-h-[100px] max-w-[150px] mb-5'
                    />
            </div>
            <div className='w-full hidden flex-col pb-3 items-center shadow-lg max-w-[350px] max-h-[250px] rounded-md '>
                <p className='w-full bg-blue-300 text-gray-600 text-center p-2 mb-2 font-bold rounded-t-lg'>Subscriptions History</p>
                <div className='flex flex-col self-start px-3'>
                    {subHistory?.length?
                        subHistory.map((dt, i)=>{
                            const title = `${i+1}. Subscription: ${dt.subDateStr} - ${dt.subDueDateStr} (${dt.subscriptionType})`
                            return(
                                <p key={`${i}key`} className={`text-left pb-2 text-blue-700 ${dt.active? 'text-green-500' : 'text-red-800'}`}
                                  onClick={()=> handlePrintReceipt(dt, i)}>
                                    {title} <span className='shadow-lg ml-3 active:bg-gray-100 cursor-pointer bg-sky-100 hover:bg-blue-100 py-[1px] px-2 rounded'>Receipt</span> 
                                </p>
                            )
                        })
                      : <p className='text-red-700'>No subscription available!</p>
                    }                    
                </div>
                
            </div>
            <div className='w-full flex justify-evenly  flex-col shadow-lg max-w-[350px] rounded-md bg-white py-3 px-5'>
                <TextTitle title="Year End" name={clientAccount?.yearEnd}/>
                <TextTitle title="Business Type" name={clientAccount?.businessType}/>
                <TextTitle title="About Company" name={clientAccount?.description}/>
                <TextTitle title="Company Address" name={clientAccount?.address?.replaceAll("|", "")}/>
                
            </div>
            <div className='w-full flex flex-col shadow-lg  max-w-[350px] rounded-md  bg-white py-3 px-5'>
                <TextTitle title="Contact Person Name" name={clientAccount?.contactPersonTitle +" "+clientAccount?.contactPersonFirstName +" "+clientAccount?.contactPersonLastName}/>
                <TextTitle title="Contact Person Phone No" name={clientAccount?.contactPersonPhoneNo}/>
                <TextTitle title="Email" name={clientAccount?.email}/>
                <TextTitle title="Registered date" name={new Date(clientAccount?.registeredDate).toDateString()}/>
            </div>
        </div>
  )
}

export default UpperDashboard