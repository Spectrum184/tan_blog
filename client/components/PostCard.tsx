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
  views,
  tags,
}) => {
  return (
    <div className="mt-3">
      <div className="max-w-4xl bg-white rounded-lg shadow-md flex flex-col md:flex-row">
        <div className="flex content-center flex-col md:flex-row md:w-1/5 w-full">
          <Image
            loader={loaderImage}
            src={thumbnail}
            alt="avatar"
            width={256}
            height={256}
            className="object-cover shadow-md md:rounded-l-lg"
          />
        </div>
        <div className="mx-auto px-10 py-4 md:w-4/5 w-full">
          <div className="flex items-center justify-between">
            <span className="font-light text-xs text-gray-600 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {moment(createdAt).fromNow()}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {views}
            </span>
            <Link href={`/category/${category.slug}`}>
              <a className="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">
                {category.name}
              </a>
            </Link>
          </div>
          <div className="mt-1">
            <Link href={`/post/${slug}`}>
              <a className="text-2xl font-bold text-gray-900 hover:underline">
                {title.substr(0, 100)}
              </a>
            </Link>
            <p className="mt-1 text-gray-600">
              {content}
              <Link href={`/post/${slug}`}>
                <a className="text-gray-600 ml-1 hover:underline">
                  ...Đọc tiếp
                </a>
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              {tags.slice(0, 3).map((tag: string, index: number) => (
                <span
                  key={index}
                  className="m-1 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-full p-1 text-sm leading-loose cursor-pointer"
                >
                  <Link href={`/tag/${tag}`}>
                    <a>#{tag}</a>
                  </Link>
                </span>
              ))}
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
    </div>
  );
};

export default PostCard;
