import React, { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import Button from "../../../components/Common/Button";
import Text from "../../../components/Common/Input/Text";
import Password from "../../../components/Common/Input/Password";
import { RegisterUserData } from "../../../services/User/types";
import { RegisterUser } from "../../../services/User";
import FormErrorMessage from "../../../components/FormErrorMessage";
import { AuthContext } from "../../../contexts/authContext";

type ApiError = {
  statusCode: number;
  message: string;
};

const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { handleLogin } = useContext(AuthContext);

  const schema = z
    .object({
      firstName: z
        .string()
        .min(1, "Obrigatório.")
        .max(255, `Campo "Nome" pode ter no máximo 255 caracteres.`),
      lastName: z
        .string()
        .min(1, "Obrigatório.")
        .max(255, `Campo "Sobrenome" pode ter no máximo 255 caracteres.`),
      email: z
        .string()
        .email({ message: "E-mail inválido." })
        .min(1, "Obrigatório.")
        .max(
          255,
          `Campo "Endereço de e-mail" pode ter no máximo 255 caracteres.`
        ),
      password: z
        .string()
        .min(1, "Obrigatório.")
        .max(255, `Campo "Senha" pode ter no máximo 255 caracteres.`),
      confirmPassword: z
        .string()
        .min(1, "Obrigatório.")
        .max(255, `Campo "Confirmar senha" pode ter no máximo 255 caracteres.`),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "Senhas não coincidem.",
          path: ["confirmPassword"],
        });
      }
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: RegisterUser,
    onSuccess: async () => setErrorMessage(null),
    onError: (err: AxiosError) => {
      const errorData = err.response?.data as ApiError;
      setErrorMessage(errorData.message);
    },
  });

  const onSubmit = handleSubmit(async (formData: RegisterUserData) => {
    await mutation.mutateAsync(formData);
    handleLogin({ email: formData.email, password: formData.password });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="h-full flex flex-col justify-between w-full max-w-[350px] md:px-3"
    >
      <div className="flex flex-col gap-3 h-full">
        <Text
          register={register}
          name="firstName"
          error={errors.firstName}
          labelText="Nome"
        />
        <Text
          register={register}
          name="lastName"
          error={errors.lastName}
          labelText="Sobrenome"
        />
        <Text
          register={register}
          name="email"
          error={errors.email}
          labelText="Endereço de e-mail"
        />
        <Password
          register={register}
          error={errors.password}
          name="password"
          labelText="Senha"
        />
        <Password
          register={register}
          error={errors.confirmPassword}
          name="confirmPassword"
          labelText="Confirmar senha"
        />
        <div className="mt-5 flex flex-col gap-5">
          {mutation.isError ? (
            <FormErrorMessage error={errorMessage as string} serverValidation />
          ) : null}
          <Button submit loading={mutation.isLoading}>
            Cadastrar
          </Button>
        </div>
      </div>
      <span className="text-xs mb-2 text-center mt-6">
        Já possui uma conta?{" "}
        <Link to="/login" className="text-[var(--primary-blue)]">
          Fazer login
        </Link>
      </span>
    </form>
  );
};

export default RegistrationForm;
