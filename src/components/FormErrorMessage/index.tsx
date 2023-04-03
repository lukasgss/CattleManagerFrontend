import React from "react";

interface FormErrorMessageProps {
  error: string | undefined;
  serverValidation?: boolean;
}

const FormErrorMessage = ({
  error,
  serverValidation,
}: FormErrorMessageProps) => {
  return (
    <div className={`leading-[0px] ${serverValidation ? "text-center" : ""}`}>
      <span
        className={`text-[var(--red-error)] ${
          serverValidation ? "text-sm" : "text-xs"
        }`}
      >
        {error}
      </span>
    </div>
  );
};

export default FormErrorMessage;
