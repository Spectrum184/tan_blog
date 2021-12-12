import Head from "next/head";
import Layout from "../components/Layout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

import type { InferGetServerSidePropsType, NextPage } from "next";
import { IPost } from "interface/post";
import { loaderImage } from "utils/fileUpload";
import { useRouter } from "next/router";
import { useHomepageData } from "hooks/globalHooks";
import { useEffect } from "react";

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ posts }) => {
    const { latestPosts, loading, topViewPosts } = useHomepageData();
    const router = useRouter();

    const goToPost = (param: string) => {
      router.push(`/post/${param}`);
    };

    useEffect(() => {
      if (posts.length === 0) router.push("404");
    }, [posts, router]);

    return (
      <Layout isHomepage={true}>
        <Head>
          <title>Trang chủ | ThanhTK Blog</title>
        </Head>
        <main className="mt-6">
          <div className="flex flex-wrap md:flex-no-wrap">
            <div className="md:pr-4 w-full md:w-7/12 relative rounded block mb-4 md:mb-0">
              <div className="w-full h-64 md:h-96 relative">
                <Image
                  loader={loaderImage}
                  alt="thumbnail"
                  src={posts[0].thumbnail}
                  layout="fill"
                  priority
                  className="object-cover shadow-md rounded rounded-b-none md:rounded-b cursor-pointer"
                  onClick={() => goToPost(posts[0].slug)}
                />
              </div>
              <span className="text-green-700 text-sm hidden md:block mt-4 hover:underline">
                <Link href={`/category/${posts[0].category.slug}`}>
                  <a>{posts[0].category.name}</a>
                </Link>
              </span>
              <div className="bg-white md:bg-transparent p-4 md:py-0 md:px-0 rounded-b">
                <h1 className="text-gray-800 md:text-4xl font-semibold hover:underline text-xl md:font-bold md:mt-2 mb-2 leading-tight">
                  <Link href={`/post/${posts[0].slug}`}>
                    <a>{posts[0].title.substr(0, 200)}</a>
                  </Link>
                </h1>
                <p className="text-gray-600 md:mb-4 bg-white md:bg-transparent">
                  {posts[0].content}...
                </p>
              </div>
              <div className="hidden md:block">
                <Link href={`/post/${posts[0].slug}`}>
                  <a className="inline-block px-6 py-3 mt-2 rounded-md bg-green-600 hover:bg-green-400 text-gray-100">
                    Đọc tiếp
                  </a>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-5/12">
              {posts.slice(1, 5).map((post) => (
                <div
                  className="w-full flex flex-col md:flex-row mb-4"
                  key={post.id}
                >
                  <div className="w-full md:w-40 md:h-36 h-64 relative">
                    <Image
                      loader={loaderImage}
                      alt="thumbnail"
                      src={post.thumbnail}
                      layout="fill"
                      priority
                      className="object-cover shadow-md rounded rounded-b-none md:rounded-r-none md:rounded-bl cursor-pointer"
                      onClick={() => goToPost(post.slug)}
                    />
                  </div>
                  <div className="bg-white rounded rounded-t-none md:rounded-l-none p-4 md:py-0 flex-1 shadow-md">
                    <span className="text-green-700 text-sm hidden md:block hover:underline">
                      <Link href={`/category/${post.category.slug}`}>
                        <a>{post.category.name}</a>
                      </Link>
                    </span>
                    <div className="md:mt-0 text-gray-800 font-semibold text-xl hover:underline mb-2">
                      <Link href={`/post/${post.slug}`}>
                        <a>{post.title.substr(0, 200)}</a>
                      </Link>
                    </div>
                    <p className="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
                      {post.content}...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex mt-4 mb-4 items-center justify-center md:justify-between">
            <h2 className="font-bold text-3xl">Bài đăng mới nhất</h2>
          </div>
          <div className="block md:flex">
            {!loading &&
              latestPosts.map((post, index: number) => (
                <div
                  className={cn("w-full md:w-1/3 md:p-4 mb-4 md:mb-0", {
                    "md:pl-0": index === 0,
                    "md:pr-0": index === 2,
                  })}
                  key={post.id}
                >
                  <div className="relative w-full h-64">
                    <Image
                      loader={loaderImage}
                      alt="thumbnail"
                      src={post.thumbnail}
                      layout="fill"
                      priority
                      className="object-cover shadow-md rounded rounded-b-none md:rounded-b cursor-pointer"
                      onClick={() => goToPost(post.slug)}
                    />
                  </div>
                  <div className="p-4 md:p-0 bg-white md:bg-transparent rounded-b">
                    <h2 className="font-semibold md:font-bold text-xl md:text-2xl text-gray-800 hover:underline">
                      <Link href={`/post/${post.slug}`}>
                        <a>{post.title.substr(0, 200)}</a>
                      </Link>
                    </h2>
                    <p className="text-gray-700 mt-2">{post.content}...</p>
                    <div className="hidden md:block">
                      <Link href={`/post/${post.slug}`}>
                        <a className="inline-block px-6 py-3 mt-2 rounded-md bg-green-600 hover:bg-green-400 text-gray-100">
                          Đọc tiếp
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex mt-4 mb-4 items-center justify-center md:justify-between">
            <h2 className="font-bold text-3xl">Bài đăng nổi bật</h2>
          </div>
          <div className="block md:flex mb-4">
            {!loading &&
              topViewPosts.map((post, index: number) => (
                <div
                  className={cn("w-full md:w-1/3 md:p-4 mb-4 md:mb-0", {
                    "md:pl-0": index === 0,
                    "md:pr-0": index === 2,
                  })}
                  key={post.id}
                >
                  <div className="relative w-full h-64">
                    <Image
                      loader={loaderImage}
                      alt="thumbnail"
                      src={post.thumbnail}
                      layout="fill"
                      priority
                      className="object-cover shadow-md rounded rounded-b-none md:rounded-b cursor-pointer"
                      onClick={() => goToPost(post.slug)}
                    />
                  </div>
                  <div className="p-4 md:p-0 bg-white md:bg-transparent rounded-b">
                    <h2 className="font-semibold md:font-bold text-xl md:text-2xl text-gray-800 hover:underline">
                      <Link href={`/post/${post.slug}`}>
                        <a>{post.title.substr(0, 200)}</a>
                      </Link>
                    </h2>
                    <p className="text-gray-700 mt-2">{post.content}...</p>
                    <div className="hidden md:block">
                      <Link href={`/post/${post.slug}`}>
                        <a className="inline-block px-6 py-3 mt-2 rounded-md bg-green-600 hover:bg-green-400 text-gray-100">
                          Đọc tiếp
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </Layout>
    );
  };

export const getServerSideProps = async ({ query }: any) => {
  const res = await axios.get(
    `${process.env.SERVER_URL}/posts/get-random-post`,
  );

  return {
    props: { posts: res.data } as { posts: IPost[] },
  };
};

export default Home;
