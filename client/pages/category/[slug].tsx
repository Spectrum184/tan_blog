import Layout from "components/Layout";
import Head from "next/head";
import PostCard from "components/PostCard";
import Pagination from "components/Pagination";

import { useListPost } from "hooks/globalHooks";
import { NextPage } from "next";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";

const Category: NextPage = () => {
  const { query } = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sort, setSort] = useState<"time" | "view">("time");
  const [order, setOrder] = useState<"ASC" | "DESC">("DESC");
  const { loading, data, totalPage } = useListPost({
    prefix: "categories",
    page: currentPage,
    sort,
    order,
    slug: query.slug,
  });

  const onChangeSearch = (e: ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "1":
        setSort("time");
        setOrder("DESC");
        break;
      case "2":
        setSort("time");
        setOrder("ASC");
        break;
      case "3":
        setSort("view");
        setOrder("DESC");
        break;
      case "4":
        setSort("view");
        setOrder("ASC");
        break;

      default:
        return new Error("Không tồn tại giá trị select!");
    }
  };

  return (
    <Layout>
      <Head>
        <title> Danh mục | ThanhTK Blog</title>
      </Head>
      <main>
        <div className="flex content-center justify-between p-2 bg-green-400 rounded-t-lg">
          <h1 className="text-md font-bold text-gray-900 md:text-xl">
            Bài viết
          </h1>
          <div className="flex content-center justify-center">
            <p className="w-20">Sắp xếp:</p>
            <select
              className="bg-white rounded-md p-1 outline-none"
              defaultValue="1"
              onChange={onChangeSearch}
            >
              <option value="1">Mới nhất</option>
              <option value="2">Cũ nhất</option>
              <option value="3">Lượt xem &#8595;</option>
              <option value="4">Lượt xem &#8593;</option>
            </select>
          </div>
        </div>
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

export default Category;
