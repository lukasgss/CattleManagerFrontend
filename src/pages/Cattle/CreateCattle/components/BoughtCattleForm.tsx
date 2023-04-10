import React from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CreateCattleFormData } from "../types";
import Currency from "../../../../components/Common/Input/Currency";
import DatePickerInput from "../../../../components/Common/Input/DatePickerInput";

type BoughtCattleFormProps = {
  register: UseFormRegister<CreateCattleFormData>;
  setValue: UseFormSetValue<CreateCattleFormData>;
  watch: UseFormWatch<CreateCattleFormData>;
  control: Control<CreateCattleFormData>;
  errors: FieldErrors<CreateCattleFormData>;
};

const BoughtCattleForm = ({
  register,
  setValue,
  watch,
  control,
  errors,
}: BoughtCattleFormProps) => {
  const cattleWasBought = watch("wasBought");

  return cattleWasBought ? (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <DatePickerInput
        name="purchaseDate"
        register={register}
        labelText="Data da compra"
        placeholder="15/11/2021"
        setValue={setValue}
      />
      <Currency
        name="priceInCentsInReais"
        labelText="Preço em reais"
        control={control}
        error={errors.priceInCentsInReais}
      />
    </div>
  ) : null;
};

export default BoughtCattleForm;
