import React from "react";
import { NumericFormat } from "react-number-format";
import { MdMonetizationOn } from "react-icons/md";
import { FieldError, Controller, Control } from "react-hook-form";
import FormErrorMessage from "../../FormErrorMessage";

type CurrencyProps = {
  name: string;
  labelText: string;
  placeholder?: string;
  control: Control<any>;
  error: FieldError | undefined;
};

const Currency = ({ name, labelText, placeholder, control, error }: CurrencyProps) => {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="pl-0.5" htmlFor={name}>
        {labelText}
      </label>
      <div className="relative">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <NumericFormat
              onChange={onChange}
              value={value}
              allowLeadingZeros
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              maxLength={13}
              allowNegative={false}
              placeholder={placeholder}
              className={`w-full bg-[var(--primary-light-gray)] px-5 pl-10 py-3 border rounded-xl focus:outline--gray-500
               border-none focus:ring-0" ${error ? "border-error focus:outline-[var(--border-error)]" : ""}`}
            />
          )}
        />
        <MdMonetizationOn className="absolute top-3.5 left-2 w-5 h-5 text-[#898b8d]" />
      </div>
      {error ? <FormErrorMessage error={error.message} /> : null}
    </div>
  );
};

export default Currency;
