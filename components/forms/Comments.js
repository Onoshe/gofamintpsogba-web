import React, { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { sortArrayByKey } from "@/lib/sortArrayByKey";


const Comments =({comments})=> {
    let commentNodes = <div className="comment-list">{getComments()}</div>;

      sortArrayByKey(comments, 'createdAt', 'ASC');

      function getComments() {    
        return comments?.map((comment, index) => { 
          return (
            <Comment
              key={`${index}+coment`} 
              author={comment?.name} 
              body={comment?.comment} 
              date={comment?.date}
              userImage={comment?.imageUrl}
              userName={comment?.name}
              />
          ); 
        });
      }
      
      function getCommentsLength(commentCount) {
        if (commentCount === 0 || !commentCount) {
          return 'No comments yet';
        } else if (commentCount === 1) {
          return "1 comment";
        } else {
          return `${commentCount} comments`;
        }
      }

      return(
        <div className="px-4">
           <h3 className="text-xl">Comments</h3>
            <div className="text-[#dedede] py-4">
                {getCommentsLength(comments?.length)}
            </div>
            {comments?.length? 
              <div className="max-h-[60vh] overflow-y-auto text-gray-700 bg-[#e0e4e8] py-1 px-3 rounded-md">
                {commentNodes}
            </div>
            : <></>}
        </div>  
      );
    
  } 
  

  
export default Comments;