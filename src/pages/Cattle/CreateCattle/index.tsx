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
      <div className="bg-white shadow rounded-md mx-auto">
        <h2 className="text-3xl p-5 pb-0">Cadastrar gado</h2>
        <form
          onSubmit={onSubmit}
          className="py-8 px-5 md:flex-row flex flex-col gap-5 w-full"
        >
          <div className="flex flex-col gap-2.5 w-full">
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
            <div className="flex flex-col md:flex-row md:items-center gap-5">
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
          </div>
          <div className="w-full">
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
