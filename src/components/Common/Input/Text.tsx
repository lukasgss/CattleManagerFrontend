import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import FormErrorMessage from "../../FormErrorMessage";

type TextProps = {
  register: UseFormRegister<any>;
  error?: FieldError;
  name: string;
  labelText: string;
};

const Text = ({ register, error, name, labelText }: TextProps) => {
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <label className="pl-0.5" htmlFor={name}>
        {labelText}
      </label>
      <input
        type="text"
        id={name}
        {...register(name)}
        className={`bg-[var(--primary-light-gray)] px-5 py-3 border rounded-xl focus:outline--gray-500 border-none focus:ring-0" ${
          error ? "border-error focus:outline-[var(--border-error)]" : ""
        }`}
      />
      {error ? <FormErrorMessage error={error.message} /> : null}
    </div>
  );
};

export default Text;
