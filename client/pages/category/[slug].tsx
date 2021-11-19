import Layout from "components/Layout";

import { NextPage } from "next";
import { useRouter } from "next/router";

const Category: NextPage = () => {
  const { query } = useRouter();

  console.log(query);
  return (
    <Layout>
      <div className="flex content-center justify-between p-2 bg-green-400 rounded-t-lg">
        <h1 className="text-md font-bold text-gray-900 md:text-xl">Bài viết</h1>
        <div className="flex content-center justify-center">
          <p className="w-20">Sắp xếp:</p>
          <select
            className="bg-white rounded-md p-1 outline-none"
            defaultValue="1"
          >
            <option value="1">Mới nhất</option>
            <option value="2">Cũ nhất</option>
            <option value="3">Lượt xem &#8595;</option>
            <option value="4">Lượt xem &#8593;</option>
          </select>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
