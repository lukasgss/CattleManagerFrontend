import React from "react";
import {
  FieldError,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import "./styles/index.scss";
import FormErrorMessage from "../../FormErrorMessage";

type RadioDataArr = {
  text: string;
  value: number | boolean;
};

type RadioProps = {
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  name: string;
  radioOptions: RadioDataArr[];
  setValue: UseFormSetValue<any>;
  onChangeValue?: any;
  watch: UseFormWatch<any>;
  labelTop?: boolean;
};

const Radio = ({
  name,
  register,
  error,
  radioOptions,
  onChangeValue,
  setValue,
  watch,
  labelTop,
}: RadioProps) => {
  const fieldValue = watch(name);

  const changeValue = (option: RadioDataArr) => {
    setValue(name, option.value);
    onChangeValue?.(option.value);
  };

  return (
    <div>
      <div className="flex">
        {radioOptions.map((option) => (
          <div
            key={option.text}
            className={`container-radio ${
              labelTop ? "labelTop flex-1" : " mr-8 lg:mr-5"
            }`}
          >
            <input
              type="radio"
              id={name}
              {...register(name)}
              onChange={() => changeValue(option)}
              value={option.text}
              checked={fieldValue === option.value}
              className={`block w-[24px] border border-solid rounded transition ease-in-out focus:outline-none
               peer mr-5 ${error ? "border-error" : ""}`}
            />
            <label htmlFor={name} className="block mt-3 cursor-pointer">
              {option.text}
            </label>
            <span className="checkmark-radio font-semibold" />
          </div>
        ))}
      </div>
      {error ? <FormErrorMessage error={error.message} /> : null}
    </div>
  );
};

export default Radio;
