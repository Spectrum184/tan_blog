import Link from "next/link";
import Image from "next/image";

import { ILayoutData } from "hooks/globalHooks";
import { FC } from "react";
import { loaderImage } from "utils/fileUpload";
import Tag from "./Tag";

const RightSideBar: FC<ILayoutData> = ({ categories, tags, authors }) => {
  return (
    <div className="hidden w-4/12 lg:block">
      <div className="px-8">
        <h1 className="text-xl font-bold text-gray-900 bg-green-400 p-2 rounded-lg max-w-sm rounded-b-none shadow-md flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <span className="ml-2">Danh mục</span>
        </h1>
        <div className="flex flex-col max-w-sm px-6 py-4 bg-white rounded-lg rounded-t-none shadow-md">
          <ul className="-mx-2">
            {categories.map((category) => (
              <li className="flex items-center my-2" key={category.id}>
                <Link href={`/category/${category.slug}`}>
                  <a className="mx-1 font-bold text-gray-900 hover:underline">
                    - {category.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="px-8 mt-10">
        <h1 className="text-xl font-bold text-gray-900 bg-green-400 p-2 rounded-lg max-w-sm rounded-b-none shadow-md flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          <span className="ml-2">Tags</span>
        </h1>
        <div className="flex flex-wrap max-w-sm px-4 py-6 bg-white rounded-lg rounded-t-none shadow-md">
          {tags.map((tag: string, index: number) => (
            <Tag tag={tag} key={index} isLayout={true} />
          ))}
        </div>
      </div>
      <div className="px-8 mt-10">
        <h1 className="text-xl font-bold text-gray-900 bg-green-400 p-2 rounded-lg max-w-sm rounded-b-none shadow-md flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="ml-2">Tác giả</span>
        </h1>
        <div className="flex flex-col max-w-sm px-8 py-6 bg-white rounded-lg rounded-t-none shadow-md">
          <ul className="-mx-4">
            {authors.map((author) => (
              <li className="flex items-center" key={author.id}>
                <div className="flex items-center">
                  <Image
                    loader={loaderImage}
                    src={author.avatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <Link href={`/user/${author.username}`} replace>
                    <a className="mx-2 font-bold text-gray-700 hover:underline">
                      {author.name}
                    </a>
                  </Link>
                  <span className="text-sm font-light text-gray-700">
                    đã đăng {author.posts} bài
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
