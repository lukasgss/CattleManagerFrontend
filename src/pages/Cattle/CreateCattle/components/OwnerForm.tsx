import React, { useState } from "react";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { CreateCattleFormData } from "../types";
import { DataArr } from "../../../../types/dataArr";
import { GetUsersByName } from "../../../../services/User";
import Button from "../../../../components/Common/Button";
import MultiAddAutoComplete from "../../../../components/Common/Input/MultiAddAutoComplete";

type OwnerFormProps = {
  register: UseFormRegister<CreateCattleFormData>;
  setValue: UseFormSetValue<CreateCattleFormData>;
  setError: UseFormSetError<CreateCattleFormData>;
  errors: FieldErrors<CreateCattleFormData>;
  getValues: UseFormGetValues<any>;
  clearErrors: UseFormClearErrors<CreateCattleFormData>;
};

const OwnerForm = ({
  register,
  setValue,
  setError,
  getValues,
  errors,
  clearErrors,
}: OwnerFormProps) => {
  const [usersArr, setUsersArr] = useState<DataArr[]>([]);
  const [addedOwners, setAddedOwners] = useState<DataArr[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<DataArr | null>(null);

  const onChangeSearchOwners = async (name: string) => {
    if (name === "") {
      setUsersArr([]);
    }
    const { data } = await GetUsersByName(name);
    setUsersArr(data);
  };

  const userFieldsAreValid = () => {
    if (!selectedItem?.text) {
      setError("ownerName", {
        type: "custom",
        message: "Obrigatório.",
      });
      return false;
    }
    if (addedOwners.some((owner) => owner.value === selectedItem.value)) {
      setError("ownerName", {
        type: "custom",
        message: "Esse usuário já foi adicionado.",
      });
      return false;
    }
    return true;
  };

  const clearValues = () => {
    setValue("ownerName", "");
    setSelectedItem(null);
    setSearchTerm("");
    clearErrors("ownerName");
  };

  const addOwner = () => {
    const userIsValid = userFieldsAreValid();
    if (!userIsValid) {
      return;
    }
    setAddedOwners([
      ...addedOwners,
      {
        text: selectedItem?.text as string,
        value: selectedItem?.value as string,
      },
    ]);
    const ownersIds = getValues("ownersIds");

    if (ownersIds.length === 0) {
      setValue("ownersIds", [selectedItem?.value as string]);
    } else {
      setValue("ownersIds", [...ownersIds, selectedItem?.value as string]);
    }

    clearValues();
  };

  const removeAddedOwner = (ownerToRemove: DataArr) => {
    const updatedOwners = addedOwners.filter((owner) =>
      owner.value !== ownerToRemove.value ? owner : null
    );
    const formUpdatedBreeds = getValues("ownersIds").filter((ownerId) =>
      ownerToRemove.value !== ownerId ? ownerId : null
    );

    setAddedOwners(updatedOwners);
    setValue("breeds", formUpdatedBreeds);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col lg:flex-row items-end gap-5">
        <div className="flex flex-col w-full gap-3 xl:flex-row lg:items-end xl:gap-5">
          <MultiAddAutoComplete
            name="ownerName"
            register={register}
            setValue={setValue}
            placeholder="Lucas Silva"
            labelText="Dono(s) (além de você)"
            error={errors?.ownerName}
            dataArr={usersArr}
            onChangeSearch={onChangeSearchOwners}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div className="w-full xl:w-fit">
            <Button
              ariaLabel="adicionar dono"
              action={addOwner}
              color="marineBlue"
            >
              Adicionar
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <ul className="flex lg:gap-2.5 px-0.5 flex-wrap">
          {addedOwners.map((owner) => (
            <li
              key={owner.value}
              className="w-full mb-3 lg:mb-5 lg:w-fit relative flex flex-col leading-6 border-2 border-color[var(--primary-light-gray)] px-2 pr-5 py-1 rounded"
            >
              <span>{owner.text}</span>
              <button
                type="button"
                title="Remover item"
                aria-label="remover item"
                onClick={() => removeAddedOwner(owner)}
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

export default OwnerForm;
