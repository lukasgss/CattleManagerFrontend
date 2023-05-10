import { AxiosResponse } from "axios";
import { MilkProductionData } from "../../pages/MilkProductions/CreateMilkProduction";
import { API } from "../Api";

export type MilkProduction = {
  id: string;
  cattleName: string;
  milkInLiters: number;
  periodOfDay: string;
  date: string;
  cattleId: string;
};

type PaginatedMilkProduction = {
  milkProductions: MilkProduction[];
  currentPage: number;
  pages: number;
};

export const CreateNewMilkProduction = (milkProductionData: MilkProductionData) => {
  return API.post("/milk-productions", milkProductionData);
};

export const GetAllMilkProductions = (page: number): Promise<AxiosResponse<PaginatedMilkProduction>> => {
  return API.get(`/milk-productions?page=${page}`);
};
