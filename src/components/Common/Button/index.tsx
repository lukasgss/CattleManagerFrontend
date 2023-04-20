import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ButtonProps = {
  submit?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  ariaLabel: string;
  className?: string;
  action?: (...params: (number | object | string)[]) => void;
  transparent?: boolean;
};

const Button = ({
  submit = false,
  children,
  loading,
  className,
  ariaLabel,
  action,
  transparent,
}: ButtonProps) => {
  return (
    <div className="w-full">
      <button
        type={submit ? "submit" : "button"}
        aria-label={ariaLabel}
        className={`px-5 py-3 rounded-lg w-full poppins-semi-bold
         disabled:bg-gray-200 disabled:cursor-not-allowed ${
           loading ? "" : "hover:brightness-110"
         } ${className} ${
          transparent
            ? "bg-transparent border-2 border-[var(--primary-blue)] text-[var(--primary-blue)] hover:bg-var(--secondary-light-gray)]"
            : "text-white bg-[var(--primary-blue)]"
        }`}
        disabled={loading}
        onClick={action}
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
