import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MainPage from "../../../components/MainPage";
import Text from "../../../components/Common/Input/Text";
import AutoComplete from "../../../components/Common/Input/AutoComplete";
import { DataArr } from "../../../types/dataArr";
import {
  GetFemaleCattleByName,
  GetMaleCattleByName,
} from "../../../services/Cattle";
import BreedForm from "./components/BreedForm";
import { CreateCattleFormData } from "./types";
import Dropdown from "../../../components/Common/Input/Dropdown";
import { sexArrData } from "../../../constantsDropdownArrayData";
import DatePickerInput from "../../../components/Common/Input/DatePickerInput";
import OwnerForm from "./components/OwnerForm";
import BoughtCattleForm from "./components/BoughtCattleForm";
import DeadCattleForm from "./components/DeadCattleForm";

const CreateCattle = () => {
  const [cattleFatherArr, setCattleFatherArr] = useState<DataArr[]>([]);
  const [cattleMotherArr, setCattleMotherArr] = useState<DataArr[]>([]);

  const [selectedItem, setSelectedItem] = useState<DataArr | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    control,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<CreateCattleFormData>({
    defaultValues: {
      breeds: [],
      ownersIds: [],
      wasBought: "Não",
      isDead: "Não",
    },
  });

  const onSubmit = handleSubmit(() => {
    //
  });

  const onChangeSearchFather = async (searchTerm: string) => {
    if (searchTerm === "") {
      setCattleFatherArr([]);
    }
    const { data } = await GetMaleCattleByName(searchTerm);
    setCattleFatherArr(data);
  };

  const onChangeSearchMother = async (searchTerm: string) => {
    if (searchTerm === "") {
      setCattleMotherArr([]);
    }
    const { data } = await GetFemaleCattleByName(searchTerm);
    setCattleMotherArr(data);
  };

  return (
    <MainPage>
      <div className="bg-white shadow rounded-md mx-auto">
        <h2 className="text-3xl p-5 pb-0">Cadastrar gado</h2>
        <form
          onSubmit={onSubmit}
          className="py-8 px-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 w-full"
        >
          <div className="flex flex-col gap-2.5 w-full">
            <Text
              name="cattleName"
              register={register}
              placeholder="Amora"
              error={errors.name}
              labelText="Nome do animal"
            />
            <div className="lg:flex gap-5">
              <AutoComplete
                name="fatherId"
                register={register}
                labelText="Pai do animal"
                placeholder="Bacana"
                setValue={setValue}
                error={errors.fatherId}
                onChangeSearch={onChangeSearchFather}
                dataArr={cattleFatherArr}
              />
              <AutoComplete
                name="motherId"
                register={register}
                labelText="Mãe do animal"
                placeholder="Ameixa"
                setValue={setValue}
                error={errors.motherId}
                onChangeSearch={onChangeSearchMother}
                dataArr={cattleMotherArr}
              />
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-5">
              <Dropdown
                labelText="Sexo"
                name="sexId"
                placeholder="Fêmea"
                register={register}
                setValue={setValue}
                error={errors.sexId}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                dataArr={sexArrData}
              />
              <DatePickerInput
                register={register}
                name="dateOfBirth"
                placeholder="19/12/2002"
                labelText="Data de nascimento"
                setValue={setValue}
              />
            </div>
            <BoughtCattleForm
              register={register}
              setValue={setValue}
              watch={watch}
              control={control}
              errors={errors}
            />
          </div>
          <div className="w-full">
            <BreedForm
              register={register}
              setValue={setValue}
              setError={setError}
              control={control}
              errors={errors}
              getValues={getValues}
              watch={watch}
              clearErrors={clearErrors}
            />
            <OwnerForm
              register={register}
              setValue={setValue}
              setError={setError}
              errors={errors}
              clearErrors={clearErrors}
              getValues={getValues}
            />
            <DeadCattleForm
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          </div>
        </form>
      </div>
    </MainPage>
  );
};

export default CreateCattle;
