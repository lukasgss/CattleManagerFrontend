import { AxiosResponse } from "axios";
import { DataArr } from "../../types/dataArr";
import { API } from "../Api";

export const GetMaleCattleByName = (
  name: string
): Promise<AxiosResponse<DataArr[]>> => {
  return API.get(`/cattle/dropdown/male?name=${name}`);
};

export const GetFemaleCattleByName = (
  name: string
): Promise<AxiosResponse<DataArr[]>> => {
  return API.get(`/cattle/dropdown/female?name=${name}`);
};
