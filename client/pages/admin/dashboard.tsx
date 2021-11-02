import LayoutAdmin from "../../components/admin/LayoutAdmin";

import { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <LayoutAdmin>
      <main>
        <div className="flex content-center justify-center">
          <form action="GET" className="flex mt-3">
            <input
              type="text"
              className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
              autoFocus
              name="name"
              placeholder="Nhập tên bài đăng..."
            />
            <button className="p-1 ml-2 bg-green-500 hover:bg-green-400 text-gray-100 text-lg rounded-lg w-36">
              Tìm kiếm
            </button>
          </form>
        </div>
      </main>
    </LayoutAdmin>
  );
};

export default Dashboard;
