import LayoutAdmin from "components/admin/LayoutAdmin";
import axios from "axios";
import dynamic from "next/dynamic";
import ConfirmModal from "components/ConfirmModal";

import { ICategory } from "interface/category";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useState, SyntheticEvent, ChangeEvent } from "react";
import { IPost } from "interface/post";
import { checkImageFile, uploadImage } from "utils/fileUpload";
import { useAppDispatch, useAppState } from "redux/store";
import { setAlertState } from "redux/alertStore";
import { postDataAPI } from "utils/fetchData";

const Quill = dynamic(() => import("components/editor/ReactQuill"), {
  ssr: false,
});

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
  const initialState: IPost = {
    id: "",
    title: "",
    slug: "",
    content: "",
    thumbnail: "",
    status: true,
    categoryId: "",
    tag: "",
  };
  const [postData, setPostData] = useState(initialState);
  const { title, status, categoryId, tag, content } = postData;
  const [visible, setVisible] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const dispatch = useAppDispatch();
  const { jwtToken } = useAppState((state) => state.user);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await postDataAPI("posts", postData, jwtToken);

      console.log(res.data);
      dispatch(
        setAlertState({
          show: true,
          message: "Đăng bài thành công",
          type: "success",
        })
      );
    } catch (error: any) {
      dispatch(
        setAlertState({
          show: true,
          message: error.response.data.message,
          type: "error",
        })
      );
    }
  };

  const onUploadFile = async () => {
    if (!file) return;
    try {
      const photo = await uploadImage(file, "upload-post-image");

      setPostData({ ...postData, thumbnail: photo.imageUrl });
      setVisible(false);
    } catch (error: any) {
      dispatch(
        setAlertState({
          show: true,
          message: error.response.data.message,
          type: "error",
        })
      );
    }
  };

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      dispatch(
        setAlertState({
          show: true,
          message: "Vui lòng chọn file",
          type: "error",
        })
      );
      e.target.value = "";
      return;
    }

    const file = files[0];

    const err = checkImageFile(file);

    if (err) {
      dispatch(setAlertState({ show: true, message: err, type: "error" }));

      e.target.value = "";

      return;
    }

    setFile(file);
    setVisible(true);
  };

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setPostData({ ...postData, [name]: value });
  };

  return (
    <LayoutAdmin title="Đăng bài">
      <main>
        <div className="ml-4 mt-2">
          <h3 className="text-center text-3xl mb-2 underline">VIẾT BÀI: </h3>
          <form action="POST" className="flex flex-wrap" onSubmit={onSubmit}>
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
                value={title}
                onChange={handleChangeInput}
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
                  onChange={handleUploadFile}
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
                  checked={status}
                  onChange={() =>
                    setPostData((post) => {
                      return { ...post, status: !post.status };
                    })
                  }
                />
              </div>
            </div>
            <div className="mb-4 flex items-center flex-wrap w-full">
              <div className="flex items-center lg:w-1/2 w-full mb-2 lg:mb-0">
                <label className="text-lg text-gray-900 w-32">
                  Thể loại<span className="text-red-500">*</span>:
                </label>
                <select
                  value={categoryId}
                  onChange={handleChangeInput}
                  name="categoryId"
                  className="ml-2 text-lg rounded border-2 border-gray-200 text-gray-900 px-2 py-1 bg-white hover:border-gray-400 focus:outline-none cursor-pointer"
                >
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
                  placeholder="Cách nhau bằng các dấu phẩy..."
                  value={tag}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            <div className="mb-2 min-h-1/4 w-full mr-4">
              <label className="text-lg text-gray-900 lg:w-28 w-30">
                Nội dung<span className="text-red-500">*</span>:
              </label>
              <Quill setContent={setPostData} content={content} />
            </div>
            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="p-2 pl-5 pr-5 bg-green-500 text-gray-100 text-lg rounded-lg focus:border-4 border-green-300"
              >
                Đăng bài
              </button>
            </div>
          </form>
        </div>
        <ConfirmModal
          visible={visible}
          setVisible={setVisible}
          header="Tải ảnh lên"
          content="Bạn có muốn tải ảnh này lên không?"
          onConfirm={onUploadFile}
        />
      </main>
    </LayoutAdmin>
  );
};

export default Post;
