import Head from "next/head";
import { NextPage } from "next";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { ILogin } from "../interface/auth";

const initialState: ILogin = {
  username: "",
  password: "",
};

const Login: NextPage = () => {
  const [userData, setUserData] = useState(initialState);
  const { username, password } = userData;

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-green-400">
      <Head>
        <title>Login | ThanhTK Blog</title>
      </Head>
      <div className="bg-white min-h-1/4 p-10 shadow-lg border-green-700 flex justify-center items-center rounded-md">
        <div>
          <form>
            <div className="text-center">
              <span className="text-sm text-gray-900">Welcome back</span>
              <h1 className="text-2xl font-bold">Login to your account</h1>
            </div>
            <div className="mt-5">
              <label className="block text-md mb-2" htmlFor="username">
                Username or email:
              </label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="text"
                name="username"
                placeholder="username or email"
                value={username}
                onChange={handleChangeInput}
              />
            </div>
            <div className="my-3">
              <label className="block text-md mb-2" htmlFor="password">
                Password:
              </label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="password"
                name="password"
                placeholder="password"
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
                <span className="text-sm">Remember me!</span>
              </div>
              <span className="text-sm text-blue-700 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="">
              <button className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100">
                Login now
              </button>
              <div className="flex space-x-2 justify-center items-end bg-red-600 hover:bg-red-400 text-white py-2 rounded-md transition duration-100">
                <button>Sign in with Google</button>
              </div>
              <div className="flex space-x-2 justify-center items-end bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition duration-100 my-3">
                <button>Sign in with Facebook</button>
              </div>
            </div>
          </form>
          <p className="mt-8">
            Dont have an account?
            <span className="cursor-pointer text-sm text-blue-600">
              Join free today
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
