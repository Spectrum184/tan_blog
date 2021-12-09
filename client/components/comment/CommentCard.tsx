import Image from "next/image";
import ReplyCard from "./ReplyCard";

import { IComment } from "interface/comment";
import { FC, useState } from "react";
import { loaderImage } from "utils/fileUpload";
import { useAppDispatch, useAppState } from "redux/store";

const CommentCard: FC<IComment> = ({
  user,
  content,
  createdAt,
  replies,
  id,
}) => {
  const [isReply, setIsReply] = useState<boolean>(false);
  const [contentReply, setContentReply] = useState<string>("");
  const { username, roles } = useAppState((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <div className="flex mb-2">
      <div className="flex-shrink-0 mr-3">
        <div className="relative mt-2 w-8 h-8 sm:w-10 sm:h-10">
          <Image
            layout="fill"
            src={user.avatar}
            loader={loaderImage}
            alt={user.username}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex-1 border border-gray-300 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong>{user.name}</strong>
        <span className="text-xs text-gray-400 ml-2">{createdAt}</span>
        <p className="text-sm ml-1">{content}</p>
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
            <div className="flex">
              <p
                onClick={() => {
                  setContentReply(`@${user.name}:`);
                  setIsReply(!isReply);
                }}
                className="text-sm text-gray-500 font-semibold hover:underline cursor-pointer"
              >
                Trả lời
              </p>
              {username === user.username && (
                <p className="text-sm mx-4 text-gray-500 font-semibold hover:underline cursor-pointer">
                  Sửa
                </p>
              )}
              {(username === user.username ||
                roles.includes("ADMIN") ||
                roles.includes("MOD")) && (
                <p className="text-sm text-gray-500 font-semibold hover:underline cursor-pointer">
                  Xoá
                </p>
              )}
            </div>
          )}
        </div>
        {replies &&
          replies.length > 0 &&
          replies.map((reply) => (
            <ReplyCard commentId={id} reply={reply} key={reply.id} />
          ))}
      </div>
    </div>
  );
};

export default CommentCard;
