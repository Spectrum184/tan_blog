import cn from "classnames";

import { FC } from "react";

type PropType = {
  header: string;
  content: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onConfirm: () => void;
};

const ConfirmModal: FC<PropType> = ({
  header,
  content,
  visible,
  setVisible,
  onConfirm,
}) => {
  return (
    <div
      className={cn(
        "fixed w-full h-screen inset-0 z-40 overflow-hidden flex justify-center items-center transition duration-500 ease-in-out bg-gray-500 bg-opacity-50",
        {
          block: visible,
          hidden: !visible,
        }
      )}
    >
      <div className="border shadow-md modal-container bg-white max-w-md mx-auto rounded z-40 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">{header}</p>
            <div
              className="modal-close cursor-pointer z-40"
              onClick={() => setVisible(false)}
            >
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <div className="my-5">
            <p>{content}</p>
          </div>
          <div className="flex justify-end pt-2">
            <button
              className="focus:outline-none modal-close px-4 bg-red-500 p-3 rounded-lg text-black hover:bg-red-300"
              onClick={() => setVisible(false)}
            >
              Cancel
            </button>
            <button
              className="focus:outline-none px-4 bg-green-500 p-3 ml-3 rounded-lg text-white hover:bg-green-300"
              onClick={() => onConfirm()}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
