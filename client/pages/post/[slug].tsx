import Layout from "components/Layout";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import moment from "moment";
import Image from "next/image";

import { InferGetServerSidePropsType, NextPage } from "next";
import { IPost } from "interface/post";
import { loaderImage } from "utils/fileUpload";
import ShareModal from "components/ShareModal";
import Tag from "components/Tag";

const Post: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ post }) => {
    return (
      <Layout>
        <Head>
          <title>{post.title}</title>
        </Head>
        <main className="w-full">
          <h1 className="text-2xl font-bold text-gray-900 md:text-4xl mb-2">
            {post.title}
          </h1>
          <div className="w-full flex items-center justify-between mb-2 text-gray-600 text-sm">
            <div>
              Tác giả
              <Link href={`/user/${post.author.username}`}>
                <a className="m-1 underline hover:text-gray-800">
                  {post.author.name}
                </a>
              </Link>
              từ {moment(post.createdAt).fromNow()}
            </div>
            <div className="flex content-center">
              <span className="mr-1">{post.views}</span>
              <span className="mr-1 hidden md:block">lượt xem</span>
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
          <div className="relative w-full h-64 md:h-72">
            <Image
              src={post.thumbnail}
              alt="thumbnail"
              loader={loaderImage}
              layout="fill"
              priority
              className="object-cover shadow-md rounded"
            />
          </div>
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="w-full flex items-center justify-between">
            <div className="">
              <ShareModal url={`post/${post.slug}`} />
            </div>
            <div className="flex items-center">
              <p className="hidden md:block">Thẻ:</p>
              <div>
                {post.tags.slice(0, 2).map((tag, index: number) => (
                  <Tag tag={tag} key={index} isLayout={false} />
                ))}
              </div>
            </div>
          </div>
          <div className=""></div>
        </main>
      </Layout>
    );
  };

export const getServerSideProps = async ({ query }: any) => {
  const res = await axios.get(`${process.env.SERVER_URL}/posts/${query.slug}`);

  return {
    props: { post: res.data } as { post: IPost },
  };
};

export default Post;
