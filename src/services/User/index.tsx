import { AxiosResponse } from "axios";
import { API } from "../Api";
import { LoginUserData, RegisterUserData, UserData } from "./types";
import { DataArr } from "../../types/dataArr";

export const LoginUser = async (
  loginUserData: LoginUserData
): Promise<AxiosResponse<UserData>> => {
  return API.post("/users/login", loginUserData);
};

export const RegisterUser = async (
  registerUserData: RegisterUserData
): Promise<AxiosResponse<UserData>> => {
  return API.post("/users/register", registerUserData);
};

export const GetUserData = async (
  userId: string
): Promise<AxiosResponse<UserData>> => {
  return API.get(`/users/data/${userId}`);
};

export const GetUsersByName = async (
  name: string
): Promise<AxiosResponse<DataArr[]>> => {
  return API.get(`/users/dropdown?name=${name}`);
};
