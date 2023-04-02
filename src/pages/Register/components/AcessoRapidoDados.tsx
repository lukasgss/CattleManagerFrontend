import React from "react";
import Lottie from "lottie-react";

import digitalData from "../../../assets/lotties/digitalData.json";

const AcessoRapidoDados = () => {
  return (
    <div className="flex flex-col gap-2.5 text-center">
      <Lottie
        animationData={digitalData}
        className="w-52 md:w-96 md:h-[340px] mx-auto"
        draggable={false}
      />
      <div className="hidden md:flex flex-col gap-2">
        <span className="text-white text-3xl manrope-extrabold">
          Fácil acesso à dados
        </span>
        <span className="text-[var(--primary-white)] px-10">
          Armazenamento rápido e fácil aos dados dos animais, sem mais cadernos
          para anotações.
        </span>
      </div>
    </div>
  );
};

export default AcessoRapidoDados;
