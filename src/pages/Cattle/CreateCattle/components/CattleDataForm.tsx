import React, { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import Text from "../../../../components/Common/Input/Text";
import AutoComplete from "../../../../components/Common/Input/AutoComplete";
import DatePickerInput from "../../../../components/Common/Input/DatePickerInput";
import Dropdown from "../../../../components/Common/Input/Dropdown";
import { sexArrData } from "../../../../constantsDropdownArrayData";
import { CreateCattleFormData } from "../types";
import { GetMaleCattleByName, GetFemaleCattleByName } from "../../../../services/Cattle";
import { DataArr } from "../../../../types/dataArr";

type CattleFormDataProps = {
  register: UseFormRegister<CreateCattleFormData>;
  errors: FieldErrors<CreateCattleFormData>;
  setValue: UseFormSetValue<CreateCattleFormData>;
  doesNotKnowDateOfBirth: boolean;
  watch: UseFormWatch<CreateCattleFormData>;
};

const CattleDataForm = ({ register, errors, setValue, watch, doesNotKnowDateOfBirth }: CattleFormDataProps) => {
  const [cattleFatherArr, setCattleFatherArr] = useState<DataArr[]>([]);
  const [cattleMotherArr, setCattleMotherArr] = useState<DataArr[]>([]);
  const [yearsArr, setYearsArr] = useState<DataArr[]>([]);

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

  useEffect(() => {
    const fillYearDropdowns = () => {
      let year = new Date().getFullYear();
      const arr: DataArr[] = [];
      for (let i = 0; i <= 30; i++) {
        arr.push({ text: String(year), value: year });
        year--;
      }

      setYearsArr(arr);
    };

    fillYearDropdowns();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Text name="name" register={register} placeholder="Amora" error={errors.name} labelText="Nome do animal" />
      <div className="flex flex-col gap-3 xl:flex-row">
        <AutoComplete
          name="fatherId"
          register={register}
          labelText="Pai do animal"
          placeholder="Bacana"
          watch={watch}
          setValue={setValue}
          error={errors.fatherId}
          onChangeSearch={onChangeSearchFather}
          dataArr={cattleFatherArr}
        />
        <AutoComplete
          name="motherId"
          register={register}
          labelText="Mãe do animal"
          watch={watch}
          placeholder="Ameixa"
          setValue={setValue}
          error={errors.motherId}
          onChangeSearch={onChangeSearchMother}
          dataArr={cattleMotherArr}
        />
      </div>
      <div className="flex flex-col gap-3 2xl:flex-row 2xl:gap-5">
        <Dropdown
          labelText="Sexo"
          name="sexId"
          placeholder="Fêmea"
          register={register}
          setValue={setValue}
          error={errors.sexId}
          watch={watch}
          dataArr={sexArrData}
        />
        <DatePickerInput
          register={register}
          name="dateOfBirth"
          placeholder="19/12/2002"
          labelText="Data de nascimento"
          setValue={setValue}
          doesNotKnowDateValue={doesNotKnowDateOfBirth}
          doesNotKnowDateValueInputName="doesNotKnowDateOfBirth"
          doesNotKnowDateOption
        />
      </div>
      {doesNotKnowDateOfBirth ? (
        <Dropdown
          register={register}
          name="yearOfBirth"
          placeholder="2021"
          labelText="Ano de nascimento"
          watch={watch}
          dataArr={yearsArr}
          setValue={setValue}
        />
      ) : null}
    </div>
  );
};

export default CattleDataForm;
