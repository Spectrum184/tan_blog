import Head from "next/head";
import Layout from "../components/Layout";
import Pagination from "components/Pagination";
import PostCard from "components/PostCard";

import type { NextPage } from "next";
import { useState } from "react";
import { useListPost } from "hooks/globalHooks";

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, data, totalPage } = useListPost({
    prefix: "posts",
    page: currentPage,
    sort: "time",
  });

  return (
    <Layout>
      <Head>
        <title>Trang chủ | ThanhTK Blog</title>
      </Head>
      <main>
        {!loading && data.map((item) => <PostCard {...item} key={item.id} />)}
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPage={totalPage}
        />
      </main>
    </Layout>
  );
};

export default Home;
