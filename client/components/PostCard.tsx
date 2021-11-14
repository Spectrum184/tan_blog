import Image from "next/image";
import moment from "moment";
import Link from "next/link";

import { IPost } from "interface/post";
import { FC } from "react";
import { loaderImage } from "utils/fileUpload";

const PostCard: FC<IPost> = ({
  createdAt,
  category,
  title,
  slug,
  content,
  author,
  thumbnail,
}) => {
  return (
    <div className="mt-3">
      <div className="max-w-4xl px-10 py-4 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-light text-gray-600">
            {moment(createdAt).fromNow()}
          </span>
          <Link href={`/category/${category.slug}`}>
            <a className="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">
              {category.name}
            </a>
          </Link>
        </div>
        <div className="mt-1 flex">
          <div className="hidden md:flex w-32 md:content-center p-2">
            <Image
              loader={loaderImage}
              src={thumbnail}
              alt="avatar"
              width={100}
              height={100}
              className="object-cover shadow-md border-2"
            />
          </div>
          <div className="flex-1">
            <Link href={`/post/${slug}`}>
              <a className="text-2xl font-bold text-gray-900 hover:underline">
                {title}
              </a>
            </Link>
            <p className="mt-1 text-gray-600">
              {content}
              <Link href={`/post/${slug}`}>
                <a className="text-blue-500 ml-1 hover:underline">...</a>
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <Link href={`/post/${slug}`}>
              <a className="text-blue-500 hover:underline">Đọc tiếp...</a>
            </Link>
          </div>
          <div>
            <Link href={`/user/${author.username}`}>
              <a className="flex items-center">
                <Image
                  loader={loaderImage}
                  src={author.avatar}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full z-0"
                />
                <h1 className="font-bold text-gray-700 hover:underline ml-1">
                  {author.name}
                </h1>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
