import Link from "next/link";
import Head from "next/head";

import { NextPage } from "next";

const Custom404: NextPage = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-green-200 w-screen h-screen flex justify-center content-center">
      <Head>
        <title>Không tìm thấy trang | ThanhTK Blog</title>
        <meta lang="en" charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="m-auto py-16 flex items-center justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-gray-200 text-center pt-8 p-10">
            <h1 className="text-9xl font-bold text-green-500">404</h1>
            <h1 className="text-2xl font-medium py-8">
              Oops! Trang này không tồn tại
            </h1>
            <Link href="/">
              <a className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                Trang chủ
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
