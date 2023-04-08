import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import FormErrorMessage from "../../FormErrorMessage";

type BreedInputProps = {
  control: Control<any>;
  labelText: string;
  name: string;
  error?: FieldError;
};

const BreedInput = ({ name, labelText, control, error }: BreedInputProps) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name}>{labelText}</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <PatternFormat
            format="#/#"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder="Ex.: 5/8"
            className={`bg-[var(--primary-light-gray)] px-5 py-3 border rounded-xl focus:outline--gray-500 border-none focus:ring-0" ${
              error ? "border-error focus:outline-[var(--border-error)]" : ""
            }`}
          />
        )}
      />
      {error ? <FormErrorMessage error={error.message} /> : null}
    </div>
  );
};

export default BreedInput;
