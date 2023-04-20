import React from "react";
import toast, { Toast } from "react-hot-toast";
import { AiFillCheckCircle } from "react-icons/ai";

type SuccessNotificationProps = {
  t: Toast;
  text: string | React.ReactNode;
};

const SuccessNotification = ({ t, text }: SuccessNotificationProps) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow rounded-r-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-2 h-full bg-[#47da64]" />
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center">
          <div className="flex items-center flex-shrink-0 pt-0.5">
            <AiFillCheckCircle className="w-8 h-8 text-[#45d764]" />
          </div>
          <div className="ml-3 flex-1">
            <span className="text-sm poppins-semi-bold">Sucesso!</span>
            <p className="mt-1 text-sm">{text}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          type="button"
          onClick={() => toast.remove(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm
           font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default SuccessNotification;
