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
    <div>
      <Head>
        <title>{title}</title>
        <meta lang="en" charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {data && <Navbar categories={data.categories} />}
      <div className="container mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
