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
  purchaseDate: Date | null;
  conceptionDateDate: Date | null;
  dateOfBirth: string | null;
  yearOfBirth: number;
  image: string | null;
  dateOfDeath: Date | null;
  causeOfDeath: string;
  dateOfSale: Date | null;
  priceInCentsInReais: number | null;
  ownersIds: string[];
};
