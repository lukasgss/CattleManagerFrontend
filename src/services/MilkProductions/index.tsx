import { AxiosResponse } from "axios";
import { MilkProductionData } from "../../pages/MilkProductions/CreateMilkProduction";
import { API } from "../Api";
import { DataInMonth } from "../types";

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

export const GetTotalMilkProductionsOnPreviousMonths = (
  previousMonths: number
): Promise<AxiosResponse<DataInMonth<number>[]>> => {
  return API.get(`/milk-productions/previous-months?months=${previousMonths}`);
};
