'use client'
import React from 'react';
import Card from '@/components/cards/pastorCorner/Card';
import { getBiblePsg, getPstCornBodyMsg } from '@/lib/miscens';
import useWindowDimensions from '@/lib/hooks/useWindowDimension';
import generateRandomBetween from '@/lib/generateRandomBtwn';
import useOnline from '@/lib/hooks/useOnline';
import CustomLoader from '@/components/loader/CustomLoader';
import LastCard from '@/components/cards/pastorCorner/LastCard';
import usePstCornerMsgStore from '@/context/usePstCornerMsgStore';


//const lenPC = pastorCornerPhotos.length;
const PCorner = ({pastorCornerPhotos, pstCornerCmments, pstCornerLikes}) => {
    let { width } = useWindowDimensions();
    const {pstCornerData} = usePstCornerMsgStore((state)=>state);

    const lenPC = pastorCornerPhotos?.length;

    let baseSize = 100;
    const isOnline = useOnline();
   // console.log(pstCornerCmments)


    if(width > 0 && width <500){
        baseSize = 50
    }else if(width > 500 && width < 900){
        baseSize = 70
    }else{ baseSize = 120};
    const varLen = [baseSize, baseSize+70, baseSize-10, baseSize-15, baseSize+30, baseSize+50, baseSize+40, baseSize+10];
   
    let pastorCornerMsg = [...pstCornerData];
        pastorCornerMsg = pastorCornerMsg.slice(0, 4);
    
    const renderLoader = (<CustomLoader loadingMsg="Loading Pastor's Corner Messages, please wait!" textCol='white' color="white" 
        loading={true} size={80}/>);
        const renderNoNetwork = (<LastCard text="Error in loading Pastor's Corner. Please, check your internet connection."/>);
    const renderedItem = isOnline? renderLoader : renderNoNetwork;

    return (
        <div className="flex w-full flex-col smc:flex-row pt-0 smc:pt-12 bg-[#1c1c9e]">
            <div className='smc:hidden text-[28px] text-white font-bold text-center p-5'>
                    {"Pastor's Corner"}
                    <div className='text-base font-normal text-[#f9b507]'>
                        <h1>{"God's word is able to transform your life forever."}</h1>
                        <h1>{"Enrich your heart with this word from the Pastor's Corner."}</h1>
                    </div>
            </div>
            <div className='hidden smc:flex justify-center mx-5
                    text-white w-[30%]'>
                <h2 className='font-archivo text-[5vw] font-bold text-center'>
                {"Pastor's Corner"}
                    <div className='text-[18px] font-normal text-[#f9b507]'>
                        <h1>{"God's word is able to transform your life forever."}</h1>
                        <h1>{"Enrich your heart with this word from the Pastor's Corner."}</h1>
                    </div>
                </h2>
            </div>
            {pastorCornerMsg.length> 0?
                <div className={`${pastorCornerMsg.length> 0? "" : 'hidden'} flex items-center w-full smc:w-[70%] overflow-x-auto px-2`}>
                {pastorCornerMsg?.map((item, i)=>{
                    
                    const bibleRef =item?.bibleRef?.trim()? item.bibleRef.substring(0, 100)?.split(/\r?\n/)+'..."' + getBiblePsg(item.bibleRef) : "";
                    const bodyArr = item?.message?.includes('|')? item.message.split('|') : [item.message]; 
                    const body = getPstCornBodyMsg(bodyArr, bibleRef? 135 : 270);             
                    const randomPhoto = generateRandomBetween(0,lenPC-1);
                    const commentsArr = pstCornerCmments?.data?.filter((dt)=> dt.messageId == item.id);
                    const likesArr = pstCornerLikes?.data?.filter((dt)=> dt.messageId == item.id);

                    return(
                        <Card 
                            key={`${i}+pcorn`}
                            photo={pastorCornerPhotos[randomPhoto]} 
                            postedDate={item?.date}
                            by={item?.messageBy}
                            msg={body}
                            bibleRef={bibleRef}
                            topic={item.title}
                            comment={commentsArr?.length} 
                            likes={likesArr?.length}
                            item={item}
                            id={item.id}
                        />
                    );
                })}
                <LastCard
                    text="View all the messages"
                    type="MORE"
                />
            </div>
            :renderedItem
            }
            <div className={`${pastorCornerMsg.length> 0? "hidden" : 'hidden'}`}>
                <LastCard text="Error in loading Pastor's Corner. Please, check your internet connection."
                    pastorCornerPhotos={pastorCornerPhotos}/>
            </div>
        </div>
    )
}


export default PCorner;