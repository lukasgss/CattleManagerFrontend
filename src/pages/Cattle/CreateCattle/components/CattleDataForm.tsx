import React, { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Text from "../../../../components/Common/Input/Text";
import AutoComplete from "../../../../components/Common/Input/AutoComplete";
import DatePickerInput from "../../../../components/Common/Input/DatePickerInput";
import Dropdown from "../../../../components/Common/Input/Dropdown";
import { sexArrData } from "../../../../constantsDropdownArrayData";
import { CreateCattleFormData } from "../types";
import {
  GetMaleCattleByName,
  GetFemaleCattleByName,
} from "../../../../services/Cattle";
import { DataArr } from "../../../../types/dataArr";

type CattleFormDataProps = {
  register: UseFormRegister<CreateCattleFormData>;
  errors: FieldErrors<CreateCattleFormData>;
  setValue: UseFormSetValue<CreateCattleFormData>;
};

const CattleDataForm = ({
  register,
  errors,
  setValue,
}: CattleFormDataProps) => {
  const [cattleFatherArr, setCattleFatherArr] = useState<DataArr[]>([]);
  const [cattleMotherArr, setCattleMotherArr] = useState<DataArr[]>([]);

  const [selectedItem, setSelectedItem] = useState<DataArr | null>(null);

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
    <div className="flex flex-col gap-2 5">
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
    </div>
  );
};

export default CattleDataForm;
