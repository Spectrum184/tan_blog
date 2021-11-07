import cn from "classnames";

import { FC, useEffect } from "react";

type PropTypes = {
  type: "warn" | "success" | "error";
  content: string;
  handleShow: () => void;
};

const Toast: FC<PropTypes> = ({ type, content, handleShow }) => {
  useEffect(() => {
    const showTimeout = setTimeout(() => handleShow(), 3000);

    return () => clearTimeout(showTimeout);
  }, [handleShow]);

  return (
    <div className="fixed z-50 right-4 top-4">
      <div className="flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
        <div
          className={cn("w-2", {
            "bg-red-600": type === "error",
            "bg-yellow-600": type === "warn",
            "bg-green-600": type === "success",
          })}
        />
        <div className="w-full flex justify-between items-start px-2 py-2">
          <div className="flex flex-col ml-2">
            <label className="text-gray-800">
              {type === "warn"
                ? "Cảnh báo"
                : type === "error"
                ? "Lỗi"
                : "Thành Công"}
            </label>
            <p className="text-gray-500 ">{content}</p>
          </div>
          <span onClick={handleShow} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
