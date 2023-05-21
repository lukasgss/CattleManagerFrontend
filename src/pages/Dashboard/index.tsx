import React, { useContext } from "react";
import { GiCow, GiMilkCarton } from "react-icons/gi";
import { TbCurrencyReal, TbGraph } from "react-icons/tb";
import MainPage from "../../components/MainPage";
import GeneralDataCard from "./components/GeneralDataCard";
import TotalMilkProductionPerMonthGraph from "./components/graphs/TotalMilkProductionPerMonthGraph";
import AmountOfMedicalRecordsPerMonthGraph from "./components/graphs/AmountOfMedicalRecordsPerMonthGraph";
import { SidebarContext } from "../../contexts/SidebarContext";

export default function Dashboard() {
  const { sidebarOpen } = useContext(SidebarContext);

  return (
    <MainPage>
      <div>
        <h2 className="text-5xl">Dashboard</h2>
        <div
          className={`grid grid-cols-1 xl:grid-cols-2 w-full gap-5 mt-6 h-fit ${
            sidebarOpen ? "2xl:grid-cols-5" : "2xl:grid-cols-2"
          }`}
        >
          <div
            className={`bg-white px-5 rounded-md shadow-md w-full 2xl:max-w-4xl col-span-1 xl:col-span-1 ${
              sidebarOpen ? "2xl:col-span-3" : "2xl:col-span-1"
            }`}
          >
            <h2 className="text-3xl py-2 mt-3">Dados gerais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-5 py-5">
              <GeneralDataCard
                Icon={GiCow}
                cardBackgroundColor="#ffd9e0"
                iconBackgroundColor="#ff2478"
                title="Total de animais"
                value={675}
              />
              <GeneralDataCard
                Icon={GiMilkCarton}
                cardBackgroundColor="#89dafa"
                iconBackgroundColor="#0f9da4"
                title="Total em lactação"
                value={225}
              />
              <GeneralDataCard
                Icon={TbGraph}
                cardBackgroundColor="#fcebca"
                iconBackgroundColor="#ff947a"
                title="Média de leite/dia"
                value="22.37l"
              />
              <GeneralDataCard
                Icon={TbCurrencyReal}
                cardBackgroundColor="#d3ffe6"
                iconBackgroundColor="#28ca5e"
                title="Preço médio do litro"
                value="R$ 2,37"
              />
            </div>
          </div>
          <TotalMilkProductionPerMonthGraph />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
          <AmountOfMedicalRecordsPerMonthGraph />
        </div>
      </div>
    </MainPage>
  );
}
