import React from "react";

interface FormErrorMessageProps {
  error: string | undefined;
}

const FormErrorMessage = ({ error }: FormErrorMessageProps) => {
  return (
    <div>
      <span className="text-[var(--red-error)] text-xs">{error}</span>
    </div>
  );
};

export default FormErrorMessage;
