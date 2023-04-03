import React from "react";
import Lottie from "lottie-react";

import analyzingData from "../../../assets/lotties/analyzingData.json";

import "../index.scss";

const MelhorAdministracao = () => {
  return (
    <div className="showupAnimation flex flex-col gap-2.5 text-center">
      <Lottie
        animationData={analyzingData}
        className="w-52 md:w-96 md:h-[340px] mx-auto"
        draggable={false}
      />
      <div className="hidden md:flex flex-col gap-1.5">
        <span className="text-white text-3xl manrope-extrabold">
          Melhor administração
        </span>
        <span className="text-[var(--primary-white)] px-10">
          Administre melhor os animais de sua fazenda com os dados
          proporcionados pelo sistema.
        </span>
      </div>
    </div>
  );
};

export default MelhorAdministracao;
