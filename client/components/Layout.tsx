import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RightSideBar from "./RightSideBar";

import { ReactNode, FC, useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import { refresh } from "../redux/userStore";
import { useRouter } from "next/router";
import { useLayoutData } from "hooks/globalHooks";

type PropTypes = {
  children?: ReactNode;
  title?: string;
  isHomepage?: boolean;
};

const Layout: FC<PropTypes> = ({
  children,
  isHomepage = false,
  title = "Blogs | Thanh TK",
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, loading, error } = useLayoutData();

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
      {!loading && <Navbar categories={data.categories} />}
      {isHomepage ? (
        <div className="container max-w-screen-xl px-2 md:px-4 lg:px-6 mx-auto">
          {children}
        </div>
      ) : (
        <div className="px-6 pt-4 pb-6">
          <div className="container flex justify-between max-w-screen-xl px-2 md:px-4 lg:px-6 mx-auto">
            <div className="w-full lg:w-8/12">{children}</div>
            {!loading && <RightSideBar {...data} />}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Layout;
