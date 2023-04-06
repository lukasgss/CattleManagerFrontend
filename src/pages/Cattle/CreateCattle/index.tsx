import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MainPage from "../../../components/MainPage";
import Text from "../../../components/Common/Input/Text";
import AutoComplete from "../../../components/Common/Input/AutoComplete";
import { DataArr } from "../../../types/dataArr";
import { GetMaleCattleByName } from "../../../services/Cattle";

type Breed = {
  breedId: string;
  quantityInPercentage: number;
};

type CreateCattleFormData = {
  name: string;
  fatherId: string | null;
  motherId: string | null;
  sexId: 0 | 1;
  breeds: Breed[];
  purchaseDate: Date | null;
  conceptionDateDate: Date | null;
  dateOfBirth: Date | null;
  yearOfBirth: number;
  image: string | null;
  dateOfDeath: Date | null;
  causeOfDeath: string;
  dateOfSale: Date | null;
  priceInCentsInReais: number | null;
  ownersIds: string[];
};

const CreateCattle = () => {
  const [cattleFatherArr, setCattleFatherArr] = useState<DataArr[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCattleFormData>();

  const onSubmit = handleSubmit(() => {
    //
  });

  const onChangeSearch = async (searchTerm: string) => {
    if (searchTerm === "") {
      setCattleFatherArr([]);
    }
    const { data } = await GetMaleCattleByName(searchTerm);
    setCattleFatherArr(data);
  };

  return (
    <MainPage>
      <h2 className="text-3xl">Cadastrar gado</h2>
      <div className="bg-white m-10 shadow rounded-md">
        <form onSubmit={onSubmit} className="py-8 px-4 grid grid-cols-3">
          <div>
            <Text
              name="cattleName"
              register={register}
              error={errors.name}
              labelText="Nome do animal"
            />
            <AutoComplete
              name="fatherId"
              register={register}
              labelText="Pai do animal"
              setValue={setValue}
              error={errors.fatherId}
              onChangeSearch={onChangeSearch}
              dataArr={cattleFatherArr}
            />
          </div>
        </form>
      </div>
    </MainPage>
  );
};

export default CreateCattle;
