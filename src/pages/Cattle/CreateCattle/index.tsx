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
import DatePickerInput from "../../../components/Common/Input/DatePicker";

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
    formState: { errors },
  } = useForm<CreateCattleFormData>({
    defaultValues: {
      breeds: [],
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
      <h2 className="text-3xl">Cadastrar gado</h2>
      <div className="bg-white m-10 shadow rounded-md w-fit mx-auto">
        <form
          onSubmit={onSubmit}
          className="py-8 px-4 md:flex-row flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2.5">
            <Text
              name="cattleName"
              register={register}
              error={errors.name}
              labelText="Nome do animal"
            />
            <div className="lg:flex gap-5">
              <AutoComplete
                name="fatherId"
                register={register}
                labelText="Pai do animal"
                setValue={setValue}
                error={errors.fatherId}
                onChangeSearch={onChangeSearchFather}
                dataArr={cattleFatherArr}
              />
              <AutoComplete
                name="motherId"
                register={register}
                labelText="Mãe do animal"
                setValue={setValue}
                error={errors.motherId}
                onChangeSearch={onChangeSearchMother}
                dataArr={cattleMotherArr}
              />
            </div>
            <Dropdown
              labelText="Sexo"
              name="sexId"
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
              labelText="Data de nascimento"
              setValue={setValue}
            />
          </div>
          <div>
            <BreedForm
              register={register}
              setValue={setValue}
              setError={setError}
              control={control}
              errors={errors}
              getValues={getValues}
              clearErrors={clearErrors}
            />
          </div>
        </form>
      </div>
    </MainPage>
  );
};

export default CreateCattle;
