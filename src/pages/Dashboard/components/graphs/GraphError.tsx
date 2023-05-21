import React from "react";
import { MdError } from "react-icons/md";

export default function GraphError() {
  return (
    <div className="flex flex-col items-center h-full justify-center gap-2">
      <MdError className="w-24 h-24 text-[var(--red-error)]" />
      <span className="max-w-[425px] px-5 sm:px-0">
        Ops, ocorreu um erro ao exibir os dados. Por favor, tente novamente mais tarde ou atualize a página.
      </span>
    </div>
  );
}
