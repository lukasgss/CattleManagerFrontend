import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../../components/Common/Modal/Modal";
import Number from "../../../components/Common/Input/Number";
import Dropdown from "../../../components/Common/Input/Dropdown";
import { DataArr } from "../../../types/dataArr";
import { GetFemaleCattleByName } from "../../../services/Cattle";
import DatePickerInput from "../../../components/Common/Input/DatePickerInput";
import AutoComplete from "../../../components/Common/Input/MultiAddAutoComplete";
import Button from "../../../components/Common/Button";

type CreateMilkProductionProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type CreateMilkProductionForm = {
  milkInLiters: number;
  periodOfDay: "m" | "a" | "n" | "d";
  date: string;
  dateMilkProduction: Date;
  cattleId: string;
};

const CreateMilkProduction = ({ open, setOpen }: CreateMilkProductionProps) => {
  const [cattleArr, setCattleArr] = useState<DataArr[]>([]);
  const [cattleSearchTerm, setCattleSearchTerm] = useState("");
  const [selectedCattle, setSelectedCattle] = useState<DataArr | null>(null);

  const [selectedDayOption, setSelectedDayOption] = useState<DataArr | null>(
    null
  );

  const dayOptionsArr = [
    { text: "Manhã", value: "m" },
    { text: "Tarde", value: "a" },
    { text: "Noite", value: "n" },
    { text: "Dia inteiro", value: "d" },
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateMilkProductionForm>();

  const onChangeSearchCattle = async (searchTerm: string) => {
    if (searchTerm === "") {
      setCattleArr([]);
    }
    const { data } = await GetFemaleCattleByName(searchTerm);
    setCattleArr(data);
  };

  const onSubmit = handleSubmit(async () => {
    //
  });

  return (
    <Modal
      isOpen={open}
      setIsOpen={setOpen}
      modalTitle="Cadastro de produção de leite"
    >
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-5">
          <AutoComplete
            dataArr={cattleArr}
            onChangeSearch={onChangeSearchCattle}
            searchTerm={cattleSearchTerm}
            setSearchTerm={setCattleSearchTerm}
            selectedItem={selectedCattle}
            setSelectedItem={setSelectedCattle}
            name="cattle"
            register={register}
            error={errors.cattleId}
            placeholder="Panela"
            labelText="Animal"
            setValue={setValue}
          />
          <Number
            labelText="Quantidade de leite em litros"
            control={control}
            name="qtdLeite"
            error={errors.milkInLiters}
          />
          <DatePickerInput
            name="dateMilkProduction"
            placeholder="10/05/2018"
            register={register}
            labelText="Data"
            error={errors.dateMilkProduction}
            setValue={setValue}
          />
          <div>
            <Dropdown
              labelText="Período do dia"
              name="periodOfDay"
              register={register}
              setValue={setValue}
              error={errors.periodOfDay}
              dataArr={dayOptionsArr}
              selectedItem={selectedDayOption}
              setSelectedItem={setSelectedDayOption}
              placeholder="Dia inteiro"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-5">
          <div className="w-full flex flex-col-reverse lg:w-1/2 md:flex-row gap-5">
            <Button ariaLabel="cancelar" transparent>
              Cancelar
            </Button>
            <Button ariaLabel="cadastrar" submit>
              Cadastrar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateMilkProduction;
