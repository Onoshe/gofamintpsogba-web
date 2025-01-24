'use client'
import React from "react";
import SendEmail from "./SendEmail";
import Comments from "./Comments";



const LeaveAComment =({comments, userComment, commentInfo,
  setCommentSent})=> {

      function addComment(newComment) { 
        const date = getPostDate();
        const  {user_name, user_email,user_phoneNo,message, contact_user} = newComment;
        const comment = {
          id: comments?.length + 1 || 0,
          postDate: date,
          user: user_name,
          email : user_email,
          phoneNo: user_phoneNo,
          message,
        };
        userComment(comment);
      }

      return(
        <div className="w-full text-white rounded-3xl bg-[#909090] my-8 py-4">
          <SendEmail
            contactTitle="Leave a reply"
            contStyle={`w-[99%] py-2 pt-0 pb-10 px-4`}
            sendFieldsStyle={`px-1 sm:px-5 `}
            nocontactus
            submitText="Post Comment"
            submitWidth="20%"
            setUserEntry={addComment}
            commentInfo={commentInfo}
            setCommentSent={setCommentSent}
            />
           <Comments comments={comments}
            />
        </div>  
      );
    
  } 
  

  
export default LeaveAComment;


const commentsArr = [
  {id: 1, author: "landiggity", date:"17 April, 2022", body: "This is my first comment on this forum so don't be a dick",},
  {id: 2, author: "scarlett-jo",  date:"18 Sept., 2022", body: "That's a mighty fine comment you've got there my good looking fellow..."},
  {id: 3, author: "rosco", date:"21 Oct., 2022", body:"What is the meaning of all of this 'React' mumbo-jumbo?"}
];

function getPostDate(){
  const today = new Date();
  let gm = today.toUTCString();
  //`${da}-${mo}-${yr} ${hr}:${mn} ${gm}`;
  return `${gm}`; 
}