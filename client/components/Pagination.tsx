import cn from "classnames";

import { usePagination, DOTS } from "hooks/globalHooks";
import { FC, useState } from "react";

type PropTypes = {
  onPageChange: (pageNumber: number) => void;
  totalPage: number;
  siblingCount?: number;
  currentPage: number;
};

const Pagination: FC<PropTypes> = ({
  onPageChange,
  siblingCount = 1,
  currentPage,
  totalPage,
}) => {
  const paginationRange = usePagination({
    totalPage,
    siblingCount,
    currentPage,
  });
  const lastPage = paginationRange[paginationRange.length - 1];

  if (currentPage === 0 || paginationRange.length < 2) return null;

  const onPrevious = () => onPageChange(currentPage - 1);

  const onNext = () => onPageChange(currentPage + 1);

  return (
    <div className="mt-8 flex justify-center">
      <ul className="flex">
        <li
          className={cn(
            "px-2 md:px-3 py-1 md:py-2  mx-1 font-medium text-gray-900 bg-white rounded-md cursor-pointer hover:bg-green-500 hover:text-white",
            {
              "pointer-events-none bg-gray-300": currentPage === 1,
            }
          )}
          onClick={onPrevious}
        >
          Trước
        </li>
        {paginationRange.map((pageNumber, index: number) => {
          if (pageNumber === DOTS)
            return (
              <li
                key={index}
                className="px-1 md:px-3 py-1 md:py-2  mx-1 font-medium text-gray-900"
              >
                &#8230;
              </li>
            );

          return (
            <li
              key={index}
              className={cn(
                "px-2 md:px-3 py-1 md:py-2  mx-1 font-medium text-gray-900 bg-white rounded-md cursor-pointer hover:bg-green-500 hover:text-white",
                {
                  "bg-green-500": currentPage === pageNumber,
                }
              )}
              onClick={() => onPageChange(Number(pageNumber))}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={cn(
            "px-2 md:px-3 py-1 md:py-2 mx-1 font-medium text-gray-900 bg-white rounded-md hover:bg-green-500 cursor-pointer hover:text-white",
            {
              "pointer-events-none bg-gray-300": currentPage === lastPage,
            }
          )}
          onClick={onNext}
        >
          Tiếp
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
