import { CreateMilkProductionForm } from "../../pages/MilkProductions/CreateMilkProduction";
import { API } from "../Api";

export const CreateNewMilkProduction = (
  milkProductionData: CreateMilkProductionForm
) => {
  return API.post("/milk-productions", milkProductionData);
};
