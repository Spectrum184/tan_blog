import Head from "next/head";

import { FC, ReactNode, useEffect } from "react";
import { useAppState } from "../../redux/store";
import { useRouter } from "next/router";
import { RoleEnum } from "../../interface/user";
import SidebarAdmin from "./SidebarAdmin";

type PropTypes = {
  children?: ReactNode;
  title?: string;
};

const LayoutAdmin: FC<PropTypes> = ({
  children,
  title = "Bảng điều khiển",
}) => {
  const { roles } = useAppState((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (roles.length === 0) router.push("/");

    if (roles.includes(RoleEnum.User) && roles.length === 1)
      router.push("/user/dashboard");
  }, [router, roles]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta lang="en" charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="min-h-screen">
        <SidebarAdmin />
        {children}
      </div>
    </div>
  );
};

export default LayoutAdmin;
