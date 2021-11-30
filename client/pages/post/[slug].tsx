import Layout from "components/Layout";
import Head from "next/head";
import axios from "axios";

import { InferGetServerSidePropsType, NextPage } from "next";
import { IPost } from "interface/post";

const Post: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ post }) => {
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
  const res = await axios.get(`${process.env.SERVER_URL}/posts/${query.slug}`);

  return {
    props: { post: res.data } as { post: IPost },
  };
};

export default Post;
