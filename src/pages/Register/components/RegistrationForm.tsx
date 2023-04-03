import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../../../components/Common/Button";
import Text from "../../../components/Common/Input/Text";
import Password from "../../../components/Common/Input/Password";

type FormRegisterUser = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegistrationForm = () => {
  const schema = z
    .object({
      name: z
        .string()
        .min(1, "Obrigatório.")
        .max(255, `Campo "Nome" pode ter no máximo 255 caracteres.`),
      username: z
        .string()
        .min(1, "Obrigatório.")
        .max(255, `Campo "Nome de usuário" pode ter no máximo 255 caracteres.`),
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
  } = useForm<FormRegisterUser>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(() => {
    //
  });

  return (
    <form
      onSubmit={onSubmit}
      className="h-full flex flex-col justify-between w-full max-w-xs md:px-3"
    >
      <div className="flex flex-col gap-3 h-full">
        <Text
          register={register}
          name="name"
          error={errors.name}
          labelText="Nome completo"
        />
        <Text
          register={register}
          name="username"
          error={errors.username}
          labelText="Nome de usuário"
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
        <div className="mt-5">
          <Button submit>Cadastrar</Button>
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
