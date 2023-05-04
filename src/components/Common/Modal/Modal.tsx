import React, { useRef } from "react";
import DetectClickOutside from "../../DetectClickOutside";

import "./index.scss";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalTitle?: string;
  children: React.ReactNode;
};

function Modal({ isOpen, setIsOpen, modalTitle, children }: ModalProps) {
  const dialogElement = useRef<HTMLDivElement | null>(null);

  return isOpen ? (
    <>
      <div className="dialog" />
      <DetectClickOutside
        elementRef={dialogElement}
        onClickOutside={() => setIsOpen(false)}
      >
        <div className="relative z-[120]">
          <div className="fixed inset-0 overflow-y-auto">
            <div
              className="w-[85%] max-w-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] py-5 px-7 bg-white rounded shadow"
              ref={dialogElement}
            >
              {modalTitle ? (
                <h3 className="text-xl font-medium leading-6 text-gray-900">
                  {modalTitle}
                </h3>
              ) : null}
              <div className="mt-7">{children}</div>
            </div>
          </div>
        </div>
      </DetectClickOutside>
    </>
  ) : null;
}

export default Modal;
