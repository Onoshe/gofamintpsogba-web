import React, { useEffect } from 'react'
import { MdCake, MdDelete } from 'react-icons/md';
import ChevronUpdown from '@/assets/svg/ChevronUpdown';
import { HiOutlineMail, HiOutlineMailOpen } from 'react-icons/hi';
import useOnline from '@/lib/hooks/useOnline';
import {FiPaperclip} from 'react-icons/fi';



const Collapsible = ({children,bpad,hideDeleteIcon, contStyle, iconCol, iconType,
    iconHoverCol, disableDelete, removeForm,titleStyle, formIndex, addedInfo,collapse,
    showCake, mailInbox, item,noCollapse,showFileClip,
    }) => {
  const contRef = React.useRef(null);
  const elRef = React.useRef(null);
  const [contHeight, setContHeight] = React.useState('0px');
  const [direction, setDirection] = React.useState(iconType? 'plus' : 'up');
  const bdCelebrants = {};
  const isOnline = useOnline();


 function growHeight() {
    const elementHeight =  elRef.current.getBoundingClientRect().height;
    if (parseInt(contHeight)) {
      setContHeight('0px');
      if(iconType){
        setDirection('plus');
      }else{setDirection('up');}
    } else {
      setContHeight(`${elementHeight+(bpad? bpad : 5)}px`);
      if(iconType){
        setDirection('minus');
      }else{setDirection('down');}
    }
  }
  
  useEffect(()=>{
    if(noCollapse){
      const elementHeight =  elRef.current.getBoundingClientRect().height;
      setContHeight(`${elementHeight+(bpad? bpad : 5)}px`);
        if(iconType){
          setDirection('minus');
        }else{setDirection('down');
      }
    }
  },[]);

  
  useEffect(()=>{
    if(collapse !==0 && parseInt(contHeight)){
      setContHeight('0px');
      setDirection('up');
    }
  },[collapse]);


  //Fetch CelebrantsData if not previously fetched, when clicked
  /*async function celebrantsDataFetchHandler() {
    const mnthFig = new Date().getMonth();
      const mnth = months[mnthFig];
    await  fetchCelebrantsData('birthday', mnth).then((res)=>{
        dispatch(disCelebrantsData({...celebrantsData, birthday:res}));
    }); 
    await  fetchCelebrantsData('wedAnns', mnth).then((res)=>{
        dispatch(disCelebrantsData({...celebrantsData, wedAnns:res}));
    });
  }*/

  function handleClickTitle(act){
     if(act.includes('Birthday') && !bdCelebrants.length && isOnline){
        //celebrantsDataFetchHandler();
     }
  }


  const deleteBtn = disableDelete? <MdDelete size={26} color="#f0cece" /> :
                    <MdDelete size={26} color="red" onClick={removeForm} className="cursor-pointer"/>;
  
  const mailUnread = <HiOutlineMail size={22} color="red" className={` bg-white
        ${mailInbox? '' : 'hidden'}`}/>;
  const mailOpen = <HiOutlineMailOpen size={22} color="gray" className={` bg-white
        ${mailInbox? '' : 'hidden'}`}/>;
  const inbox = item?.newMessage? mailUnread : mailOpen;
  
  return (
    <div className={`h-auto bg-slate-100 ${contStyle}`}
       >
        <div className={`px-3 py-1 text-sm sm:text-base flex justify-between ${titleStyle}`}>
            <div className='flex cursor-pointer'
             onClick={growHeight}>
                <ChevronUpdown size={28} name={direction} 
                  className={`cursor-pointer ${iconCol? iconCol : 'fill-[#000000]'} ${iconHoverCol? iconHoverCol : 'hover:fill-[#3625ef]'} pr-2`}
                  />
                <div className='flex flex-row'
                 onClick={()=>handleClickTitle(addedInfo)}>
                  {addedInfo}
                  <FiPaperclip className={`${showFileClip==='TRUE'? '' : 'hidden'}
                    text-[mediumblue] ml-3`} 
                    size={20}/>
                </div>
                <div className={`${showCake? "" : 'hidden'} ml-5`}>
                    <MdCake size={28} color="yellow"/>
                </div>
            </div>
            {hideDeleteIcon? "" : deleteBtn}
            {inbox}
        </div>
        <div className='growHeight' ref={contRef}style={{height:contHeight}}>
            <div ref={elRef}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Collapsible



function Caret({direction,color, size, onClickHandler}){
    const up = "m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z";
    const down = "M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z";
    const carets = [down, up];
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={size} height={size} 
             className="fill-[blue] cursor-pointer hover:fill-green-600" viewBox="0 0 16 16"
            onClick={onClickHandler}>
            <path d={carets[direction]}/>
        </svg>
    );
}


const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct","Nov","Dec"];
