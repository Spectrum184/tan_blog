import Head from "next/head";
import SidebarAdmin from "./SidebarAdmin";

import { FC, ReactNode, useEffect } from "react";
import { useAppState } from "../../redux/store";
import { useRouter } from "next/router";
import { RoleEnum } from "../../interface/user";

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
      <div>
        <SidebarAdmin />
        <div className="h-screen min-w-right-sm lg:min-w-right-lg fixed top-0 lg:left-64 bg-white left-20 flex flex-col overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
