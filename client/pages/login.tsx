import Head from "next/head";
import Link from "next/link";

import { useRouter } from "next/router";
import { NextPage } from "next";
import { ChangeEvent, SyntheticEvent, useState, useEffect } from "react";
import { ILogin } from "../interface/auth";
import { useAppDispatch } from "../redux/store";
import { login } from "../redux/userStore";

const logged =
  (typeof window !== "undefined" && localStorage.getItem("logged")) || null;

const Login: NextPage = () => {
  const initialState: ILogin = {
    username: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { username, password } = userData;
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (logged) router.replace("/");
  }, [router]);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(login(userData));
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-green-400">
      <Head>
        <title>Đăng nhập | ThanhTK Blog</title>
        <meta lang="en" charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-white min-h-1/4 p-10 shadow-lg border-green-700 flex justify-center items-center rounded-md">
        <div>
          <form action="POST" onSubmit={onSubmit}>
            <div className="text-center">
              <span className="text-sm text-gray-900">Chào mừng bạn!</span>
              <h1 className="text-2xl font-bold">Đăng nhập với tài khoản</h1>
            </div>
            <div className="mt-5">
              <label className="block text-md mb-2" htmlFor="username">
                Tên đăng nhập hoặc Email:
              </label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="text"
                name="username"
                placeholder="Tên đăng nhập hoặc email"
                autoFocus
                value={username}
                onChange={handleChangeInput}
              />
            </div>
            <div className="my-3">
              <label className="block text-md mb-2" htmlFor="password">
                Mật khẩu:
              </label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={handleChangeInput}
              />
            </div>
            <div className="flex justify-between">
              <div>
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="rememberMe"
                />
                <span className="text-sm ml-2">Ghi nhớ tôi!</span>
              </div>
              <span className="text-sm text-blue-700 hover:underline cursor-pointer">
                Quên mật khẩu?
              </span>
            </div>
            <div className="">
              <button className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100">
                Đăng nhập
              </button>
              <div className="flex space-x-2 justify-center items-end bg-red-600 hover:bg-red-400 text-white py-2 rounded-md transition duration-100">
                <button>Đăng nhập với Google</button>
              </div>
              <div className="flex space-x-2 justify-center items-end bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition duration-100 my-3">
                <button>Đăng nhập với Facebook</button>
              </div>
            </div>
          </form>
          <p className="mt-8">
            Bạn chưa có tài khoản?
            <Link href="/register">
              <a className="ml-2">
                <span className="cursor-pointer text-sm text-blue-600">
                  Đăng kí ngay
                </span>
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
