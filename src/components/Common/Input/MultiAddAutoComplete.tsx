import React, { useEffect, useRef, useState } from "react";
import {
  FieldError,
  Merge,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { BsCheck2, BsChevronDown } from "react-icons/bs";
import FormErrorMessage from "../../FormErrorMessage";
import { DataArr } from "../../../types/dataArr";
import DetectClickOutside from "../../DetectClickOutside";

type AutoCompleteProps = {
  register: UseFormRegister<any>;
  name: string;
  labelText: string;
  placeholder?: string;
  dataArr: DataArr[];
  onChangeSearch: (searchText: string) => void;
  selectedItem: DataArr | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<DataArr | null>>;
  setValue: UseFormSetValue<any>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  error?: Merge<FieldError, (FieldError | undefined)[]>;
};

const AutoComplete = ({
  register,
  name,
  labelText,
  placeholder,
  error,
  onChangeSearch,
  setValue,
  selectedItem,
  setSelectedItem,
  searchTerm,
  setSearchTerm,
  dataArr,
}: AutoCompleteProps) => {
  const [expanded, setExpanded] = useState(false);

  const inputRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null);

  const { ref, ...registerData } = register(name);

  const [timeoutPassed, setTimeoutPassed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm === "") return;
      onChangeSearch(searchTerm);
      setTimeoutPassed(true);
    }, 500);

    // eslint-disable-next-line consistent-return
    return () => {
      setTimeoutPassed(false);
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  const selectItem = (item: DataArr) => {
    setSelectedItem(item);
    setSearchTerm(item.text);
    setValue(name, item.value);

    setExpanded(false);
  };

  return (
    <div className="flex flex-col gap-0.5 w-full">
      <label className="pl-0.5" htmlFor={name}>
        {labelText}
      </label>
      <div className="relative">
        <DetectClickOutside
          elementRef={inputRef}
          otherAllowedElementRef={dropdownRef}
          onClickOutside={() => {
            setTimeout(() => {
              setExpanded(false);
            }, 0);
          }}
          hideOnEscape={() => setExpanded(false)}
        >
          <input
            id={name}
            {...registerData}
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
            onChange={(e) => {
              setExpanded(true);
              setSearchTerm(e.target.value);
            }}
            value={expanded ? searchTerm : selectedItem?.text ?? searchTerm}
            placeholder={placeholder}
            onFocus={() => setExpanded(true)}
            autoComplete="off"
            type="text"
            className={`w-full bg-[var(--primary-light-gray)] px-5 pr-9 py-3 border rounded-xl focus:outline--gray-500 border-none focus:ring-0" ${
              error ? "border-error focus:outline-[var(--border-error)]" : ""
            }`}
          />
        </DetectClickOutside>
        <button
          type="button"
          aria-label={expanded ? "retrair" : "expandir"}
          title={expanded ? "Retrair" : "Expandir"}
          onClick={() => setExpanded((prevValue) => !prevValue)}
        >
          <BsChevronDown
            className={`absolute top-3 right-3 w-5 h-5 transition duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {error ? <FormErrorMessage error={error.message} /> : null}
      {expanded ? (
        <div className="relative">
          <div
            ref={dropdownRef}
            className="dropdown-scrollbar absolute max-h-60 overflow-y-auto top-2 bg-white shadow-lg rounded-md w-full ring-1 ring-black ring-opacity-5 py-2 z-30"
          >
            {dataArr.length > 0 && searchTerm ? (
              <ul className="flex flex-col gap-0.5">
                {dataArr.map((el) => (
                  <li key={el.value}>
                    <button
                      type="button"
                      className={`px-3 py-1 w-full flex items-center text-left hover:bg-[var(--secondary-light-gray)] z-5 ${
                        selectedItem?.value === el.value
                          ? "bg-[var(--secondary-light-gray)]"
                          : ""
                      }`}
                      onClick={() => selectItem(el)}
                    >
                      {selectedItem?.value === el.value ? (
                        <BsCheck2 className="w-5 h-5 mr-2 hover:cursor-pointer" />
                      ) : null}
                      <span
                        className={`${
                          selectedItem?.value === el.value
                            ? "poppins-semi-bold"
                            : "pl-7"
                        }`}
                      >
                        {el.text}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="w-full px-3 text-enter">
                {searchTerm !== "" && timeoutPassed ? (
                  <span className="text-center">Nenhum dado encontrado</span>
                ) : (
                  <span>Faça uma busca...</span>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AutoComplete;
