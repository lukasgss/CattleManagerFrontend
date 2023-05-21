import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingGraph() {
  return (
    <div className="flex items-center h-full justify-center">
      <AiOutlineLoading3Quarters className="w-24 h-24 animate-spin text-[var(--blue-graph)]" />
    </div>
  );
}
