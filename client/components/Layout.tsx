import { ReactNode, FC } from "react";
import Head from "next/head";

type PropTypes = {
  children?: ReactNode;
  title?: string;
};

const Layout: FC<PropTypes> = ({ children, title = "Blogs | Thanh TK" }) => {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
