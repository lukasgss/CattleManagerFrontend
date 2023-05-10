import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainPage from "../../components/MainPage";
import { GetAllCattle } from "../../services/Cattle";

import defaultCow from "../../assets/img/defaultCow.webp";
import CattleCard from "./components/CattleCard";
import CattleCardSkeleton from "./components/CattleCardSkeleton";
import PaginationButtons from "../MilkProductions/components/PaginationButtons";

export default function Cattle() {
  const [page, setPage] = useState(1);

  const getAllCattle = () => {
    return GetAllCattle(page);
  };

  const { isLoading, isError, refetch, data: cattleData } = useQuery(["cattle"], getAllCattle);

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <MainPage>
      <div className="px-2 lg:px-8 py-5 bg-white">
        <h2 className="text-3xl mb-5">Gados cadastrados</h2>
        <div className="w-full flex justify-end mt-5">
          <div>
            <Link
              to="/cadastro-gado"
              className="bg-[var(--primary-blue)] text-white px-5 py-3 rounded-md poppins-semi-bold"
            >
              Cadastrar gado
            </Link>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 md:w-10/12 lg:gap-x-10 gap-y-5 mx-auto">
          {isLoading && !isError ? [...Array(20)].map((el) => <CattleCardSkeleton key={el} />) : null}

          {cattleData?.data.cattle.length === 0 ? (
            <div className="text-center lg:col-span-2 text-2xl">Você não possui nenhum animal cadastrado!</div>
          ) : null}

          {!isLoading && !isError && cattleData?.data.cattle.length > 0
            ? cattleData?.data.cattle.map((cattle) => (
                <CattleCard
                  key={cattle.id}
                  id={cattle.id}
                  breeds={cattle.cattleBreeds}
                  image={defaultCow}
                  name={cattle.name}
                  sex={cattle.sex}
                />
              ))
            : null}
          {isError ? (
            <div className="text-center col-span-2 text-2xl">Ocorreu um erro ao obter os gados cadastrados.</div>
          ) : null}
          {!isLoading && !isError && cattleData?.data.cattle.length !== 0 ? (
            <div className="mt-2 lg:col-span-2">
              <PaginationButtons
                amountOfPages={cattleData?.data.pages}
                currentPage={cattleData?.data.currentPage}
                setPage={setPage}
              />
            </div>
          ) : null}
        </div>
      </div>
    </MainPage>
  );
}
