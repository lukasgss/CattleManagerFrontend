import React from "react";

interface FormErrorMessageProps {
  error: string | undefined;
}

const FormErrorMessage = ({ error }: FormErrorMessageProps) => {
  return (
    <div>
      <p className="text-error text-sm">{error}</p>
    </div>
  );
};

export default FormErrorMessage;
