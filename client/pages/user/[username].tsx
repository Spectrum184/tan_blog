import Layout from "components/Layout";
import Image from "next/image";
import cn from "classnames";
import moment from "moment";
import axios from "axios";

import { InferGetServerSidePropsType, NextPage } from "next";
import { useAppState } from "redux/store";
import { loaderImage } from "utils/fileUpload";
import { IUser } from "interface/user";

const Profile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user }) => {
  const { username } = useAppState((state) => state.user);

  return (
    <Layout isHomepage={true} title="Trang cá nhân">
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          <div className="w-full md:w-3/12 md:mx-2 mb-3">
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    loader={loaderImage}
                    src={user.avatar}
                    layout="fill"
                    alt="avatar.jpg"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {user.username}
              </h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">
                Thành viên blog
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                {user.about}
              </p>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Trạng thái</span>
                  <span className="ml-auto">
                    <span
                      className={cn("py-1 px-2 rounded text-white text-sm", {
                        "bg-green-500": user.isActivated,
                        "bg-red-500": !user.isActivated,
                      })}
                    >
                      {user.isActivated ? "Hoạt động" : "Bị cấm"}
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Ngày tham gia</span>
                  <span className="ml-auto">
                    {moment(user.createdAt).format("YYYY-MM-DD")}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-9/12 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide text-lg ml-2">
                  Thông tin cá nhân:
                </span>
              </div>
              <div className="text-gray-900">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="md:px-4 px-1 py-2 font-semibold">
                      Tên: {user.name}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="md:px-4 px-1 py-2 flex font-semibold">
                      Email: <span className="ml-1">{user.email}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="md:px-4 px-1 py-2 font-semibold">
                      Vị trí: {user.roles[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }: any) => {
  const res = await axios.get(
    `${process.env.SERVER_URL}/users/find-by-name/${query.username}`,
  );

  return {
    props: { user: res.data } as { user: IUser },
  };
};

export default Profile;
