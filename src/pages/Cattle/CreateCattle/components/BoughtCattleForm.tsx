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
import Radio from "../../../../components/Common/Input/Radio";

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

  return (
    <div className="mt-5">
      <span>Animal foi comprado?</span>
      <div className="flex flex-col">
        <Radio
          name="wasBought"
          register={register}
          radioOptions={[
            { text: "Não", value: false },
            { text: "Sim", value: true },
          ]}
          watch={watch}
          setValue={setValue}
          error={errors.wasBought}
        />
        {cattleWasBought !== "Não" ? (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 xl:gap-5 mt-1">
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
              placeholder="8.500,00"
              control={control}
              error={errors.priceInCentsInReais}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BoughtCattleForm;
