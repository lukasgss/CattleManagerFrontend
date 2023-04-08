import React, { useRef, useState } from "react";
import { BsArrowDownShort, BsCheck2 } from "react-icons/bs";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";
import FormErrorMessage from "../../FormErrorMessage";
import { DataArr } from "../../../types/dataArr";
import DetectClickOutside from "../../DetectClickOutside";

type DropdownProps = {
  register: UseFormRegister<any>;
  name: string;
  dataArr: DataArr[];
  labelText: string;
  selectedItem: DataArr | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<DataArr | null>>;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
};

const Dropdown = ({
  register,
  name,
  dataArr,
  labelText,
  selectedItem,
  setSelectedItem,
  setValue,
  error,
}: DropdownProps) => {
  const [expanded, setExpanded] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selectItem = (item: DataArr) => {
    setValue(name as any, item.value);
    setSelectedItem(item);
    setExpanded(false);
  };

  return (
    <div className="flex flex-col gap-0.5 w-full">
      <label className="pl-0.5" htmlFor={name}>
        {labelText}
      </label>
      <button type="button" onClick={() => setExpanded(true)}>
        <div className="w-full relative">
          <input
            type="text"
            value={selectedItem?.text ?? ""}
            {...register(name)}
            className={`w-full bg-[var(--primary-light-gray)] px-5 py-3 border rounded-xl focus:outline--gray-500
             border-none focus:ring-0  hover:cursor-pointer ${
               error ? "border-error focus:outline-[var(--border-error)]" : ""
             }`}
          />
          <BsArrowDownShort
            className={`absolute top-3 right-3 w-5 h-5 transition duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {error ? <FormErrorMessage error={error.message} /> : null}
      {expanded ? (
        <div className="relative">
          <DetectClickOutside
            elementRef={dropdownRef}
            onClickOutside={() => setExpanded(false)}
          >
            <div
              ref={dropdownRef}
              className="dropdown-scrollbar absolute top-2 max-h-64 bg-white w-full overflow-y-auto
               shadow-lg rounded ring-1 ring-black ring-opacity-5 py-2 z-30"
            >
              <ul className="flex flex-col gap-0.5 mt-2">
                {dataArr.length > 0 ? (
                  dataArr.map((data) => (
                    <li key={data.value}>
                      <button
                        type="button"
                        aria-label="selecionar"
                        className={`px-3 py-1 w-full flex items-center text-left hover:bg-[var(--secondary-light-gray)] hover:text-[var(--primaryblack)] ${
                          selectedItem?.text === data.text
                            ? "bg-[var(--secondary-light-gray)]"
                            : ""
                        }`}
                        onClick={() => selectItem(data)}
                      >
                        {selectedItem?.value === data.value ? (
                          <span>
                            <BsCheck2 className="w-5 h-5 hover:cursor-pointer mr-2" />
                          </span>
                        ) : null}
                        <span
                          className={`${
                            selectedItem?.text === data.text
                              ? "poppins-semi-bold"
                              : "pl-7"
                          }`}
                        >
                          {data.text}
                        </span>
                      </button>
                    </li>
                  ))
                ) : (
                  <div className="px-3 py-1">
                    <span>
                      Não foi possível obter as opções de escolha, verifique sua
                      internet e tente novamente.
                    </span>
                  </div>
                )}
              </ul>
            </div>
          </DetectClickOutside>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
