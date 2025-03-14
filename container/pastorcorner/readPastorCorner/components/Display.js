'use client';
import React from 'react';
import Image from 'next/image';
import {GoCalendar, GoPerson} from "react-icons/go";
import {FaComment, FaFolder, FaHeart} from 'react-icons/fa';
import{ FaThumbsUp} from 'react-icons/fa';
import HorizontalLine from '@/components/horizontalLine/HorizontalLine';
import ScrollToTopButton from '@/components/scrollToTop/ScrollToTopAuto';
import { useRouter, usePathname } from 'next/navigation';
import SocialMediaShare from './SocialMediaShare';
import LeaveAComment from '@/components/forms/LeaveAComment';
import { getRandomNumber } from '@/components/cards/pastorCorner/LastCard';
import ShareButton from '@/components/icons/ShareButton';
import handleSocialShare from './handleSocialShare';
import Head from "next/head";
import SnapshotComponent, { ImageDisplay } from './SnapShotComponent';
import { encodeDecode } from '@/lib/cryptoJS/encodeDecode';
/* eslint-disable @next/next/no-img-element */


  
const Display = ({selectedMsg, loginHandler, errorMsg, liveLikes, likesClickHandler, postCommentHandler, 
    commentSent, setCommentSent, commentsArr, pastorCornerPhotos,pastorCornerSharePhotos, randomPhoto,likesArr,pathNameRaw }) => {
    const router = useRouter();
    const pathname = usePathname();
    const {sn, id, make, title,bibleRef, message, message_html, pray, msgID, comments, details} = selectedMsg;
    const goBackHandler =()=>{
        router.back();
    }
    let body = message;  
    if(typeof message === 'string'){
      body =  message?.includes('|')? message?.split('|') : [message]; 
    }

    
    const convert = async ()=>{
        //console.log(await encodeDecode(1, 'ENCODE'));
    }

    const randNoSharePhoto = pastorCornerSharePhotos?.length >1? getRandomNumber(0, pastorCornerSharePhotos?.length -1) : 0;
    const pastorCornerShareImg = pastorCornerSharePhotos[randNoSharePhoto];
    const titleFmt = title?.toLowerCase()?.replace(/' '/g, '-');
    const currentURL = 'https://gofamintpsogba.org'+pathname;
    const imageUrl = pastorCornerShareImg;
    //console.log(currentURL);

    const handleOnClick = (networkName) => {
        const urls = handleSocialShare({
            url:currentURL,
            title,
            hashtag: '#GofamintPSOgba-PastorCorner',
            //via: 'username',
            summary:'\n'+message,
            source:'gofamintpsogba.org',
            body:'\n'+message,
          });
          window.open(urls[networkName], '_blank');  // Opens Facebook share link
         //   console.log(networkName)
    }
    //console.log(imageUrl);

    const errorMsgNodes = (
        <div className={`${ errorMsg.show? 'flex' : 'hidden'} text-left flex-col flex-wrap  w-full text-red-600  pt-2`}>
            <p>{errorMsg.msg}</p>
            <p className={`${errorMsg.hideBtn? "hidden" : ''} bg-blue-600 text-white p-2 px-5 rounded-md shadow-md cursor-pointer active:bg-slate-400 w-fit`}
                onClick={loginHandler}>Login</p>
        </div>
    );
    return(
        <div>
        <div className="pt-[50px] px-[10px] smc:px-[30px] md:px-[50px] lg:px-[70px] flex justify-center flex-col items-center content-center bg-mainColor ">
            <div className="justify-center items-center">
             <img src={randomPhoto} alt="Gofamint" width={100} height={100} className="w-[100%] h-full"/>
            </div>
               
            {errorMsgNodes}
            <div className="flex flex-col w-full pt-[0px]">
                <h1 className='font-archivo py-5 pb-2 text-xl sm:text-2xl md:text-3xl lg:text-5xl text-[rgb(40,42,47)] text-center'>
                    {title?.toUpperCase()}
                </h1>
                
                <div className={styles.style1}>
                    <div className={styles.style2}><GoPerson className={styles.style3}  color="gray"/><span className="pl-2">{'Pst. '+selectedMsg.messageBy}</span></div>
                    <div className={styles.style2}><FaFolder className={styles.style3}  color="gray"/><span className="pl-2">{"Pastor's Corner"}</span></div>
                    <div className={styles.style2}><GoCalendar className={styles.style3}  color="gray"/><span className="pl-2">{details?.date}</span></div>
                    <div className={styles.style4}><FaComment  className={`${styles.style3} ${commentsArr?.length > 0? 'text-blue-600' : 'text-[gray]'}`}/>
                        <span className="pl-2">{commentsArr?.length}</span>
                    </div>
                    <div className={styles.style2}
                    onClick={()=>likesClickHandler(selectedMsg)}>
                        <FaThumbsUp className={`${styles.style3} ${likesArr?.length > 0? 'text-yellow-600' : 'text-[gray]'} hover:text-yellow-400 active:text-yellow-300`}/><span className="pl-2">{likesArr?.length || 0}</span>
                    </div>
                    
                </div>
                <HorizontalLine bColor="gray" widths={100} margTop={2}/>
                {/*<ImageDisplay imageSrc={imageUrl}/>*/}
                <div className="text-justify text-[14px] sm:text-[15px]  md:text-[16px] text-[darkslategray]" 
                    >
                    <p className={`pt-5 pb-3 italic ${make==="HTML"? '' : ''} `}>{bibleRef}</p>
                    <div className={`${make==="HTML"? 'hidden' : ''}`}>
                        {body?.map((txt, i)=>{
                        //const formated = formatText(txt);
                        return <p className="py-3" key={`${i}++lv`}>
                                    {txt}
                                </p>
                         })}
                    </div>
                    <div className={`${make==="HTML"? '' : 'hidden'} mt-7`}>
                        <div className='mb-7' 
                            dangerouslySetInnerHTML={{ __html: message_html }}>
                        </div>
                    </div>

                    <p className={`${selectedMsg?.prayer? '' : 'hidden'}  italic`}><span className="font-bold">Prayer: </span>{selectedMsg?.prayer}</p>
                </div>
                
                <HorizontalLine bColor="gray" widths={100} margTop={30} margBot={2}/>
                {errorMsgNodes}
                <LeaveAComment 
                    comments={commentsArr}
                    userComment={e=>{postCommentHandler(e, selectedMsg)}}
                    commentInfo={commentSent?.info}
                    setCommentSent={setCommentSent}
                />
                <div className="py-10 flex flex-col gap-3">
                    <button type="button" className="w-fit inline-block px-10 py-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={goBackHandler}>
                            Back
                    </button>
                    <div className="gap-3 flex flex-row mt-3 flex-wrap">
                        <p className="fond-bold text-lg">Share </p>
                        {/*<SocialMediaShare
                            topic={title}
                            body={body}
                            sharePhoto={imageUrl}
                            pathNameRaw={pathNameRaw}
                         />*/}
                         <br/>
                         <ShareButton
                            networkName={'facebook'}
                            size={45}
                            handleOnClick={handleOnClick}
                          />
                          <ShareButton
                            networkName={'x'}
                            size={45}
                            handleOnClick={handleOnClick}
                          />
                          <ShareButton
                            networkName={'telegram'}
                            size={45}
                            handleOnClick={handleOnClick}
                          />
                          <ShareButton
                            networkName={'whatsapp'}
                            size={45}
                            handleOnClick={handleOnClick}
                          />
                          <ShareButton
                            networkName={'linkedin'}
                            size={45}
                            handleOnClick={handleOnClick}
                          />
                    </div>
            </div>
            </div>
        </div>
        <ScrollToTopButton/>
        </div>
    );
}



export default Display;

const styles = {
    style1:'flex flex-row flex-wrap justify-start items-center text-[12px] sm:text-[14px]  md:text-[16px]',
    style2: 'flex flex-row items-center mr-3 mb-2 text-[rgb(40,42,47)] cursor-pointer',
    style3: "w-[22px] h-[20px] sm:w-[28px] sm:h-[28px]",
    style4: 'flex flex-row items-center mr-3 mb-2 text-[rgb(40,42,47)]',
}

function formatText(txt){
    const starText = txt.includes("*");
    const newTxt = txt.replace(/[*]/g, "");
    const formated = {
        fontStyle: starText? 'italic' : 'normal',
    }

    return {formatStyle: formated, formatTxt: newTxt}
}