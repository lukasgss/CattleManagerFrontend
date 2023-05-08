import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetAllMilkProductions } from "../../../services/MilkProductions";
import TableLoadingSkeleton from "../../../components/Common/Loading/TableLoadingSkeleton";
import TablePagesButtons from "./TablePagesButtons";

export default function MilkProductionTable() {
  const [page, setPage] = useState(1);
  const milkProductionTableHeaders = ["Vaca", "Quantidade em litros", "Data", "Período do dia"];

  const getMilkProductions = async () => {
    return GetAllMilkProductions(page);
  };

  const {
    isLoading,
    isError,
    refetch,
    data: milkProductions,
  } = useQuery({ queryKey: ["milkProduction"], queryFn: getMilkProductions });

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <div>
      <table className="w-full rounded-md border-2 mt-3 text-center" cellPadding={10}>
        <thead className="bg-[#F9F9F9] border-b-2">
          <tr>
            {milkProductionTableHeaders.map((milkProduction) => (
              <th key={milkProduction} className="py-4">
                {milkProduction}
              </th>
            ))}
          </tr>
        </thead>
        {isLoading ? <TableLoadingSkeleton amountOfRows={20} amountOfColumns={4} /> : null}
        {!isLoading && !isError && milkProductions?.data.milkProductions.length > 0 ? (
          <tbody>
            {milkProductions?.data.milkProductions.map((milkProduction) => (
              <tr key={milkProduction.id} className="border-b-1 even:bg-[#f8fafc]">
                <td>{milkProduction.cattleName}</td>
                <td>{milkProduction.milkInLiters}</td>
                <td>{milkProduction.date}</td>
                <td>{milkProduction.periodOfDay}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
      {!isLoading && !isError && milkProductions?.data.milkProductions.length === 0 ? (
        <div className="text-center border-2 border-t-0 py-3">Nenhum dado encontrado!</div>
      ) : null}
      {!isLoading && !isError ? (
        <div className="mt-2">
          <TablePagesButtons amountOfPages={milkProductions.data.pages} currentPage={page} setPage={setPage} />
        </div>
      ) : null}
    </div>
  );
}
