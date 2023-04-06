import { AxiosResponse } from "axios";
import { DataArr } from "../../types/dataArr";
import { API } from "../Api";

export const GetMaleCattleByName = (
  name: string
): Promise<AxiosResponse<DataArr[]>> => {
  return API.get(`/dropdown/cattle/male?name=${name}`);
};
