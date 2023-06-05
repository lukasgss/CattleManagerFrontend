import { AxiosResponse } from "axios";
import { API } from "../Api";
import { DataInMonth } from "../types";

export const GetMilkSalesTotalRevenueInPreviousMonths = (
  previousMonths: number
): Promise<AxiosResponse<DataInMonth<number>[]>> => {
  return API.get(`/milk-sales/total-revenue?previousMonths=${previousMonths}`);
};
