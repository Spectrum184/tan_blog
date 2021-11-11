import cn from "classnames";

import { useListPost } from "hooks/globalHooks";
import { useRouter } from "next/router";
import { FC, useState, useEffect } from "react";

type PropTypes = {
  prefix: string;
};

const Pagination: FC<PropTypes> = ({ prefix }) => {
  const [page, setPage] = useState<number>(1);
  const { query, pathname } = useRouter();

  const { loading, lastPage } = useListPost({ prefix, page });

  return (
    <div className="mt-8 mx-auto">
      <div className="flex">
        <button
          disabled={pathname !== "/" || page === 1 || loading}
          className="px-3 py-2 mx-1 font-medium text-gray-500 bg-white rounded-md"
        >
          Trước
        </button>
        {page > 2 && (
          <button className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-green-500 hover:text-white">
            {page - 2}
          </button>
        )}
        {page > 1 && (
          <button className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-green-500 hover:text-white">
            {page - 1}
          </button>
        )}
        <button className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-green-500 hover:text-white">
          {page}
        </button>
        {page > 3 && (
          <button className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-green-500 hover:text-white">
            {page + 1}
          </button>
        )}
        {page > 4 && (
          <button className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-green-500 hover:text-white">
            {page + 2}
          </button>
        )}
        <button
          disabled={pathname !== "/" || page === lastPage || loading}
          className="px-3 py-2 mx-1 font-medium text-gray-700 bg-white rounded-md hover:bg-green-500 hover:text-white"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default Pagination;
