import React from "react";
import TablePagesButtons from "../../../pages/MilkProductions/components/TablePagesButtons";
import TableLoadingSkeleton from "../Loading/TableLoadingSkeleton";

type TableProps = {
  tableHeaders: string[];
  isLoading: boolean;
  isError: boolean;
  tableData: any[] | undefined;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  numberOfPages: number | undefined;
};

export default function Table({
  tableHeaders,
  isLoading,
  isError,
  numberOfPages,
  currentPage,
  setPage,
  tableData = [],
}: TableProps) {
  return (
    <>
      <table className="w-full rounded-md border-2 mt-3 text-center" cellPadding={10}>
        <thead className="bg-[#F9F9F9] border-b-2">
          <tr>
            {tableHeaders.map((header) => (
              <th key={header} className="py-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {isLoading ? <TableLoadingSkeleton amountOfRows={20} amountOfColumns={4} /> : null}

        {!isLoading && !isError && tableData.length > 0 ? (
          <tbody>
            {tableData?.map((data, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={`${data}-${idx}`} className="border-b-1 even:bg-[#fafbfc]">
                {Object.values(data).map((val: any, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <td key={`${data}-${i}`}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>

      {!isLoading && !isError && tableData.length === 0 ? (
        <div className="text-center border-2 border-t-0 py-3">Nenhum dado encontrado!</div>
      ) : null}
      {!isLoading && !isError && tableData.length !== 0 ? (
        <div className="mt-2">
          <TablePagesButtons amountOfPages={numberOfPages as number} currentPage={currentPage} setPage={setPage} />
        </div>
      ) : null}
      {!isLoading && isError ? (
        <div className="text-center border-2 border-t-0 py-3">
          Não foi possível obter os dados da tabela, tente novamente mais tarde.
        </div>
      ) : null}
    </>
  );
}
