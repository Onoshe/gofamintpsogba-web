'use client'
import React from 'react'
import HorizontalLine from '../../horizontalLine/HorizontalLine';
import { FaComment, FaHeart } from 'react-icons/fa'
//import pastorLogo from '@/assets/pastorCorner/pastorLogo.jpg';
//import K_OGUNDARE from '@/assets/pastorCorner/K_OGUNDARE.jpg';
//import L_AJAGUNNA from '@/assets/pastorCorner/L_AJAGUNNA.jpg';
//import pastorLogo from '/bgroundHome.jpg';
import { useRouter } from 'next/navigation';
import usePstCornerMsgStore from '@/context/usePstCornerMsgStore';
import { useSWRFetcher } from '@/lib/hooks/useSWRFetcher';
import { getImgLink, getImgLinkBase } from '@/lib/apis/urlLinks';



const Card = ({photo,postedDate, msg, topic, comment, likes, bibleRef,
        prayer, item, by, id}) => {
    const router = useRouter({});
    const imgLink = getImgLink({s:'imgPath, name', c:'imgGroup', v:'pastor_corner_by'});
    const imgLinkBase = getImgLinkBase();
    const {data} = useSWRFetcher(imgLink);
    const { disSelectedMsg} = usePstCornerMsgStore((state)=>state);
    const pattern = /[^-\w\s]/gi;

    const readMoreHandler=()=>{
        const title = item.title;
        const newItem = {...item, details:{...item.details, photo}};    
        disSelectedMsg(newItem);
        const header = title.toLowerCase().replace(/ /g, "-").replace(pattern, "");
            router.push(`/pastor-corner/${header}=${id}`
            );
    }
    const pastorLogoImg = data?.data?.find((img)=> img?.name?.toLowerCase()?.includes(by?.split('.')[1]?.trim()?.toLowerCase()))?.imgPath;
    const pastorLogo = imgLinkBase+'/'+pastorLogoImg;

    return (
        <div className="flex justify-center mx-2 mb-8"
            >
            <div className="rounded-lg shadow-lg bg-white w-[80vw] smc:w-[40vw] max-w-[320px] min-w-[250px]
                ">
                <div className='bg-center bg-cover rounded-t-lg h-[170px] smc:h-[200px] lg:h-[230px] flex justify-center items-center'
                    style={{backgroundImage:`url(${photo})`}}>
                    
                    <div className='relative rounded-t-lg top-0 p-5 bottom-0 w-full h-full flex justify-center
                            items-center justify-self-center bg-[rgba(150,150,150,0.5)] hover:bg-[rgba(80,80,150,0.7)] transition duration-150 ease-in-out'>
                       <h2 className='font-meriendOne textShadowWhitePurple flex text-[14px] sm:text-[16px] lg:text-xl font-bold items-center text-center'>
                            {topic}
                        </h2>  

                        <div className='absolute left-1 max-h-[100px] max-w-[100px] bg-[#c9a2c4] w-[10vw] h-[10vw]
                            min-h-[65px] min-w-[65px] bottom-[-15%] rounded-full flex justify-center items-center'>
                            <div className='w-[90%] h-[90%] bg-white rounded-full bg-center bg-contain'
                            style={{backgroundImage:`url(${pastorLogo})`}}>
                            </div>     
                        </div>      
                    </div>
                    
                </div>
                <div className="p-4 md:p-6 z-50 text-[12px] sm:text-[14px] md:text-[16px]">
            
                    <h5 className=" font-medium text-[#aa31aa] mt-2">{by} || {postedDate}</h5>
                    <div className='flex flex-row justify-end items-center'>
                        <FaHeart size={22} className={`${likes>0? 'text-yellow-600' :'text-[gray]'}`}/><span className='px-2 pr-5'>{likes}</span>
                        <FaComment size={22} className={`${likes>0? 'text-blue-500' :'text-[gray]'}`}/><span className='px-2'>{comment}</span>
                    </div>
                    <HorizontalLine widths={100} margBot={10} margTop={5}/>

                    <p className={`text-gray-700  mb-4 italic text-justify ${!bibleRef? 'hidden' : ''}`}>
                        {bibleRef}
                    </p>
                    {
                        msg?.map((item, i)=>{
                            return(
                                <p key={`${i}card`} className="text-gray-700  mb-4 text-justify">
                                    {item}
                                </p>
                            )
                        })
                    }
                    <p className="text-gray-700 mb-4 text-justify">
                        {prayer}
                    </p>
                    <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={readMoreHandler}>
                        Read More
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Card