import React from "react";
import Lottie from "lottie-react";
import AutoRotateCarousel from "../../../components/Carousel/AutoRotateCarousel";
import MelhorAdministracao from "./MelhorAdministracao";

import AcessoRapidoDados from "./AcessoRapidoDados";
import MelhorManejo from "./MelhorManejo";

import mobileUserRegstration from "../../../assets/lotties/userRegistration.json";

const SideData = () => {
  return (
    <>
      <div className="hidden md:flex flex-col flex-1 items-center md:pt-16 md:bg-[var(--primary-blue)] rounded-l-xl">
        <AutoRotateCarousel
          items={[
            <MelhorAdministracao key="melhorAdministracao" />,
            <AcessoRapidoDados key="acessoRapidoDados" />,
            <MelhorManejo key="milkingCow" />,
          ]}
          timeToAutoRotateInMs={7900}
        />
      </div>
      <div className="flex justify-center items-center md:hidden">
        <Lottie className="w-36" animationData={mobileUserRegstration} />
      </div>
    </>
  );
};

export default SideData;
