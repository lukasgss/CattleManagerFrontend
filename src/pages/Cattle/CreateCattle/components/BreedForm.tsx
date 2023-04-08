import React, { useState } from "react";
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
} from "react-hook-form";
import Button from "../../../../components/Common/Button";
import DropdownWithSearch from "../../../../components/Common/DropdownWithSearch";
import BreedInput from "../../../../components/Common/Input/BreedInput";
import {
  simplifyFraction,
  transformFractionToDecimal,
} from "../../../../extensions/stringExtensions";
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
}: BreedFormProps) => {
  const [breedsArr, setBreedsArr] = useState<DataArr[]>([]);
  const [addedBreeds, setAddedBreeds] = useState<Breed[]>([]);

  const [selectedItem, setSelectedItem] = useState<DataArr | null>(null);

  const getAllBreeds = async () => {
    const { data } = await GetAllBreeds();
    setBreedsArr(data);
    return data;
  };

  useQuery({
    queryKey: ["getBreeds"],
    queryFn: getAllBreeds,
  });

  const addBreed = (breed: Breed) => {
    if (!breed.name) {
      setError("breeds", {
        type: "custom",
        message: "Obrigatório.",
      });
    }
    if (!breed.quantity) {
      setError("breedQuantity", {
        type: "custom",
        message: "Obrigatório.",
      });
      return;
    }

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
    setSelectedItem(null);
    clearErrors("breedQuantity");
    clearErrors("breeds");
  };

  const removeAddedBreed = (breed: Breed) => {
    const updatedBreeds = addedBreeds.filter((addedBreed) =>
      addedBreed.name !== breed.name ? addedBreed : null
    );
    const formUpdatedBreeds = getValues("breeds").filter((b) =>
      b.name !== breed.name ? b : null
    );
    setAddedBreeds(updatedBreeds);
    setValue("breeds", formUpdatedBreeds);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="lg:flex gap-5">
        <DropdownWithSearch
          name="breedName"
          register={register}
          setValue={setValue}
          labelText="Raça"
          error={errors?.breeds}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          dataArr={breedsArr}
        />
        <BreedInput
          name="breedQuantity"
          control={control}
          labelText="Quantidade"
          error={errors?.breedQuantity}
        />
      </div>
      <div className="ml-auto w-fit">
        <Button
          ariaLabel="adicionar raça"
          action={() =>
            addBreed({
              id: selectedItem?.value as string,
              name: getValues("breedName"),
              quantity: getValues("breedQuantity"),
            })
          }
        >
          Adicionar
        </Button>
      </div>
      <div className="mt-2">
        <ul className="flex gap-2.5 px-5 flex-wrap">
          {addedBreeds.map((breed) => (
            <li
              key={breed.name}
              className="relative bg-[var(--secondary-blue)] px-2 pr-5 py-1 rounded-md"
            >
              <span>
                {breed.name} - {breed.quantity}
              </span>
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
