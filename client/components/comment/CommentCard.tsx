import Image from "next/image";
import ReplyCard from "./ReplyCard";

import { IComment } from "interface/comment";
import { FC, useState } from "react";
import { loaderImage } from "utils/fileUpload";
import { useAppDispatch, useAppState } from "redux/store";
import { createReply } from "redux/commentStore";

const CommentCard: FC<IComment> = ({
  user,
  content,
  createdAt,
  replies,
  id,
}) => {
  const [isReply, setIsReply] = useState<boolean>(false);
  const [contentReply, setContentReply] = useState<string>("");
  const { username, roles, jwtToken } = useAppState((state) => state.user);
  const dispatch = useAppDispatch();

  const onReply = () => {
    dispatch(createReply({ commentId: id, content: contentReply, jwtToken }));
    setContentReply("");
    setIsReply(!isReply);
  };

  return (
    <div className="flex mb-2">
      <div className="flex-shrink-0 mr-3">
        <div className="relative mt-2 w-6 h-6 sm:w-10 sm:h-10">
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
                <button
                  onClick={onReply}
                  className="p-1 pl-4 pr-4 m-2 bg-green-500 text-gray-100 text-lg rounded-lg focus:border-4 border-green-300"
                >
                  Tr??? l???i
                </button>
                <button
                  className="p-1 pl-4 pr-4 bg-red-500 text-gray-100 text-lg rounded-lg focus:border-4 border-red-300"
                  onClick={() => {
                    setIsReply(!isReply);
                    setContentReply("");
                  }}
                >
                  Hu???
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
                Tr??? l???i
              </p>
              {username === user.username && (
                <p className="text-sm mx-4 text-gray-500 font-semibold hover:underline cursor-pointer">
                  S???a
                </p>
              )}
              {(username === user.username ||
                roles.includes("ADMIN") ||
                roles.includes("MOD")) && (
                <p className="text-sm text-gray-500 font-semibold hover:underline cursor-pointer">
                  Xo??
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
