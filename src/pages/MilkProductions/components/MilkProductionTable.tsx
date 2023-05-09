import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetAllMilkProductions } from "../../../services/MilkProductions";
import Table from "../../../components/Common/Table/Table";

export default function MilkProductionTable() {
  const [page, setPage] = useState(1);

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
      <Table
        isLoading={isLoading}
        isError={isError}
        tableData={milkProductions?.data.milkProductions}
        currentPage={page}
        numberOfPages={milkProductions?.data.pages}
        setPage={setPage}
        tableHeaders={["Vaca", "Quantidade em litros", "Data", "Período do dia"]}
        tableDataKeys={["cattleName", "milkInLiters", "date", "periodOfDay"]}
      />
    </div>
  );
}
