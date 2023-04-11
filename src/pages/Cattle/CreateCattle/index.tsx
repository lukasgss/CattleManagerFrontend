import React from "react";
import { useForm } from "react-hook-form";
import MainPage from "../../../components/MainPage";
import BreedForm from "./components/BreedForm";
import { CreateCattleFormData } from "./types";
import OwnerForm from "./components/OwnerForm";
import BoughtCattleForm from "./components/BoughtCattleForm";
import DeadCattleForm from "./components/DeadCattleForm";
import CattleDataForm from "./components/CattleDataForm";

const CreateCattle = () => {
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

  return (
    <MainPage>
      <div className="bg-white shadow rounded-md mx-auto">
        <h2 className="text-3xl p-5 pb-0">Cadastrar gado</h2>
        <form
          onSubmit={onSubmit}
          className="py-8 px-5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 w-full"
        >
          <div className="flex flex-col gap-2.5 w-full">
            <CattleDataForm
              register={register}
              setValue={setValue}
              errors={errors}
            />
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
