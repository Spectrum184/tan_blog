import Link from "next/link";
import Image from "next/image";
import cn from "classnames";

import { FC, useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppState } from "../redux/store";
import { logout } from "../redux/userStore";
import { RoleEnum } from "../interface/user";
import { ICategory } from "interface/category";
import { useRouter } from "next/router";
import { loaderImage } from "utils/fileUpload";

type PropTypes = {
  categories: ICategory[];
};

const Navbar: FC<PropTypes> = ({ categories }) => {
  const dispatch = useAppDispatch();
  const divRef = useRef<HTMLDivElement>(null);

  const { avatar, username, roles } = useAppState((state) => state.user);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const { query } = useRouter();

  useEffect(() => {
    function handleClick(event: any) {
      if (divRef.current?.contains(event.target)) {
        setOpenProfile(true);
      } else {
        setOpenProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [divRef]);

  return (
    <div className="w-full text-gray-800 bg-green-500 dark-mode:text-gray-200 dark-mode:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="flex flex-col max-w-screen-xl px-2 mx-auto md:items-center md:justify-between md:flex-row md:px-4 lg:px-6">
        <div className="p-4 flex flex-row items-center justify-between pl-0">
          <Link href="/">
            <a className="text-xl font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
              <span className="text-white">ThanhTK</span> Blog
            </a>
          </Link>
          <button
            className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
            onClick={() => setOpenNav(!openNav)}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              {!openNav && (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
              {openNav && (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
        <nav
          className={cn(
            "flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row",
            {
              hidden: !openNav,
              flex: openNav,
            },
          )}
        >
          {categories &&
            categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.id}>
                <a
                  className={cn(
                    "px-4 py-2 mt-2 text-base font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-green-300 focus:bg-green-300 focus:outline-none focus:shadow-outline",
                    {
                      "bg-green-300":
                        query.slug && query.slug === category.slug,
                    },
                  )}
                >
                  {category.name}
                </a>
              </Link>
            ))}
          <Link href="/about">
            <a className="px-4 py-2 mt-2 text-base font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-green-300 focus:bg-green-300 focus:outline-none focus:shadow-outline">
              Về Tôi
            </a>
          </Link>
          {username ? (
            <div className="relative" ref={divRef}>
              <button className="flex flex-row items-center w-full px-4 py-2 mt-2 text-base font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-green-300 focus:bg-green-300 focus:outline-none focus:shadow-outline">
                <span className="flex content-center">
                  <Image
                    loader={loaderImage}
                    src={avatar}
                    alt="avatar.png"
                    width={24}
                    height={24}
                    className="rounded-full shadow-sm"
                  />
                  <span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </span>
              </button>
              <div
                className={cn(
                  "absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48",
                  {
                    hidden: !openProfile,
                  },
                )}
              >
                <div className="px-2 py-2 bg-green-400 rounded-md shadow dark-mode:bg-gray-800">
                  <Link href={`/user/${username}`}>
                    <a className="block px-4 py-2 mt-2 text-base font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-green-300 focus:bg-green-300 focus:outline-none focus:shadow-outline">
                      Trang Cá Nhân
                    </a>
                  </Link>
                  {!roles.includes(RoleEnum.User) && (
                    <Link href="/admin/dashboard">
                      <a className="block px-4 py-2 mt-2 text-base font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-green-300 focus:bg-green-300 focus:outline-none focus:shadow-outline">
                        Dashboard
                      </a>
                    </Link>
                  )}
                  <div
                    className="border-t-2 cursor-pointer"
                    onClick={() => dispatch(logout())}
                  >
                    <span className="block px-4 py-2 mt-2 text-base font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-green-300 focus:bg-green-300 focus:outline-none focus:shadow-outline">
                      Đăng Xuất
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <a className="px-4 py-2 mt-2 text-base font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-green-300 focus:bg-green-300 focus:outline-none focus:shadow-outline">
                Đăng nhập
              </a>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
