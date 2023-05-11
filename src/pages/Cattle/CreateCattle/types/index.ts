import { DataArr } from "../../../../types/dataArr";

export type BreedFormData = {
  breedId: string;
  name: string;
  quantityInPercentage: number;
};

export type CreateCattleFormData = {
  name: string;
  fatherId: string | null;
  motherId: string | null;
  sexId: DataArr | null;
  breeds: BreedFormData[];
  breedName: string;
  doesNotKnowDateOfBirth: boolean;
  breedQuantity: string;
  wasBought: "Não" | "Sim";
  purchaseDate: Date | null;
  conceptionDateDate: Date | null;
  dateOfBirth: Date | null;
  yearOfBirth: DataArr | null;
  image: string | null;
  isDead: "Não" | "Sim";
  dateOfDeath: Date | null;
  causeOfDeath: string;
  dateOfSale: Date | null;
  priceInCentsInReais: number | null;
  ownerName: string;
  ownersIds: string[];
};

type BreedFormDataRequest = {
  breedId: string;
  quantityInPercentage: number;
};

export type CreateCattleFormDataRequest = {
  name: string;
  fatherId: string | null;
  motherId: string | null;
  sexId: number;
  breeds: BreedFormDataRequest[];
  purchaseDate: Date | null;
  dateOfBirth: Date | null;
  yearOfBirth: number;
  image: string | null;
  dateOfDeath: Date | null;
  causeOfDeath: string | null;
  dateOfSale: Date | null;
  priceInCentsInReais: number | null;
  ownersIds: string[];
};
