import Head from "next/head";
import Layout from "../components/Layout";
import Pagination from "components/Pagination";

import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <Layout>
      <Head>
        <title>Trang chủ | ThanhTK Blog</title>
      </Head>
      <main>
        <h1 className="text-gray-900">OK</h1>
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPage={6}
        />
      </main>
    </Layout>
  );
};

export default Home;
