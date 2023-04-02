import React from "react";
import SideData from "./components/SideData";
import RegistrationForm from "./components/RegistrationForm";

const Register = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[var(--primary-white)]">
      <div
        className="w-[85%] bg-white px-7 py-2 my-5 shadow-lg md:p-0 mx-5 rounded-xl md:flex
        md:justify-around md:w-full md:max-w-5xl"
      >
        <SideData />
        <div className="flex-1 flex flex-col items-center md:pt-16 md:pb-2">
          <h2 className="text-4xl text-center mb-7">Cadastro</h2>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
