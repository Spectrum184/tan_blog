import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useSWR from "swr";

import { ReactNode, FC, useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import { refresh } from "../redux/userStore";
import { fetcher } from "utils/fetchData";
import { useRouter } from "next/router";

type PropTypes = {
  children?: ReactNode;
  title?: string;
};

const Layout: FC<PropTypes> = ({ children, title = "Blogs | Thanh TK" }) => {
  const dispatch = useAppDispatch();
  const { data, error } = useSWR("categories", fetcher);
  const router = useRouter();

  useEffect(() => {
    if (error) router.push("404");
  }, [error, router]);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    <div className="bg-gray-200 w-full min-h-screen">
      <Head>
        <title>{title}</title>
        <meta lang="en" charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {data && <Navbar categories={data.categories} />}
      <div className="px-6 py-8">
        <div className="container flex justify-between mx-auto">
          <div className="w-full lg:w-8/12">{children}</div>
          <div className="hidden w-4/12 -mx-8 lg:block">
            <div className="px-8">
              <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
              <div className="flex flex-col max-w-sm px-6 py-4 bg-white rounded-lg shadow-md">
                <ul className="-mx-4">
                  <li className="flex items-center">
                    <p>
                      <a
                        href="#"
                        className="mx-1 font-bold text-gray-700 hover:underline"
                      >
                        Alex John
                      </a>
                      <span className="text-sm font-light text-gray-700">
                        Created 23 Posts
                      </span>
                    </p>
                  </li>
                  <li className="flex items-center mt-6">
                    <p>
                      <a
                        href="#"
                        className="mx-1 font-bold text-gray-700 hover:underline"
                      >
                        Jane Doe
                      </a>
                      <span className="text-sm font-light text-gray-700">
                        Created 52 Posts
                      </span>
                    </p>
                  </li>
                  <li className="flex items-center mt-6">
                    <p>
                      <a
                        href="#"
                        className="mx-1 font-bold text-gray-700 hover:underline"
                      >
                        Lisa Way
                      </a>
                      <span className="text-sm font-light text-gray-700">
                        Created 73 Posts
                      </span>
                    </p>
                  </li>
                  <li className="flex items-center mt-6">
                    <p>
                      <a
                        href="#"
                        className="mx-1 font-bold text-gray-700 hover:underline"
                      >
                        Steve Matt
                      </a>
                      <span className="text-sm font-light text-gray-700">
                        Created 245 Posts
                      </span>
                    </p>
                  </li>
                  <li className="flex items-center mt-6">
                    <p>
                      <a
                        href="#"
                        className="mx-1 font-bold text-gray-700 hover:underline"
                      >
                        Khatab Wedaa
                      </a>
                      <span className="text-sm font-light text-gray-700">
                        Created 332 Posts
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-8 mt-10">
              <h1 className="mb-4 text-xl font-bold text-gray-700">
                Categories
              </h1>
              <div className="flex flex-col max-w-sm px-4 py-6 bg-white rounded-lg shadow-md">
                <ul>
                  <li>
                    <a
                      href="#"
                      className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
                    >
                      - AWS
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href="#"
                      className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
                    >
                      - Laravel
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href="#"
                      className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
                    >
                      - Vue
                    </a>
                  </li>
                  <li className="mt-2">
                    <a
                      href="#"
                      className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
                    >
                      - Design
                    </a>
                  </li>
                  <li className="flex items-center mt-2">
                    <a
                      href="#"
                      className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
                    >
                      - Django
                    </a>
                  </li>
                  <li className="flex items-center mt-2">
                    <a
                      href="#"
                      className="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
                    >
                      - PHP
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-8 mt-10">
              <h1 className="mb-4 text-xl font-bold text-gray-700">
                Recent Post
              </h1>
              <div className="flex flex-col max-w-sm px-8 py-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center">
                  <a
                    href="#"
                    className="px-2 py-1 text-sm text-green-100 bg-gray-600 rounded hover:bg-gray-500"
                  >
                    Laravel
                  </a>
                </div>
                <div className="mt-4">
                  <a
                    href="#"
                    className="text-lg font-medium text-gray-700 hover:underline"
                  >
                    Build Your New Idea with Laravel Freamwork.
                  </a>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <a
                      href="#"
                      className="mx-3 text-sm text-gray-700 hover:underline"
                    >
                      Alex John
                    </a>
                  </div>
                  <span className="text-sm font-light text-gray-600">
                    Jun 1, 2020
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
