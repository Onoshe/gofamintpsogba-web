'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import usePstCornerMsgStore from '@/context/usePstCornerMsgStore';
import Display from './Display';
import PageNotFound from './PageNotFound';
import { publishComment } from '../utils/publishComment';
import { getDataLink } from '@/lib/apis/urlLinks';
import { useSWRFetcher } from '@/lib/hooks/useSWRFetcher';
import { publishLike } from '../utils/publishLike';
import { getRandomNumber } from '@/components/cards/pastorCorner/LastCard';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { useAuthCustom } from '@/lib/authActions/useAuthCustom';
const dataLink = getDataLink({table:'official_site_comments'});
const likesLink = getDataLink({table:'official_site_likes'});

const ContainerIndex = ({pastorCornerPhotos, pastorCornerSharePhotos, ssUser}) => {
  let pathName = usePathname();
  const lent = pathName?.split('/')?.length;
    pathName = pathName?.split('/')[lent-1];
  const selId = pathName?.split('=')[1];
  const {pstCornerData} = usePstCornerMsgStore((state)=>state);
  const [errorMsg, setErrorMsg] = React.useState({show:false, hideBtn:true, msg:'Please, login first'});
  const [commentSent, setCommentSent] = React.useState({info:''});  
  const {data, mutate} = useSWRFetcher(dataLink);
  const likesRes = useSWRFetcher(likesLink);
  const likesData = likesRes?.data;
  const [userForm, setUserForm] = React.useState({email:'', phoneNo:'',}); 
  const [randomPhoto, setRandomPhoto] = React.useState("");
  const [userId, setUserId] = useLocalStorage("");
  const { user, status} = useAuthCustom(ssUser);
  

  //const siteData = await getRequest(dataLink);
    React.useEffect(()=>{
      const randNo = getRandomNumber(0, pastorCornerPhotos?.length -1);
      const randPhoto = pastorCornerPhotos[randNo];
      if(!randomPhoto){
        setRandomPhoto(randPhoto);
      }
    },[pastorCornerPhotos, randomPhoto]);
    //console.log(likesData)

    const selectedMsg = pstCornerData?.find((dt)=> dt.id == selId);  // pastorCornerMsgsObj[pathName];
    if(!selectedMsg) return <PageNotFound title={pathName}/>
    const commentsArr = data?.data?.filter((dt)=> dt.messageId == selectedMsg?.id) || [];
    const likesArr = likesData?.data?.filter((dt)=> dt.messageId == selectedMsg?.id) || [];

    const postCommentHandler = async (e, msg)=>{
      //console.log(e, msg)
      await publishComment(e, msg).then((res)=> {
        //console.log(res)
        if(res?.ok){
          setCommentSent({info:'POSTED'});
          mutate();
        }
      });
    };

    const handleLike = async (msg)=>{
      //console.log(msg)
      await publishLike(msg, userForm, user).then((res)=> {
        likesRes.mutate();
        if(res?.ok){
          //setCommentSent({info:'POSTED'});
        }
      });
    }
    
    

  return (
    <div>
        <Display
            selectedMsg = {selectedMsg}
            liveComments =""
            likesClickHandler={handleLike}
            loginHandler={()=>{}}
            errorMsg={errorMsg}
            liveLikes=""
            postCommentHandler={postCommentHandler}
            commentSent={commentSent}
            setCommentSent={setCommentSent}
            commentsArr={commentsArr}
            likesArr={likesArr}
            pastorCornerPhotos={pastorCornerPhotos}
            pastorCornerSharePhotos={pastorCornerSharePhotos}
            randomPhoto={randomPhoto}
        />
    </div>
  )
}

export default ContainerIndex