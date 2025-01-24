import React from 'react'
import HorizontalLine from '@/components/horizontalLine/HorizontalLine';
import {GoCalendar, GoPerson} from "react-icons/go";
import {FaComment, FaFolder} from 'react-icons/fa';



const Preview = ({formValues, content, msgbody, photo}) => {
    const style1 = 'flex flex-row flex-wrap justify-start items-center text-[12px] sm:text-[16px]  md:text-[20px]';
    const style2 = 'flex flex-row items-center mr-3 mb-2 text-[rgb(40,42,47)]';
    
  return (
    <div className="pt-[20px] px-[10px] sm:p-[30px] md:px-[60px] lg:px-[100px] flex justify-center flex-col items-center content-center bg-mainColor ">
            <div className="flex flex-col w-full">
                <h1 className='font-archivo py-5 pb-2 text-xl sm:text-2xl md:text-3xl lg:text-5xl text-[rgb(40,42,47)] text-center'>
                    {formValues.topic}
                </h1>
                
                <div className={style1}>
                    <div className={style2}><GoPerson size={28} color="gray"/><span className="pl-2">{formValues.messageBy}</span></div>
                    <div className={style2}><FaFolder size={28} color="gray"/><span className="pl-2">{"Pastor's Corner"}</span></div>
                    <div className={style2}><GoCalendar size={28} color="gray"/><span className="pl-2">{formValues.date}</span></div>
                    <div className={style2}><FaComment size={28} color="gray"/><span className="pl-2">{formValues.length}</span></div>
                </div>
                <HorizontalLine bColor="gray" widths={100} margTop={2}/>
                <div className="text-justify text-[12px] sm:text-[14px]  md:text-[16px] text-[darkslategray]" 
                    >
                    <p className="pt-5 pb-3 italic">{formValues.bibleRef}</p>
                    <div className='' 
                            dangerouslySetInnerHTML={{ __html: content }}>
                    </div>
                    {/*msgbody.map((txt, i)=>{
                        //const formated = formatText(txt);
                        return <p className="pb-2" key={`${i}++lv`}>
                                    {txt}
                                </p>
                    })*/}
                    <p className={`italic pb-5 ${formValues?.prayer? '' : 'hidden'}`}>
                        <span className="font-bold">
                        Pray: </span>{formValues.prayer}
                    </p>
                </div>
            </div>
        </div>
  )
}


export default Preview;



/*function formatText(txt){
    const starText = txt.includes("*");
    const newTxt = txt.replace(/[*]/g, "");

    const formated = {
        //color: starText? "dodgerblue" : "rgb(40, 100, 110)",
        fontStyle: starText? 'italic' : 'normal',
        //fontWeight:starText? 'bold' : 'normal',
    }

    return {formatStyle: formated, formatTxt: newTxt}
}*/