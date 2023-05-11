import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Modal from "../../../components/Common/Modal/Modal";
import Number from "../../../components/Common/Input/Number";
import Dropdown from "../../../components/Common/Input/Dropdown";
import { DataArr } from "../../../types/dataArr";
import { GetFemaleCattleByName } from "../../../services/Cattle";
import DatePickerInput from "../../../components/Common/Input/DatePickerInput";
import Button from "../../../components/Common/Button";
import { ServerError } from "../../../types/error";
import { CreateNewMilkProduction } from "../../../services/MilkProductions";
import AutoComplete from "../../../components/Common/Input/AutoComplete";

type CreateMilkProductionProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessNotificationIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorNotificationIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorNotificationMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

type CreateMilkProductionForm = {
  milkInLiters: number;
  periodOfDay: DataArr | null;
  date: Date;
  cattleId: DataArr | null;
};

export type MilkProductionData = {
  milkInLiters: number;
  periodOfDay: string;
  date: Date;
  cattleId: string;
};

const CreateMilkProduction = ({
  open,
  setOpen,
  setSuccessNotificationIsOpen,
  setErrorNotificationIsOpen,
  setErrorNotificationMessage,
}: CreateMilkProductionProps) => {
  const [cattleArr, setCattleArr] = useState<DataArr[]>([]);

  const dayOptionsArr = [
    { text: "Manhã", value: "m" },
    { text: "Tarde", value: "a" },
    { text: "Noite", value: "n" },
    { text: "Dia inteiro", value: "d" },
  ];

  const schema = z.object({
    milkInLiters: z.string({ required_error: "Obrigatório" }).transform((val) => parseFloat(val)),
    cattleId: z.object(
      {
        text: z.string(),
        value: z.string(),
      },
      { invalid_type_error: "Obrigatório" }
    ),
    date: z.string().min(1, "Obrigatório"),
    periodOfDay: z.object(
      {
        text: z.string(),
        value: z.string(),
      },
      { invalid_type_error: "Obrigatório" }
    ),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateMilkProductionForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      cattleId: null,
      periodOfDay: null,
    },
  });

  const onChangeSearchCattle = async (searchTerm: string) => {
    if (searchTerm === "") {
      setCattleArr([]);
    }
    const { data } = await GetFemaleCattleByName(searchTerm);
    setCattleArr(data);
  };

  const formatRequestData = (data: CreateMilkProductionForm): MilkProductionData => {
    return {
      milkInLiters: data.milkInLiters,
      periodOfDay: data.periodOfDay?.value as string,
      date: data.date,
      cattleId: data.cattleId?.value as string,
    };
  };

  const createMilkProduction = useMutation({
    mutationFn: async (milkProductionData: CreateMilkProductionForm) => {
      const formattedData = formatRequestData(milkProductionData);

      await CreateNewMilkProduction(formattedData);
    },
    onSuccess: () => {
      setSuccessNotificationIsOpen(true);
      setOpen(false);
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

  const onSubmit = handleSubmit(async (formData: CreateMilkProductionForm) => {
    const milkProductionData: CreateMilkProductionForm = {
      ...formData,
      milkInLiters: formData.milkInLiters,
    };

    createMilkProduction.mutate(milkProductionData);
  });

  return (
    <Modal isOpen={open} setIsOpen={setOpen} modalTitle="Cadastro de produção de leite">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-5">
          <AutoComplete
            dataArr={cattleArr}
            onChangeSearch={onChangeSearchCattle}
            watch={watch}
            name="cattleId"
            register={register}
            error={errors.cattleId}
            placeholder="Panela"
            labelText="Animal"
            setValue={setValue}
          />
          <Number
            labelText="Quantidade de leite em litros"
            control={control}
            placeholder="37"
            name="milkInLiters"
            error={errors.milkInLiters}
          />
          <DatePickerInput
            name="date"
            placeholder="10/05/2018"
            register={register}
            labelText="Data"
            error={errors.date}
            setValue={setValue}
          />
          <div>
            <Dropdown
              labelText="Período do dia"
              name="periodOfDay"
              register={register}
              watch={watch}
              setValue={setValue}
              error={errors.periodOfDay}
              dataArr={dayOptionsArr}
              placeholder="Dia inteiro"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-5">
          <div className="w-full flex flex-col-reverse lg:w-1/2 md:flex-row gap-5">
            <Button ariaLabel="cancelar" transparent action={() => setOpen(false)}>
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
