import Image from 'next/image'

import { IComment } from 'interface/comment';
import { FC } from "react";



const CommentCard: FC<IComment> = ({user, content, createdAt}) => {
  
  
    return (<div className="flex">
    <div className="flex-shrink-0 mr-3">
      <div className="">
          <Image />
      </div>
    </div>
    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
      <strong>{user.name}</strong> <span className="text-xs text-gray-400">{createdAt}</span>
      <p className="text-sm">
         {content}
      </p>
      <div className="mt-4 flex items-center">
        <div className="flex -space-x-2 mr-2">
          <img className="rounded-full w-6 h-6 border border-white" src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" alt="">
          <img className="rounded-full w-6 h-6 border border-white" src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" alt="">
        </div>
        <div className="text-sm text-gray-500 font-semibold">
          5 Replies
        </div>
      </div>
    </div>
  </div>);
};

export default CommentCard;
