import LayoutAdmin from "components/admin/LayoutAdmin";
import axios from "axios";

import { ICategory } from "interface/category";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("http://localhost:5000/api/categories");
  const categories: ICategory[] = await res.data.categories;

  return {
    props: {
      categories,
    },
  };
};

const Post: NextPage = ({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <LayoutAdmin>
      <main>
        <div className="ml-4 mt-2">
          <h3 className="text-center text-3xl">VIẾT BÀI: </h3>
          <div className="">
            <form action="POST" className="flex flex-wrap">
              <div className="mb-4 flex items-center w-full">
                <label className="text-lg text-gray-900 w-32">
                  Tiêu đề <span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  className="px-4 min-w-3/4 border-2 py-2 rounded-md text-lg outline-none ml-2"
                  name="title"
                  id="title"
                  autoFocus
                />
              </div>
              <div className="mb-4 flex items-center flex-wrap w-full">
                <div className="flex items-center lg:w-1/2 w-full">
                  <label className="text-lg text-gray-900 w-32">
                    Ảnh thu nhỏ<span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="file"
                    className="px-4 border-2 py-2 rounded-md text-sm outline-none ml-2"
                    name="thumbnail"
                    id="thumbnail"
                  />
                </div>
                <div className="flex items-center lg:w-1/2 w-full">
                  <label className="text-lg text-gray-900 lg:w-28 w-30">
                    Trạng thái<span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="checkbox"
                    name="status"
                    id="status"
                    className="ml-2"
                  />
                </div>
              </div>
              <div className="mb-4 flex items-center flex-wrap w-full">
                <div className="flex items-center lg:w-1/2 w-full">
                  <label className="text-lg text-gray-900 w-32">
                    Thể loại<span className="text-red-500">*</span>:
                  </label>
                  <select className="ml-2 text-lg rounded border-2 border-gray-200 text-gray-900 px-2 py-1 bg-white hover:border-gray-400 focus:outline-none cursor-pointer">
                    {categories.map((category: ICategory) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center lg:w-1/2 w-full">
                  <label className="text-lg text-gray-900 lg:w-28 w-30">
                    Ghắn thẻ<span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="text"
                    name="tag"
                    id="tag"
                    className="px-4 border-2 py-2 rounded-md text-sm outline-none ml-2"
                  />
                </div>
              </div>
              <div className="flex justify-center w-full">
                <button className="p-2 pl-5 pr-5 bg-green-500 text-gray-100 text-lg rounded-lg focus:border-4 border-green-300">
                  Đăng bài
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
};

export default Post;
