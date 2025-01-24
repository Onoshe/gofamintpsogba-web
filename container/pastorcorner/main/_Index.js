'use client'
import React from 'react';
import HorizontalLine from '@/components/horizontalLine/HorizontalLine';
import Card from '@/components/cards/pastorCorner/Card';
import SearchInput from './SearchBar';
import ScrollToTopButton from '@/components/scrollToTop/ScrollToTopAuto';
//import pastorCornerPhotos from '@/assets/pastorCorner/_index';
import generateRandomBetween from '@/lib/generateRandomBtwn';
import useOnline from '@/lib/hooks/useOnline';
import CustomLoader from '@/components/loader/CustomLoader';
import usePstCornerMsgStore from '@/context/usePstCornerMsgStore';
import { getBiblePsg, getPstCornBodyMsg } from '@/lib/miscens';
import getPastorCorner from '@/assets/data/pastorCornerNew';
import { getDataLink } from '@/lib/apis/urlLinks';
import { useSWRFetcher } from '@/lib/hooks/useSWRFetcher';
import { getRequest } from '@/lib/apis/getRequest';
import getPastorCornerMessages from '@/assets/data/pastorCorner';
import { sortArrayByKey } from '@/lib/sortArrayByKey';
const dataLink = getDataLink({table:'official_site_pastorcorner'});



const PastorCorner = (params) => {
   const {pastorCornerPhotos} = params;
   const pstCornerDataDefFetched  = params?.pstCornerData;
  const {pstCornerData, disPstCornerData,} = usePstCornerMsgStore((state)=>state);
  const pastorMsg = pstCornerData?.length?  [...pstCornerData] : [...pstCornerDataDefFetched];
  const [pastorCornerMsgs, setPastorCornerMsgs] = React.useState([...pastorMsg]);
  const dataLink = getDataLink({table:'official_site_comments'});
  const pstCornerCmments = useSWRFetcher(dataLink);
  const likesLink = getDataLink({table:'official_site_likes'});
  const pstCornerLikes = useSWRFetcher(likesLink);
  const isOnline = useOnline();

  const lenPC = pastorCornerPhotos.length;
  const len = 100;
  const header = "text-center md:px-10 text-xl text-[mediumblue] sm:text-4xl font-bold pt-10";
  
  const renderLoader = (<CustomLoader loadingMsg="Loading Pastor's Corner Messages, please wait!" color="blue" 
  loading={true} size={80}/>);
  const renderNoNetwork = (
            <div className='text-[red] font-bold text-lg justify-center p-4 items-center flex flex-col'>
                <p>{"Error in loading Pastor's Corner messages!"}</p>
                <p>Please, check your internet connection.</p>
            </div>);
  const renderedItem = isOnline? renderLoader : renderNoNetwork;

  const fetchDataHandler = async ()=>{
    const initData = getPastorCornerMessages();
    const dataRes = await getRequest(dataLink);
    if(dataRes?.data?.length){
      disPstCornerData([...initData, ...dataRes.data]);
    }
  }
  sortArrayByKey(pastorCornerMsgs, 'date', 'ASC');

  React.useEffect(()=>{
    fetchDataHandler();
  },[]);
  return (
      <div className="w-full text-gray-600 flex justify-center px-5 pt-0 flex-col relative"
        >
          <h2 className={header}>{"Messages from the Pastor's Corner"}</h2>
        {pstCornerData.length>0?    
            <>
                <SearchInput
                    pastorCornerMsgs={pastorMsg}
                    setPastorCornerMsgs={setPastorCornerMsgs}
                />
                <HorizontalLine widths={95} margTop={5}/>
                
                <div className={`flex items-center justify-evenly w-full flex-wrap px-2 mt-3`}
                  >
                        {pastorCornerMsgs?.map((item, i)=>{
                            // const randomPhoto = generateRandomBetween(0,lenPC-1);
                            // const bodyArr = item?.message?.includes('|')? item.message.split('|') : [item.message];
                            // const body = getPstCornBodyMsg(bodyArr, 150);
                             
                            
                            const bibleRef =item?.bibleRef?.trim()? item.bibleRef.substring(0, 100)?.split(/\r?\n/)+'..."' + getBiblePsg(item.bibleRef) : "";
                            const randomPhoto = generateRandomBetween(0,lenPC-1);
                            const bodyArr = item?.message?.includes('|')? item.message.split('|') : [item.message];
                            const body = getPstCornBodyMsg(bodyArr, bibleRef? 150 : 270);
                            const commentsArr = pstCornerCmments?.data?.data?.filter((dt)=> dt.messageId == item.id);
                            const likesArr = pstCornerLikes?.data?.data?.filter((dt)=> dt.messageId == item.id);

                            return(
                                <Card 
                                    key={`${i}+pcorn`}
                                    photo={pastorCornerPhotos[randomPhoto]}  
                                    postedDate={item?.date}
                                    msg={body}
                                    by={item?.messageBy}
                                    bibleRef={bibleRef}
                                    //prayer ={item.pray} 
                                    topic={item.title}
                                    comment={commentsArr?.length} 
                                    likes={likesArr?.length}
                                    styles={{marginBottom:'10px', marginTop:'10px'}}
                                    item={item}
                                    id={item.id}
                                />
                            );
                        })}

                </div>
                <ScrollToTopButton/>
                </>
            :
             renderedItem    
            }
      </div>
  )
}

export default PastorCorner;
