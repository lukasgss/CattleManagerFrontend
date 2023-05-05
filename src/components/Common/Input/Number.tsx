import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import FormErrorMessage from "../../FormErrorMessage";

type NumberProps = {
  control: Control<any>;
  name: string;
  labelText: string;
  placeholder: string;
  error: FieldError | undefined;
};

function Number({ control, name, labelText, error, placeholder }: NumberProps) {
  return (
    <div className="w-full flex flex-col gap-0.5">
      <label htmlFor={name} className="pl-0.5">
        {labelText}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            autoComplete="off"
            aria-autocomplete="list"
            placeholder={placeholder}
            className={`bg-[var(--primary-light-gray)] px-5 py-3 border rounded-xl focus:outline--gray-500 border-none focus:ring-0" ${
              error ? "border-error focus:outline-[var(--border-error)]" : ""
            }`}
          />
        )}
      />
      {error ? <FormErrorMessage error={error.message} /> : null}
    </div>
  );
}

export default Number;
