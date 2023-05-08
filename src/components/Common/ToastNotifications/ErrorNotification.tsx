import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { NotificationProps } from "./types";

const SuccessNotification = ({ text, isOpen, setIsOpen }: NotificationProps) => {
  setTimeout(() => {
    setIsOpen(false);
  }, 10000);

  return isOpen ? (
    <div
      className="max-w-md left-1/2 translate-x-[-50%] fixed top-5 md:absolute md:top-[-35px] animate-slide-down bg-[var(--pink-error)]
       z-[99999] w-[calc(100%-30px)] shadow rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5"
    >
      <div className="flex-1 w-0 p-2 md:p-4">
        <div className="flex items-center">
          <div className="flex items-center flex-shrink-0 pt-0.5">
            <VscError className="w-8 h-8 text-[#474747]" />
          </div>
          <div className="ml-3 flex-1">
            <span className="text-sm poppins-semi-bold text-[#474747]">Erro!</span>
            <p className="text-sm text-[#001804]">{text}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center hover:brightness-125">
        <button type="button" className="mr-5" aria-label="fechar alerta" onClick={() => setIsOpen(false)}>
          <AiOutlineClose className="w-5 h-5 text-[#474747]" />
        </button>
      </div>
    </div>
  ) : null;
};

export default SuccessNotification;
