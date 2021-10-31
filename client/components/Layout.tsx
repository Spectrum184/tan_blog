import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { ReactNode, FC, useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import { refresh } from "../redux/userStore";

type PropTypes = {
  children?: ReactNode;
  title?: string;
};

const Layout: FC<PropTypes> = ({ children, title = "Blogs | Thanh TK" }) => {
  const dispatch = useAppDispatch();

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
      <Navbar />
      <div className="container mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
