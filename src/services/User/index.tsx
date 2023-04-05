import { AxiosResponse } from "axios";
import { API } from "../Api";
import { LoginUserData, RegisterUserData, UserData } from "./types";

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
