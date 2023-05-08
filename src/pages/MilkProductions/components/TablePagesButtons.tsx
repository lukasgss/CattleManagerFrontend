import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import TableButton from "../../../components/Common/Button/TableButton";

type TablePagesButtons = {
  amountOfPages: number;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

type PrevAndNextButtonProps = {
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function PreviousButton({ currentPage, setPage }: PrevAndNextButtonProps) {
  return (
    <div>
      <TableButton currentPage={false} changePage={() => setPage(currentPage - 1)}>
        <GrFormPrevious className="w-4 h-6" />
      </TableButton>
    </div>
  );
}

function NextButton({ currentPage, setPage }: PrevAndNextButtonProps) {
  return (
    <div>
      <TableButton currentPage={false} changePage={() => setPage(currentPage + 1)}>
        <GrFormNext className="w-4 h-6" />
      </TableButton>
    </div>
  );
}

export default function TablePagesButtons({ amountOfPages, currentPage, setPage }: TablePagesButtons) {
  const passToPreviousPage = () => {
    if (currentPage === 1) return;
    setPage(currentPage - 1);
  };

  const passToNextPage = () => {
    if (currentPage === amountOfPages) return;
    setPage(currentPage + 1);
  };

  return (
    <div className="w-full flex justify-end">
      <div className="flex items-center gap-3">
        <PreviousButton currentPage={currentPage} setPage={passToPreviousPage} />
        <TableButton currentPage={currentPage === 1} changePage={() => setPage(1)}>
          1
        </TableButton>
        {currentPage + 1 < amountOfPages ? (
          <TableButton currentPage={currentPage === currentPage + 1} changePage={() => setPage(currentPage + 1)}>
            {currentPage + 1}
          </TableButton>
        ) : null}
        {currentPage - 1 > 1 ? (
          <TableButton currentPage={currentPage === currentPage - 1} changePage={() => setPage(currentPage - 1)}>
            {currentPage - 1}
          </TableButton>
        ) : null}
        {amountOfPages > 1 ? (
          <TableButton currentPage={currentPage === amountOfPages} changePage={() => setPage(amountOfPages)}>
            {amountOfPages}
          </TableButton>
        ) : null}
        <NextButton currentPage={currentPage} setPage={passToNextPage} />
      </div>
    </div>
  );
}
