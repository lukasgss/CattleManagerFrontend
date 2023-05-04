import React, { useState } from "react";
import CreateMilkProduction from "./CreateMilkProduction";
import MainPage from "../../components/MainPage";

const MilkProductions = () => {
  const [open, setOpen] = useState(true);

  return (
    <MainPage>
      <CreateMilkProduction open={open} setOpen={setOpen} />
    </MainPage>
  );
};

export default MilkProductions;
