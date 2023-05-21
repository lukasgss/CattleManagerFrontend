import { API } from "../Api";

export const GetAmountOfMedicalRecordsPerMonth = (month: number) => {
  return API.get(`/medical-records/previous-months?months=${month}`);
};
