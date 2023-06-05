import { useQuery } from "@tanstack/react-query";
import React from "react";
import LineChart from "../../../../components/Graphs/LineChart";
import GraphCard from "./GraphCard";
import { GetMilkSalesTotalRevenueInPreviousMonths } from "../../../../services/MilkSales";

export default function MilkSalesTotalRevenueInPreviousMonths() {
  const amountOfMonths = 6;

  const getTotalRevenue = () => GetMilkSalesTotalRevenueInPreviousMonths(amountOfMonths);

  const {
    isLoading,
    isError,
    data: totalRevenue,
  } = useQuery(["milkSalesTotalRevenueInPreviousMonths"], getTotalRevenue);

  const data = {
    labels: totalRevenue?.data.map((revenue) => revenue.month),
    datasets: [
      {
        label: "Mês",
        data: totalRevenue?.data.map((revenue) => revenue.value),
        borderColor: "rgb(67, 146, 191)",
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
    ],
  };

  return (
    <div className="flex col-span-1 h-full">
      <GraphCard title="Receita total de leite por mês" isLoading={isLoading} isError={isError}>
        <LineChart data={data} />
      </GraphCard>
    </div>
  );
}
