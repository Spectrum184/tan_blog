import { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, SyntheticEvent, useState } from "react";

interface ILogin {
  username: string;
  password: string;
}
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
    <div className="w-screen h-screen flex justify-center items-center">
      <Head>
        <title>Login | ThanhTK Blog</title>
      </Head>
      <form className="max-auto my-4 max-w-md" onSubmit={onSubmit}>
        <h3>Login</h3>
        <div className="my-4">
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChangeInput}
            className="border-gray-400 border"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            name="password"
            value={password}
            className="border-gray-400 border"
            onChange={handleChangeInput}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
