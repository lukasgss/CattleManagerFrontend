import React, { useState } from "react";
import CreateMilkProduction from "./CreateMilkProduction";
import MainPage from "../../components/MainPage";
import ErrorNotification from "../../components/Common/ToastNotifications/ErrorNotification";
import SuccessNotification from "../../components/Common/ToastNotifications/SuccessNotification";

const MilkProductions = () => {
  const [open, setOpen] = useState(true);

  const [successNotificationIsOpen, setSuccessNotificationIsOpen] =
    useState(false);
  const [errorNotificationIsOpen, setErrorNotificationIsOpen] = useState(false);
  const [errorNotificationMessage, setErrorNotificationMessage] = useState<
    string | null
  >(null);

  return (
    <MainPage>
      <div className="relative bg-white shadow rounded-md mx-auto">
        <button type="button" onClick={() => setOpen((prev) => !prev)}>
          open
        </button>
        <CreateMilkProduction
          open={open}
          setOpen={setOpen}
          setSuccessNotificationIsOpen={setSuccessNotificationIsOpen}
          setErrorNotificationIsOpen={setErrorNotificationIsOpen}
          setErrorNotificationMessage={setErrorNotificationMessage}
        />
        {successNotificationIsOpen ? (
          <SuccessNotification
            text="Gado cadastrado com sucesso."
            setIsOpen={setSuccessNotificationIsOpen}
          />
        ) : null}
        {errorNotificationIsOpen ? (
          <ErrorNotification
            text={errorNotificationMessage}
            setIsOpen={setErrorNotificationIsOpen}
          />
        ) : null}
      </div>
    </MainPage>
  );
};

export default MilkProductions;
