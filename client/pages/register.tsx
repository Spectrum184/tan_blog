import Head from "next/head";
import Link from "next/link";

import { useRouter } from "next/router";
import { SyntheticEvent, useState, ChangeEvent, useEffect } from "react";
import { NextPage } from "next";
import { IRegister } from "../interface/auth";
import { validateRegister } from "../utils/validation";
import { useAppDispatch } from "../redux/store";
import { register } from "../redux/userStore";

const logged =
  (typeof window !== "undefined" && localStorage.getItem("logged")) || null;

const Register: NextPage = () => {
  const initialState: IRegister = {
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  const [userData, setUserData] = useState<IRegister>(initialState);
  const [error, setError] = useState<IRegister>(initialState);
  const { username, name, password, email, confirmPassword } = userData;
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (logged) router.replace("/");
  }, [router]);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const { isError, error } = validateRegister(userData);

    if (isError) {
      setError(error);
    } else {
      dispatch(register(userData));
    }
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-green-400">
      <Head>
        <title>Đăng kí | ThanhTK Blog</title>
        <meta lang="en" charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-white min-h-1/2 p-12 shadow-lg border-green-700 flex justify-center items-center rounded-md">
        <div>
          <form action="POST" onSubmit={onSubmit}>
            <div className="text-center">
              <span className="text-sm text-gray-900">Chào mừng bạn!</span>
              <h1 className="text-2xl font-bold">Đăng kí tài khoản mới</h1>
            </div>
            <div className="mt-5">
              <label className="block text-md mb-2" htmlFor="username">
                Tên đăng nhập
              </label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                autoFocus
                value={username}
                onChange={handleChangeInput}
              />
              <small className="text-red-500 text-sm w-full">
                {error.username && error.username}
              </small>
            </div>
            <div className="my-3">
              <label className="block text-md mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="text"
                name="email"
                placeholder="Địa chỉ email"
                value={email}
                onChange={handleChangeInput}
              />
              <small className="text-red-500 text-sm w-full">
                {error.email && error.email}
              </small>
            </div>
            <div className="my-3">
              <label className="block text-md mb-2" htmlFor="name">
                Tên đầy đủ:
              </label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="text"
                name="name"
                placeholder="Tên của bạn"
                value={name}
                onChange={handleChangeInput}
              />
              <small className="text-red-500 text-sm w-full">
                {error.name && error.name}
              </small>
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
              <small className="text-red-500 text-sm w-full">
                {error.password && error.password}
              </small>
            </div>
            <div className="my-3">
              <label className="block text-md mb-2" htmlFor="confirmPassword">
                Xác nhận mật khẩu:
              </label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="password"
                name="confirmPassword"
                placeholder="Xác nhận lại mật khẩu"
                value={confirmPassword}
                onChange={handleChangeInput}
              />
              <small className="text-red-500 text-sm w-full">
                {error.confirmPassword && error.confirmPassword}
              </small>
            </div>
            <button className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100">
              Đăng kí
            </button>
          </form>
          <p className="mt-8">
            Bạn đã có tài khoản?
            <Link href="/login">
              <a className="ml-2">
                <span className="cursor-pointer text-sm text-blue-600">
                  Đăng nhập
                </span>
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
