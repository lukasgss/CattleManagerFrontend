import React from "react";
import { useQuery } from "@tanstack/react-query";
import LineChart from "../../../../components/Graphs/LineChart";
import { GetAmountOfMedicalRecordsPerMonth } from "../../../../services/MedicalRecords";
import GraphCard from "./GraphCard";

export default function AmountOfMedicalRecordsPerMonthGraph() {
  const amountOfMonths = 6;

  const getAmountOfMedicalRecords = () => GetAmountOfMedicalRecordsPerMonth(amountOfMonths);

  const { isLoading, isError, data: medicalRecords } = useQuery(["amountOfMedicalRecords"], getAmountOfMedicalRecords);

  const data = {
    labels: medicalRecords?.data.map((medicalRecord) => medicalRecord.month),
    datasets: [
      {
        label: "Mês",
        data: medicalRecords?.data.map((medicalRecord) => medicalRecord.value),
        borderColor: "rgb(67, 146, 191)",
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
    ],
  };

  return (
    <div className="flex col-span-1 h-full">
      <GraphCard title="Histórico de registros médicos por mês" isLoading={isLoading} isError={isError}>
        <LineChart data={data} />
      </GraphCard>
    </div>
  );
}
