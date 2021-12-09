import Image from "next/image";

import { IReply } from "interface/comment";
import { FC, useState } from "react";
import { loaderImage } from "utils/fileUpload";

type PropTypes = {
  commentId: string;
  reply: IReply;
};

const ReplyCard: FC<PropTypes> = ({ commentId, reply }) => {
  const [isReply, setIsReply] = useState<boolean>(false);
  const [contentReply, setContentReply] = useState<string>("");

  return (
    <div className="flex mb-2">
      <div className="flex-shrink-0 mr-3">
        <div className="relative mt-2 w-8 h-8 sm:w-10 sm:h-10">
          <Image
            layout="fill"
            src={reply.user.avatar}
            loader={loaderImage}
            alt={reply.user.username}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex-1 border border-gray-300 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong>{reply.user.name}</strong>
        <span className="text-xs text-gray-400 ml-2">{reply.createdAt}</span>
        <p className="text-sm ml-1">{reply.content}</p>
        <div className="mt-2 ml-1">
          {isReply ? (
            <div className="flex flex-col md:flex-row">
              <textarea
                className="w-full rounded-md md:w-3/4 outline-none"
                name="reply"
                id="reply"
                cols={30}
                rows={4}
                value={contentReply}
                onChange={(e) => setContentReply(e.target.value)}
              />
              <div className="md:ml-4 flex mt-2 md:mt-0 md:flex-col items-center justify-center">
                <button className="p-1 pl-4 pr-4 m-2 bg-green-500 text-gray-100 text-lg rounded-lg focus:border-4 border-green-300">
                  Trả lời
                </button>
                <button
                  className="p-1 pl-4 pr-4 bg-red-500 text-gray-100 text-lg rounded-lg focus:border-4 border-red-300"
                  onClick={() => {
                    setIsReply(!isReply);
                    setContentReply("");
                  }}
                >
                  Huỷ
                </button>
              </div>
            </div>
          ) : (
            <p
              onClick={() => {
                setContentReply(`@${reply.user.name}:`);
                setIsReply(!isReply);
              }}
              className="text-sm text-gray-500 font-semibold hover:underline cursor-pointer"
            >
              Trả lời
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ReplyCard;
