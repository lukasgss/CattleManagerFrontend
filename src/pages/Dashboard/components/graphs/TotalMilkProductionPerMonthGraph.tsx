import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetTotalMilkProductionsOnPreviousMonths } from "../../../../services/MilkProductions";
import LineChart from "../../../../components/Graphs/LineChart";
import GraphCard from "./GraphCard";
import { SidebarContext } from "../../../../contexts/SidebarContext";

export default function TotalMilkProductionPerMonthGraph() {
  const { sidebarOpen } = useContext(SidebarContext);

  const GetTotalMilkProductionsPerMonth = () => {
    return GetTotalMilkProductionsOnPreviousMonths(6);
  };

  const {
    isLoading,
    isError,
    data: milkProductions,
  } = useQuery(["totalMilkProductionsPerMonth"], GetTotalMilkProductionsPerMonth);

  const data = {
    labels: milkProductions?.data.map((milkProduction) => milkProduction.month),
    datasets: [
      {
        label: "Mês",
        data: milkProductions?.data.map((milkProduction) => milkProduction.value),
        borderColor: "rgb(67, 146, 191)",
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
    ],
  };

  return (
    <div className={`flex col-span-1 h-full ${sidebarOpen ? "2xl:col-span-2" : "2xl:col-span-1"}`}>
      <GraphCard title="Total de leite por mês" isLoading={isLoading} isError={isError}>
        <LineChart data={data} />
      </GraphCard>
    </div>
  );
}
