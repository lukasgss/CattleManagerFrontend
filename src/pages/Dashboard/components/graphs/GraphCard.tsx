import React from "react";
import { TbAlertCircleFilled } from "react-icons/tb";
import GraphError from "./GraphError";
import LoadingGraph from "./LoadingGraph";

type GraphCardProps = {
  title: string;
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
};

export default function GraphCard({ title, isLoading, isError, children }: GraphCardProps) {
  return (
    <div className="bg-white flex flex-col w-full rounded-md shadow-md self-stretch min-h-[325px]">
      <div className="flex justify-between px-4 pt-4">
        <h2 className="mb-5 text-xl">{title}</h2>
        <TbAlertCircleFilled className="w-8 h-8" />
      </div>

      <div className="w-full h-[2px] bg-[#ECECEC] mb-5" />

      {isLoading ? <LoadingGraph /> : null}

      {isError ? <GraphError /> : null}

      {!isLoading && !isError ? (
        <div className="px-6 pb-5 h-full">
          <div className="w-full mx-auto h-full">
            <div className="w-full flex items-center h-full">{children}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
