import React from "react";

type TableButtonsProps = {
  children: React.ReactNode;
  disabled?: boolean;
  currentPage: boolean;
  changePage: any;
};

export default function TableButton({ children, currentPage, disabled, changePage }: TableButtonsProps) {
  return (
    <div className="w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={changePage}
        className={`px-4 py-2 rounded poppins-semi-bold border ${disabled ? "cursor-not-allowed" : ""} ${
          currentPage
            ? "bg-[#4392BF] text-white border-[#4392bf] hover:brightness-110"
            : "bg-white text-[#98A2B3] border-[var(--secondary-light-gray)] hover:brightness-90"
        }`}
      >
        {children}
      </button>
    </div>
  );
}
