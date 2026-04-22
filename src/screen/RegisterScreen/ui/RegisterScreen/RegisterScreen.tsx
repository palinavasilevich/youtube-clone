"use client";

import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { useRegisterForm } from "@/screen/RegisterScreen/lib/useRegisterForm";
import { cn } from "@/shared/lib/css";
import cls from "./RegisterScreen.module.css";

export function RegisterScreen() {
  const { isLoading, errors, errorMessage, register, onSubmit } =
    useRegisterForm();

  const hasUsernameError = !!errors.username?.message;
  const hasPasswordError = !!errors.password?.message;
  const hasConfirmPasswordError = !!errors.confirmPassword?.message;

  return (
    <div className={cls.container}>
      <form onSubmit={onSubmit} className={cls.form}>
        <label htmlFor="username" className={cls.label}>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className={cn(cls.input, hasUsernameError && cls.errorInput)}
            {...register("username")}
          />

          {hasUsernameError && (
            <p className={cls.errorMessage}>{errors.username?.message}</p>
          )}
        </label>

        <label htmlFor="password" className={cls.label}>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className={cn(cls.input, hasPasswordError && cls.errorInput)}
            {...register("password")}
          />

          {hasPasswordError && (
            <p className={cls.errorMessage}>{errors.password?.message}</p>
          )}
        </label>

        <label htmlFor="confirmPassword" className={cls.label}>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className={cn(cls.input, hasPasswordError && cls.errorInput)}
            {...register("confirmPassword")}
          />

          {hasConfirmPasswordError && (
            <p className={cls.errorMessage}>
              {errors.confirmPassword?.message}
            </p>
          )}
        </label>

        <div className={cls.actions}>
          <button
            type="submit"
            className={cls.submitButton}
            disabled={isLoading}
          >
            Sign Up
          </button>

          <span>
            Do you already have an account?{" "}
            <Link href={ROUTES.LOGIN} className={cls.createAccountLink}>
              Sign in
            </Link>
          </span>
        </div>
      </form>
      {errorMessage && <p className={cls.errorMessage}>{errorMessage}</p>}
    </div>
  );
}
