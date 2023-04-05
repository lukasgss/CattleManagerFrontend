import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ButtonProps = {
  submit?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  ariaLabel: string;
  action?: (...params: (number | object | string)[]) => void;
};

const Button = ({
  submit = false,
  children,
  loading,
  ariaLabel,
  action,
}: ButtonProps) => {
  return (
    <div>
      <button
        type={submit ? "submit" : "button"}
        aria-label={ariaLabel}
        className={`bg-[var(--primary-blue)] text-white px-5 py-3 rounded-xl w-full poppins-semi-bold
         disabled:bg-gray-200 disabled:cursor-not-allowed ${
           loading ? "" : "hover:brightness-110"
         }`}
        disabled={loading}
        onClick={() => action}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin mx-auto w-5 h-6 text-[var(--primary-blue)]" />
        ) : (
          children
        )}
      </button>
    </div>
  );
};

export default Button;
