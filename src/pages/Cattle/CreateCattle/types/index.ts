export type BreedFormData = {
  breedId: string;
  name: string;
  quantityInPercentage: number;
};

export type CreateCattleFormData = {
  name: string;
  fatherId: string | null;
  motherId: string | null;
  sexId: 0 | 1;
  breeds: BreedFormData[];
  breedName: string;
  breedQuantity: string;
  wasBought: "Não" | "Sim";
  purchaseDate: Date | null;
  conceptionDateDate: Date | null;
  dateOfBirth: string | null;
  yearOfBirth: number;
  image: string | null;
  isDead: "Não" | "Sim";
  dateOfDeath: Date | null;
  causeOfDeath: string;
  dateOfSale: Date | null;
  priceInCentsInReais: number | null;
  ownerName: string;
  ownersIds: string[];
};
