type Breed = {
  breed: string;
  quantityInFraction: {
    numerator: number;
    denominator: number;
  };
};

type Owner = {
  firstName: string;
  lastName: string;
};

type Cattle = {
  id: string;
  name: string;
  fatherId: string | null;
  motherId: string | null;
  fatherName: string | null;
  motherName: string | null;
  isInLactationPeriod: false;
  sex: "Male" | "Female";
  cattleBreeds: Breed[];
  purchaseDate: string | null;
  dateOfBirth: string | null;
  yearOfBirth: number;
  image: string | null;
  dateOfDeath: string | null;
  causeOfDeath: string | null;
  dateOfSale: string | null;
  owners: Owner[];
};

export type PaginatedCattle = {
  cattle: Cattle[];
  currentPage: number;
  pages: number;
};
