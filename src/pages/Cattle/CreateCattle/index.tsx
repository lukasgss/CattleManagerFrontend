import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import MainPage from "../../../components/MainPage";
import BreedForm from "./components/BreedForm";
import { CreateCattleFormData, CreateCattleFormDataRequest } from "./types";
import OwnerForm from "./components/OwnerForm";
import BoughtCattleForm from "./components/BoughtCattleForm";
import DeadCattleForm from "./components/DeadCattleForm";
import CattleDataForm from "./components/CattleDataForm";
import Button from "../../../components/Common/Button";
import { CreateNewCattle } from "../../../services/Cattle";
import { ServerError } from "../../../types/error";
import SuccessNotification from "../../../components/Common/ToastNotifications/SuccessNotification";
import ErrorNotification from "../../../components/Common/ToastNotifications/ErrorNotification";

const CreateCattle = () => {
  const [successNotificationIsOpen, setSuccessNotificationIsOpen] = useState(false);
  const [errorNotificationIsOpen, setErrorNotificationIsOpen] = useState(false);
  const [errorNotificationMessage, setErrorNotificationMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    control,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateCattleFormData>({
    defaultValues: {
      breeds: [],
      ownersIds: [],
      wasBought: "Não",
      isDead: "Não",
    },
  });

  const createCattle = useMutation({
    mutationFn: async (cattleData: CreateCattleFormDataRequest) => {
      await CreateNewCattle(cattleData);
    },
    onSuccess: () => {
      setSuccessNotificationIsOpen(true);
      reset();
    },
    onError: (error: AxiosError<ServerError>) => {
      setErrorNotificationIsOpen(true);
      if (error.code === "ERR_NETWORK") {
        setErrorNotificationMessage("Não foi possível obter conexão de internet, tente novamente mais tarde.");
      } else {
        setErrorNotificationMessage(error.response?.data.message as string);
      }
    },
  });

  const onSubmit = handleSubmit(async (formData: CreateCattleFormData) => {
    const formattedBreedsArr = formData.breeds.map((breed) => ({
      breedId: breed.breedId,
      quantityInPercentage: breed.quantityInPercentage,
    }));

    const yearOfBirth = formData.dateOfBirth
      ? parseInt(formData.dateOfBirth.toString().split("-")[0], 10)
      : formData.yearOfBirth;

    const ownersIds = [...formData.ownersIds, localStorage.getItem("userId")] as string[];

    const cattleData: CreateCattleFormDataRequest = {
      name: formData.name,
      fatherId: formData.fatherId || null,
      motherId: formData.motherId || null,
      sexId: formData.sexId,
      breeds: formattedBreedsArr,
      purchaseDate: formData.purchaseDate || null,
      dateOfBirth: formData.dateOfBirth || null,
      yearOfBirth,
      image: formData.image || null,
      dateOfDeath: formData.dateOfDeath || null,
      causeOfDeath: formData.causeOfDeath || null,
      dateOfSale: formData.dateOfSale || null,
      priceInCentsInReais: formData.priceInCentsInReais ?? null,
      ownersIds,
    };

    createCattle.mutate(cattleData);
  });

  const doesNotKnowDateOfBirth = watch("doesNotKnowDateOfBirth");

  return (
    <MainPage>
      <div className="relative bg-white shadow rounded-md mx-auto">
        <SuccessNotification
          text="Gado cadastrado com sucesso."
          isOpen={successNotificationIsOpen}
          setIsOpen={setSuccessNotificationIsOpen}
        />
        <ErrorNotification
          text={errorNotificationMessage}
          isOpen={errorNotificationIsOpen}
          setIsOpen={setErrorNotificationIsOpen}
        />
        <h2 className="text-3xl p-5 pb-0">Cadastrar gado</h2>
        <form onSubmit={onSubmit}>
          <div className="py-8 px-5 grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-10 w-full">
            <div className="w-full">
              <CattleDataForm
                register={register}
                setValue={setValue}
                errors={errors}
                doesNotKnowDateOfBirth={doesNotKnowDateOfBirth}
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
              <DeadCattleForm register={register} setValue={setValue} watch={watch} errors={errors} />
            </div>
          </div>
          <div className="flex justify-end p-4 pt-0 w-full lg:w-fit lg:ml-auto">
            <Button ariaLabel="cadastrar gado" submit>
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </MainPage>
  );
};

export default CreateCattle;
