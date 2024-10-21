'use client'
import React, { useEffect, useState } from 'react'
import BackgroundCard from './components/reusableComponents/BackgroundCard';
import Image from 'next/image';
import { getLinksAdmin } from '@/lib/apiRequest/urlLinks';
import useStoreTransactions from '@/context/storeTransactions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStoreHeader from '@/context/storeHeader';
import UpperDashboard from './components/homeComponents/UpperDashboard';
import { getSubscriptionHistory } from './components/utils/getSubscriptionHistory';
import AuditedYearLock from './components/homeComponents/AuditedYearLock';
import PostingLock from './components/homeComponents/PostingLock';
import SubscriptionsHistory from './components/homeComponents/SubscriptionsHistory';
import { handleExportReceipt } from './components/utils/handleExportReceipt';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
import convertImageToBase64 from '@/lib/image/convertImageToBase64';
import { HeaderTab } from './components/headerTab/HeaderTab';
//import { AccessCard } from './cards/DashboardAccess';




const IndexCompany = ({ssUser}) => {
    const { session, user,  status} = useAuthCustom(ssUser);
    const {usersAccountUrl, clientsDataUrl, accessDataUrl, dbTablesUrl, accessUrl} = getLinksAdmin();
    const {settings, dispatchRefreshSettingsCount,  subscriptions,  dispatchSubscriptions,
        client_Admin, clientData, generalSettings, quickrecordsLogo,} = useStoreHeader((state) => state);
    const {clientAccount, } = useStoreTransactions((state) => state);    
    const [base64Image, setBase64Image] = React.useState('');
    const [appB64Image, setAppBase64Image] = React.useState(''); 
    const subcriptionHistory = getSubscriptionHistory({subscriptions});
    const [tabs, setTabs] = React.useState({activeTab:{name:'home', title:'Home'}});

    let quickRecordsLogo = "";
    if(generalSettings?.length){
        quickRecordsLogo = generalSettings.find((dt)=>dt.slug === "quickrecords-logo")?.largeText1;
    }
    //console.log(generalSettings);

    useEffect(()=>{
        const imageUrl = 'https://media.istockphoto.com/id/1496615469/photo/serene-latin-woman-enjoy-sunset-with-gratitude.jpg?s=612x612&w=is&k=20&c=hrdwKW5CMjVXlB_k39AnXHb-_Bm4epQPXRRTxhCDQpc=';
            convertImageToBase64("/QuickRecordsLogo.png")
                .then(base64String => {
                setAppBase64Image(base64String)
                })
                .catch(error => {
                //console.error(error);
            });
    },[]);
  


    let coyLogo = "";
    if(settings?.data){
        const coyLogoFound = settings.data.find((dt)=> dt.slug === "company-logo");
        if(coyLogoFound?.largeText){coyLogo = {type:'base64', file:coyLogoFound.largeText}}
    }


    const notify = (type, msg) => toast[type](msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        theme: "colored",
      //transition: 'Bounce',
      });
    
   
  

  return (
    <div className=''>
        <HeaderTab tabs={tabs} setTabs={setTabs}/>
        <br/><br/>
        <div className='p-4 flex flex-col items-center z-0'>
            {tabs.activeTab.name === "home" && <>
                <BackgroundCard style={''} childContStyle title={clientAccount?.companyName}>
                    <div className='w-full pb-4'>
                        <div className={`p-[2px] px-3 w-full flex flex-row justify-between ${subcriptionHistory?.lastSub?.active?'bg-[lime] text-[teal]':'bg-red-500 text-gray-700'}`}>
                        <p className=''><span className='font-bold'>{subcriptionHistory?.lastSub?.active?'ACTIVE':'EXPIRED'} <span>({subcriptionHistory?.lastSub?.subscriptionType})</span></span></p> 
                        <p>Due date: {subcriptionHistory?.lastSub?.subDueDateStr}</p>
                        </div>
                        <Image
                                //src={coyLogo}
                                src={`data:image/png;base64,${appB64Image}`}
                                width={100}
                                height={100}
                                alt='Company logo'
                                className='hidden  flex-1 w-full bg-red-50 max-h-[100px] max-w-[150px] mb-5'
                            />
                        <UpperDashboard 
                            base64Image={base64Image}
                            setBase64Image={setBase64Image}
                            coyLogo={coyLogo}
                            notify={notify}
                            user={user}
                            dispatchRefreshSettingsCount={dispatchRefreshSettingsCount}
                            clientAccount ={clientAccount}
                            subscriptions={subscriptions}
                            dispatchSubscriptions={dispatchSubscriptions}
                        />
                    
                    </div>
                </BackgroundCard>
                <div className='flex w-full flex-col lg:flex-row mt-10'>
                
                    <div className='w-full flex-wrap flex flex-row gap-5 justify-around items-center'>
                        <AuditedYearLock
                            dispatchRefreshSettingsCount={dispatchRefreshSettingsCount}
                            notify={notify} 
                            user={user}
                            settings={settings}
                        />
                        <PostingLock
                            dispatchRefreshSettingsCount={dispatchRefreshSettingsCount}
                            notify={notify} 
                            user={user}
                            settings={settings}
                        />
                    </div>
                </div>
            </>}
            {tabs.activeTab.name === "subscriptions" && <SubscriptionsHistory
                subscriptions={subscriptions}
                handleExportReceipt={handleExportReceipt}
                generalSettings={generalSettings}
                client_Admin={client_Admin}
                clientData={clientData}
                quickRecordsLogo={`data:image/png;base64,${appB64Image}`}
            />}
            <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        </div>
    </div>
  )
}


export const TextTitle =({title, name, styleTitle, styleName})=>{
   return <p className='py-1 font-[600]'><span className={`text-red-800 ${styleTitle}`}>{title}</span>: 
                <span className={`text-blue-800 pl-2 ${styleName}`}>{name}</span>
          </p>
}
export const TextInput =({title, style})=>{
    return <p className={`${style}`}> {title} </p>
 }


 export async function getImageAsBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

export default IndexCompany;

