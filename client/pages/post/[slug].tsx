import Layout from "components/Layout";
import Head from "next/head";
import axios from "axios";

import { FC } from "react";
import { InferGetServerSidePropsType } from "next";
import { IPost } from "interface/post";

const Post: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  post,
}) => {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className="w-full">
        <h1 className="text-md font-bold text-gray-900 md:text-4xl mb-2">
          {post.title}
        </h1>
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }: any) => {
  const res = await axios.get(`http://localhost:5000/api/posts/${query.slug}`);

  return {
    props: { post: res.data } as { post: IPost },
  };
};

export default Post;
