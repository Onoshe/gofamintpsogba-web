'use client'
import React, {useState, useEffect} from 'react';
import CardTopText, { CustomCard } from '../CardTopText';
const imgPath = '/dashboard.png';

export const imagesArr = [
    '/slideImages/background_1a.png',
    '/slideImages/background_2a.png',
    '/slideImages/background_3a.png',
    '/slideImages/background_4a.png',
    '/slideImages/background_5a.png',
    '/slideImages/background_6a.png',
    '/slideImages/background_7a.png',
    '/slideImages/background_8a.jpg',
    '/slideImages/background_9a.png',
    '/slideImages/background_1a.png',
    '/slideImages/background_2a.png',
];


const IndexDisplaySessions = ({currentIndex, isSliding}) => {

    const currentImage = imagesArr[currentIndex]

  return (
    <div className="flex flex-1 p-5 overflow-hidden h-[800px] lg:h-[70vh] flex-col lg:flex-row-reverse gap-16 bg-white">
        <section className='flex-1 lg:max-w-[650px]'>
            <TextCarousel   currentIndex={currentIndex} isSliding={isSliding}/>
        </section>
        <div  className='flex  w-full flex-1 flex-col h-[100vh] transform transition-transform duration-500'
            style={{
                backgroundImage: `url(${currentImage})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                height: "100%",
                width: "100%",
              }}>
                
        </div>
    </div>
  )
}

export default IndexDisplaySessions;


const TextCarousel = ({currentIndex, isSliding}) => {

  return (
    <div className="relative w-full h-[40vh] overflow-hidden flex justify-center items-center">
      <div
        className={`absolute w-full text-center text-lg font-medium text-gray-700 transform transition-transform duration-700 ${
          isSliding ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
      >
        <CustomCard title={appHighlights[currentIndex].title} text={appHighlights[currentIndex].text}/>
      </div>
    </div>
  );
};


export const appHighlights = [
    {title:"Streamlined Financial Management",
    text:"Manage your accounts effortlessly with QuickRecords. From tracking income and expenses to generating detailed financial reports, everything you need is just a click away."
    },
    {title: "Real-Time Insights",
    text:"Get a clear picture of your business's financial health with real-time updates on your transactions, account balances, and performance metrics."
    },

    {title: "Customizable for Your Needs",
    text:"Whether you're a small business owner, freelancer, or accountant, QuickRecords adapts to suit your unique bookkeeping requirements."
    },

    {title: "Secure and Reliable",
    text:"Your financial data is safe with us. Enjoy the highest level of encryption and backups to ensure your records are always protected."
    },

    {title:"Cloud-Based Convenience",
    text:"QuickRecords is a modern cloud-based accounting solution, allowing you to access your financial data anytime, anywhere. Whether you’re at the office, at home, or on the go, all you need is an internet connection to manage your books seamlessly. Say goodbye to device dependency and hello to flexibility!"
    },
    {title:"Powerful Reports Made Simple",
    text:"Generate professional reports such as Profit & Loss, Balance Sheet, Cash Flow statements and other Reports with just a few clicks."
    },

    {title:"Multi-User Access",
    text:"Collaborate with your team or accountant seamlessly. Set roles and permissions to control who can access what."
    },

    {title:"Accessible Anywhere, Anytime",
    text:"Manage your accounts on the go with QuickRecords' mobile-friendly design, ensuring you never miss an update."
    },

    {title:"Effortless Product Management",
    text:"Keep your business running seamlessly by tracking inventory levels, monitoring stock movements, and calculating precise product valuations with ease."},

]