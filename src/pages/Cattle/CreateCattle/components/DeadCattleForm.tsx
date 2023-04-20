import React from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { CreateCattleFormData } from "../types";
import Text from "../../../../components/Common/Input/Text";
import DatePickerInput from "../../../../components/Common/Input/DatePickerInput";
import Radio from "../../../../components/Common/Input/Radio";

type DeadCattleFormProps = {
  register: UseFormRegister<CreateCattleFormData>;
  setValue: UseFormSetValue<CreateCattleFormData>;
  watch: UseFormWatch<CreateCattleFormData>;
  errors: FieldErrors<CreateCattleFormData>;
};

const DeadCattleForm = ({
  register,
  setValue,
  watch,
  errors,
}: DeadCattleFormProps) => {
  const cattleIsDead = watch("isDead");

  return (
    <div className="mt-2.5">
      <span>Animal está morto?</span>
      <div className="flex flex-col">
        <Radio
          name="isDead"
          register={register}
          radioOptions={[
            { text: "Não", value: false },
            { text: "Sim", value: true },
          ]}
          watch={watch}
          setValue={setValue}
          error={errors.isDead}
        />
        {cattleIsDead === "Sim" ? (
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 2xl:grid-cols-3 xl:gap-5 mt-1">
            <DatePickerInput
              name="dateOfDeath"
              register={register}
              labelText="Data da morte"
              placeholder="31/10/2020"
              setValue={setValue}
            />
            <div className="2xl:col-span-2">
              <Text
                name="causeOfDeath"
                register={register}
                labelText="Causa da morte"
                placeholder="Brucelose"
                error={errors.causeOfDeath}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DeadCattleForm;
