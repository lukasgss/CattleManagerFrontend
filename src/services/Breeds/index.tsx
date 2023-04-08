import { AxiosResponse } from "axios";
import { DataArr } from "../../types/dataArr";
import { API } from "../Api";

export const GetAllBreeds = (): Promise<AxiosResponse<DataArr[]>> => {
  return API.get("/breeds/dropdown/");
};
