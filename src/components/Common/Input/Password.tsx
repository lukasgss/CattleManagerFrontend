import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FieldError, UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";
import FormErrorMessage from "../../FormErrorMessage";

type PasswordProps = {
  register: UseFormRegister<any>;
  error?: FieldError;
  name: string;
  labelText: string;
};

const Password = ({ register, error, name, labelText }: PasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-0.5 w-full">
      <div className="flex justify-between">
        <label className="pl-0.5 w-full" htmlFor={name}>
          {labelText}
        </label>
        <Link
          to="/esqueci-senha"
          className="flex items-end justify-end w-full text-[var(--primary-blue)] hover:brightness-125 hover:underline text-xs"
          tabIndex={-1}
        >
          Esqueceu a senha?
        </Link>
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          {...register(name)}
          className={`w-full bg-[var(--primary-light-gray)] px-5 pr-10 py-3 border rounded-xl focus:outline--gray-500
           border-none focus:ring-0" ${error ? "border-red-500" : ""}`}
        />
        <button
          type="button"
          className="absolute top-3.5 right-2.5"
          onClick={() => setShowPassword((prevValue) => !prevValue)}
          tabIndex={-1}
        >
          {showPassword ? (
            <AiFillEyeInvisible className="w-5 h-5 text-[var(--gray-text)]" />
          ) : (
            <AiFillEye className="w-5 h-5 text-[var(--gray-text)]" />
          )}
        </button>
      </div>
      {error ? <FormErrorMessage error={error.message} /> : null}
    </div>
  );
};

export default Password;
