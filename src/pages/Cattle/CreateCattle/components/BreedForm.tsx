import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import {
  Control,
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import Button from "../../../../components/Common/Button";
import DropdownWithSearch from "../../../../components/Common/Input/DropdownWithSearch";
import BreedInput from "../../../../components/Common/Input/BreedInput";
import { simplifyFraction, transformFractionToDecimal } from "../../../../extensions/stringExtensions";
import { GetAllBreeds } from "../../../../services/Breeds";
import { DataArr } from "../../../../types/dataArr";
import { CreateCattleFormData } from "../types";

type BreedFormProps = {
  register: UseFormRegister<CreateCattleFormData>;
  setError: UseFormSetError<CreateCattleFormData>;
  setValue: UseFormSetValue<CreateCattleFormData>;
  control: Control<CreateCattleFormData, any>;
  errors?: FieldErrors<CreateCattleFormData>;
  getValues: UseFormGetValues<CreateCattleFormData>;
  watch: UseFormWatch<CreateCattleFormData>;
  clearErrors: UseFormClearErrors<CreateCattleFormData>;
};

type Breed = {
  id: string;
  name: string;
  quantity: string;
};

const BreedForm = ({
  register,
  setValue,
  setError,
  control,
  errors,
  getValues,
  clearErrors,
  watch,
}: BreedFormProps) => {
  const [breedsArr, setBreedsArr] = useState<DataArr[]>([]);
  const [addedBreeds, setAddedBreeds] = useState<Breed[]>([]);

  const fieldValue: DataArr | null = watch("breedName");

  const getAllBreeds = async () => {
    const { data } = await GetAllBreeds();
    setBreedsArr(data);
    return data;
  };

  const breedFieldsAreValid = ({ name, quantity }: Breed) => {
    if (!name && !quantity) {
      setError("breedName", {
        type: "custom",
        message: "Obrigatório.",
      });
      setError("breedQuantity", {
        type: "custom",
        message: "Obrigatório.",
      });
      return false;
    }
    if (!name) {
      setError("breedName", {
        type: "custom",
        message: "Obrigatório.",
      });
      return false;
    }
    if (!quantity) {
      setError("breedQuantity", {
        type: "custom",
        message: "Obrigatório.",
      });
      return false;
    }
    if (addedBreeds.some((breed) => breed.name === name)) {
      setError("breedName", {
        type: "custom",
        message: "Raça já foi adicionada.",
      });
      return false;
    }
    return true;
  };

  const breedName = watch("breedName");
  const breedQuantity = watch("breedQuantity");

  useEffect(() => {
    if (breedName) {
      clearErrors("breedName");
    }
    if (breedQuantity) {
      clearErrors("breedQuantity");
    }
  }, [breedName, breedQuantity]);

  useQuery({
    queryKey: ["getBreeds"],
    queryFn: getAllBreeds,
  });

  const addBreed = (breed: Breed) => {
    const validBreedFields = breedFieldsAreValid(breed);
    if (!validBreedFields) return;

    let breedQuantitySum = 0;

    addedBreeds.forEach((addedBreed) => {
      const decimalValue = transformFractionToDecimal(addedBreed.quantity);
      breedQuantitySum += decimalValue;
    });

    const decimalValue = transformFractionToDecimal(breed.quantity);

    if (breedQuantitySum + decimalValue > 1) {
      setError("breedQuantity", {
        type: "custom",
        message: "Quantidade de raças somadas não pode ser maior que 100%",
      });
      return;
    }
    setAddedBreeds([
      ...addedBreeds,
      {
        id: breed.id,
        name: breed.name,
        quantity: simplifyFraction(breed.quantity),
      },
    ]);
    setValue("breeds", [
      ...getValues("breeds"),
      {
        name: breed.name,
        breedId: breed.id,
        quantityInPercentage: decimalValue,
      },
    ]);
    setValue("breedQuantity", "");
    setValue("breedName", null);
    clearErrors("breedQuantity");
    clearErrors("breedName");
  };

  const removeAddedBreed = (breed: Breed) => {
    const updatedBreeds = addedBreeds.filter((addedBreed) => (addedBreed.name !== breed.name ? addedBreed : null));
    const formUpdatedBreeds = getValues("breeds").filter((b) => (b.name !== breed.name ? b : null));
    setAddedBreeds(updatedBreeds);
    setValue("breeds", formUpdatedBreeds);
  };

  return (
    <div className="flex flex-col gap-3 lg:gap-1.5">
      <div className="flex flex-col gap-3 xl:flex-row items-end xl:gap-5">
        <div className="w-full grid grid-cols-1 gap-3 xl:grid-cols-2 xl:gap-5">
          <DropdownWithSearch
            name="breedName"
            register={register}
            setValue={setValue}
            placeholder="Holandês"
            labelText="Raça"
            error={errors?.breedName}
            watch={watch}
            dataArr={breedsArr}
          />
          <BreedInput name="breedQuantity" control={control} labelText="Quantidade" error={errors?.breedQuantity} />
        </div>
        <div className="w-full xl:w-fit">
          <Button
            ariaLabel="adicionar raça"
            action={() =>
              addBreed({
                id: fieldValue?.value as string,
                name: getValues("breedName")?.text as string,
                quantity: getValues("breedQuantity"),
              })
            }
            color="marineBlue"
          >
            Adicionar
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <ul className="flex gap-2.5 px-0.5 flex-wrap">
          {addedBreeds.map((breed) => (
            <li
              key={breed.name}
              className="w-full mb-3 lg:mb-5 lg:w-fit relative flex flex-col leading-6 border-2 border-color[var(--primary-light-gray)] px-2 pr-5 py-1 rounded"
            >
              <span>Raça: {breed.name}</span>
              <span>Quantidade: {breed.quantity}</span>
              <button
                type="button"
                title="Remover item"
                aria-label="remover item"
                onClick={() => removeAddedBreed(breed)}
              >
                <IoIosClose className="absolute top-0 right-0 w-5 hover:text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BreedForm;
