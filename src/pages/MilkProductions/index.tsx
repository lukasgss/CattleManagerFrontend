import React, { useState } from "react";
import CreateMilkProduction from "./CreateMilkProduction";
import MainPage from "../../components/MainPage";
import ErrorNotification from "../../components/Common/ToastNotifications/ErrorNotification";
import SuccessNotification from "../../components/Common/ToastNotifications/SuccessNotification";
import Button from "../../components/Common/Button";
import MilkProductionTable from "./components/MilkProductionTable";

const MilkProductions = () => {
  const [isOpenCreateMilkProductionModal, setIsOpenCreateMilkProductionModal] = useState(false);

  const [successNotificationIsOpen, setSuccessNotificationIsOpen] = useState(false);
  const [errorNotificationIsOpen, setErrorNotificationIsOpen] = useState(false);
  const [errorNotificationMessage, setErrorNotificationMessage] = useState<string | null>(null);

  return (
    <MainPage>
      <div className="bg-white px-8 py-5 relative">
        <h2 className="text-3xl">Produções de leite</h2>
        <div className="w-full flex justify-end relative">
          <div>
            <Button
              ariaLabel="cadastrar producao de leite"
              action={() => setIsOpenCreateMilkProductionModal((prev) => !prev)}
            >
              Cadastrar produção de leite
            </Button>
          </div>
        </div>
        <MilkProductionTable />
        <CreateMilkProduction
          open={isOpenCreateMilkProductionModal}
          setOpen={setIsOpenCreateMilkProductionModal}
          setSuccessNotificationIsOpen={setSuccessNotificationIsOpen}
          setErrorNotificationIsOpen={setErrorNotificationIsOpen}
          setErrorNotificationMessage={setErrorNotificationMessage}
        />

        <SuccessNotification
          text="Produdução de leite cadastrada com sucesso."
          isOpen={successNotificationIsOpen}
          setIsOpen={setSuccessNotificationIsOpen}
        />
        <ErrorNotification
          text={errorNotificationMessage}
          isOpen={errorNotificationIsOpen}
          setIsOpen={setErrorNotificationIsOpen}
        />
      </div>
    </MainPage>
  );
};

export default MilkProductions;
