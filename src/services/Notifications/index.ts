import { AxiosResponse } from "axios";
import { API } from "../Api";

type NotificationResponse = {
  amount: number;
};

export const GetAmountOfMessageNotifications = async (): Promise<
  AxiosResponse<NotificationResponse>
> => {
  return API.get("/message/notifications");
};
