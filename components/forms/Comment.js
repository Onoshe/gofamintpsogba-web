import React from "react";
import {GoPerson} from "react-icons/go";
import HorizontalLine from "../horizontalLine/HorizontalLine";
import Image from "next/image";



const Comment =({author, body, date, userName, userImage})=> {
      //console.log(date);
      
      return(
        <div className="border-solid border-2 border-[silver] pl-[10px] rounded-md mb-[10px]">
          <div className="flex flex-row pt-[15px] px-[10px]">
              <div className="rounded-full p-1 bg-[silver]">
                {userImage?
                  <Image src={userImage} alt="userImage" className="w-[40px] h-[40px] rounded-lg " />
                : <GoPerson size={40} color="gray" />}
              </div>
              <p className="pl-2">{userName} <span style={{fontWeight:'normal'}}>says:</span></p>
              
          </div>
          <p className="font-normal pt-2 pl-5"
            >{date}</p>
          <HorizontalLine bColor="silver" widths={97}/>
          <p className="italic ml-4 pr-1 py-3">- {body}</p>
        </div>
      );
  }


  export default Comment;


  function getDatePosted(date){
    let dateSet = new Date(date).toString();


    return date? dateSet : ""
  }