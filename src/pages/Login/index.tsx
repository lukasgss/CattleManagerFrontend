import React from "react";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Text from "../../components/Common/Input/Text";
import Password from "../../components/Common/Input/Password";
import Button from "../../components/Common/Button";
import lottieDashboardCartoon from "../../assets/lotties/secureLogin.json";

type FormRegisterUser = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterUser>();

  const onSubmit = handleSubmit(() => {
    //
  });

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#edf0f7] shadow-md">
      <div
        className="w-[85%] bg-white px-7 py-2 my-5 md:pt-16 mx-5 rounded-xl md:px-5 lg:px-7 md:flex
       md:flex-row-reverse md:justify-around md:w-full md:max-w-[800px]"
      >
        <div className="flex flex-1 items-center justify-center">
          <Lottie
            animationData={lottieDashboardCartoon}
            className="w-52 md:w-80 mx-auto"
          />
        </div>
        <div className="flex-1">
          <form
            onSubmit={onSubmit}
            className="h-full flex flex-col justify-around"
          >
            <h2 className="text-4xl text-center mb-10">Login</h2>
            <div className="flex flex-col gap-3">
              <Text
                register={register}
                name="username"
                error={errors.username}
                labelText="Nome de usuário"
              />
              <div className="flex justify-between">
                <Password
                  register={register}
                  error={errors.password}
                  name="password"
                  labelText="Senha"
                />
              </div>
              <div className="mt-5">
                <Button submit>Login</Button>
              </div>
            </div>
            <span className="text-xs mt-5 text-center">
              Não possui uma conta?{" "}
              <Link to="/cadastro" className="text-[var(--primary-blue)]">
                Criar conta
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
