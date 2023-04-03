import React from "react";

import milkingCow from "../../../assets/img/milkingCow.png";

import "../index.scss";

const MelhorManejo = () => {
  return (
    <div className="showupAnimation flex flex-col gap-2.5 text-center">
      <img
        src={milkingCow}
        className="w-52 md:w-96 md:h-[340px] mx-auto"
        alt="Fazendeiro tirando leite de sua vaca"
        draggable={false}
      />
      <div className="hidden md:flex flex-col gap-1.5">
        <span className="text-white text-3xl manrope-extrabold">
          Manejo adequado
        </span>
        <span className="text-[var(--primary-white)] px-10">
          Com os dados fornecidos pelo sistema, é possível realizar o manejo
          mais adequado dos animais.
        </span>
      </div>
    </div>
  );
};

export default MelhorManejo;
