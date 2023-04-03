import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../contexts/authContext";
import { LoginUserData } from "../../services/User/types";
import FormErrorMessage from "../../components/FormErrorMessage";
import Text from "../../components/Common/Input/Text";
import Password from "../../components/Common/Input/Password";
import Button from "../../components/Common/Button";

import lottieLoginCartoon from "../../assets/lotties/secureLogin.json";

type FormLoginUser = {
  email: string;
  password: string;
};

const Login = () => {
  const { handleLogin, errorMessage } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const schema = z.object({
    email: z.string().email("E-mail inválido.").min(1, "Obrigatório"),
    password: z.string().min(1, "Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginUser>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (loginData: LoginUserData) => {
    setLoading(true);
    await handleLogin(loginData);
    setLoading(false);
  });

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[var(--primary-white)]">
      <div
        className="w-[85%] bg-white px-7 py-2 my-5 shadow-lg md:p-0 mx-5 rounded-xl md:flex
       md:flex-rw-reverse md:justify-around md:w-full md:max-w-5xl md:h-[550px]"
      >
        <div className="flex flex-1 items-center justify-center md:pt-16 md:bg-[var(--primary-blue)] rounded-l-xl">
          <Lottie
            animationData={lottieLoginCartoon}
            className="w-52 md:w-80 mx-auto"
            draggable={false}
          />
        </div>
        <div className="flex-1 flex flex-col items-center md:pt-16 md:pb-2">
          <h2 className="text-4xl text-center mb-10">Login</h2>
          <form
            onSubmit={onSubmit}
            className="h-full flex flex-col justify-between w-full max-w-xs"
          >
            <div className="flex flex-col gap-3 h-full">
              <Text
                register={register}
                name="email"
                error={errors.email}
                labelText="Endereço de e-mail"
              />
              <div className="flex justify-between">
                <Password
                  register={register}
                  error={errors.password}
                  name="password"
                  labelText="Senha"
                  forgotPasswordLink
                />
              </div>
              <div className="mt-5 flex flex-col gap-5">
                <FormErrorMessage
                  error={errorMessage as string}
                  serverValidation
                />
                <Button submit loading={loading}>
                  Login
                </Button>
              </div>
            </div>
            <span className="text-xs mb-2 text-center mt-8">
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
