import React, { useRef, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCheck2, BsChevronDown } from "react-icons/bs";
import { DataArr } from "../../../types/dataArr";
import FormErrorMessage from "../../FormErrorMessage";
import { removeDiacritics } from "../../../extensions/stringExtensions";
import DetectClickOutside from "../../DetectClickOutside";

type DropdownWithSearchProps = {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  error?: any;
  name: string;
  dataArr: DataArr[];
  labelText: string;
  selectedItem: DataArr | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<DataArr | null>>;
};

const DropdownWithSearch = ({
  register,
  setValue,
  name,
  labelText,
  dataArr,
  error,
  selectedItem,
  setSelectedItem,
}: DropdownWithSearchProps) => {
  const [expanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const dropdownRef = useRef<any>(null);

  const filteredData =
    searchValue.length > 0
      ? dataArr.filter((data) =>
          removeDiacritics(data.text.toLowerCase()).includes(
            removeDiacritics(searchValue.toLowerCase())
          )
        )
      : dataArr;

  const selectItem = (item: DataArr) => {
    setValue(name as any, item.text);
    setSelectedItem(item);
    setExpanded(false);
  };

  const onClickOutside = () => {
    setExpanded(false);
    setSearchValue("");
  };

  return (
    <div className="flex flex-col gap-0.5 w-full">
      <label htmlFor={name} className="pl-0.5">
        {labelText}
      </label>
      <button type="button" onClick={() => setExpanded(true)}>
        <div className="w-full relative">
          <input
            type="text"
            value={selectedItem?.text ?? ""}
            {...register(name)}
            className={`w-full bg-[var(--primary-light-gray)] px-5 pr-10 py-3 border rounded-xl focus:outline--gray-500
             border-none focus:ring-0  hover:cursor-pointer ${
               error ? "border-error focus:outline-[var(--border-error)]" : ""
             }`}
          />
          <BsChevronDown
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
            onClickOutside={onClickOutside}
            hideOnEscape={() => setExpanded(false)}
          >
            <div
              ref={dropdownRef}
              className="dropdown-scrollbar absolute top-2 max-h-64 bg-white w-full overflow-y-auto
               shadow-lg rounded ring-1 ring-black ring-opacity-5 py-2 z-30"
            >
              <div className="relative w-full px-3 py-1">
                <input
                  type="text"
                  className="w-full bg-[var(--primary-light-gray)] px-3 pl-9 py-2 border rounded-md focus:outline--gray-500 border-none focus:ring-0"
                  placeholder="Buscar"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
                <span className="hover:cursor-default">
                  <AiOutlineSearch className="absolute top-3.5 left-5 h-5 w-5 text-[var(--gray-text)]" />
                </span>
              </div>
              <ul className="flex flex-col gap-0.5 mt-2">
                {filteredData.length > 0 ? (
                  filteredData.map((data) => (
                    <li key={data.value}>
                      <button
                        type="button"
                        aria-label="selecionar"
                        className={`px-3 py-1 w-full flex text-left hover:bg-[var(--secondary-light-gray)] hover:text-[var(--primary-black)] ${
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
                    <span>Nenhuma opção encontrada</span>
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

export default DropdownWithSearch;
