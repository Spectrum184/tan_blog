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
}) => {
  return (
    <div className="mt-4">
      <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <span className="font-light text-gray-600">
            {moment(createdAt).fromNow()}
          </span>
          <Link href={`/category/${category.slug}`} replace>
            <a className="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">
              {category.name}
            </a>
          </Link>
        </div>
        <div className="mt-2">
          <Link href={`/post/${slug}`} replace>
            <a className="text-2xl font-bold text-gray-700 hover:underline">
              {title}
            </a>
          </Link>
          <p className="mt-2 text-gray-600">{content}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Link href={`/post/${slug}`} replace>
            <a className="text-blue-500 hover:underline">Đọc tiếp...</a>
          </Link>
          <div>
            <Link href={`/user/${author.username}`}>
              <a className="flex items-center">
                <Image
                  src={loaderImage(author.avatar, "avatar")}
                  alt="avatar"
                  className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                />
                <h1 className="font-bold text-gray-700 hover:underline">
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
